/**
 * Count words, characters, sentences, and paragraphs
 */
export function analyzeText(text) {
  if (!text || text.trim() === '') {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: '0 min'
    }
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
  const paragraphs = text.split(/\n\n+/).filter(para => para.trim().length > 0).length
  const lines = text.split(/\n/).length
  
  // Average reading speed: 200 words per minute
  const readingMinutes = Math.ceil(words / 200)
  const readingTime = readingMinutes < 1 ? '< 1 min' : `${readingMinutes} min`

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime
  }
}

/**
 * Convert text case
 */
export function convertCase(text, caseType) {
  if (!text) return ''

  switch (caseType) {
    case 'uppercase':
      return text.toUpperCase()
    
    case 'lowercase':
      return text.toLowerCase()
    
    case 'titlecase':
      return text.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    
    case 'sentencecase':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    
    case 'capitalcase':
      return text.replace(/\b\w/g, (c) => c.toUpperCase())
    
    case 'alternatingcase':
      return text.split('').map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('')
    
    case 'inversecase':
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('')
    
    default:
      return text
  }
}

/**
 * Generate Lorem Ipsum text
 */
export function generateLoremIpsum(type, count) {
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)]
  }

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 5 // 5-15 words
    const words = Array.from({ length: wordCount }, generateWord)
    return words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.'
  }

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3 // 3-8 sentences
    return Array.from({ length: sentenceCount }, generateSentence).join(' ')
  }

  if (type === 'words') {
    return Array.from({ length: count }, generateWord).join(' ')
  } else if (type === 'sentences') {
    return Array.from({ length: count }, generateSentence).join(' ')
  } else if (type === 'paragraphs') {
    return Array.from({ length: count }, generateParagraph).join('\n\n')
  }

  return ''
}

/**
 * Remove extra spaces
 */
export function removeExtraSpaces(text) {
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * Remove line breaks
 */
export function removeLineBreaks(text) {
  return text.replace(/\n+/g, ' ').trim()
}

/**
 * Add line numbers
 */
export function addLineNumbers(text) {
  const lines = text.split('\n')
  return lines.map((line, index) => `${index + 1}. ${line}`).join('\n')
}

/**
 * Sort lines alphabetically
 */
export function sortLines(text, order = 'asc') {
  const lines = text.split('\n')
  const sorted = lines.sort((a, b) => {
    if (order === 'asc') {
      return a.localeCompare(b)
    } else {
      return b.localeCompare(a)
    }
  })
  return sorted.join('\n')
}

/**
 * Reverse text
 */
export function reverseText(text) {
  return text.split('').reverse().join('')
}

/**
 * Find and replace
 */
export function findAndReplace(text, find, replace, caseSensitive = false, wholeWord = false) {
  let flags = 'g'
  if (!caseSensitive) flags += 'i'
  
  let pattern = find
  if (wholeWord) pattern = `\\b${find}\\b`
  
  const regex = new RegExp(pattern, flags)
  return text.replace(regex, replace)
}
