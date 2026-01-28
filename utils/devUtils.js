/**
 * Format and validate JSON
 */
export function formatJSON(jsonString, indentSpaces = 2) {
  try {
    const parsed = JSON.parse(jsonString)
    return {
      success: true,
      formatted: JSON.stringify(parsed, null, indentSpaces),
      error: null
    }
  } catch (error) {
    return {
      success: false,
      formatted: null,
      error: error.message
    }
  }
}

/**
 * Minify JSON
 */
export function minifyJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString)
    return {
      success: true,
      minified: JSON.stringify(parsed),
      error: null
    }
  } catch (error) {
    return {
      success: false,
      minified: null,
      error: error.message
    }
  }
}

/**
 * Validate JSON
 */
export function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString)
    return {
      valid: true,
      error: null
    }
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      position: error.message.match(/position (\d+)/)?.[1] || null
    }
  }
}

/**
 * Encode text to Base64
 */
export function encodeBase64(text) {
  try {
    return btoa(unescape(encodeURIComponent(text)))
  } catch (error) {
    throw new Error(`Failed to encode: ${error.message}`)
  }
}

/**
 * Decode Base64 to text
 */
export function decodeBase64(base64String) {
  try {
    return decodeURIComponent(escape(atob(base64String)))
  } catch (error) {
    throw new Error(`Failed to decode: ${error.message}`)
  }
}

/**
 * Encode file to Base64
 */
export async function encodeFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Minify HTML
 */
export function minifyHTML(html) {
  return html
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Remove leading/trailing whitespace
    .trim()
    // Remove extra spaces
    .replace(/\s{2,}/g, ' ')
}

/**
 * Minify CSS
 */
export function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators
    .replace(/\s*([{}:;,])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Minify JavaScript (basic)
 */
export function minifyJS(js) {
  return js
    // Remove single line comments
    .replace(/\/\/[^\n]*/g, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators
    .replace(/\s*([=+\-*/<>!&|?:,;{}()])\s*/g, '$1')
    .trim()
}

/**
 * Format HTML
 */
export function formatHTML(html) {
  let formatted = ''
  let indent = 0
  const tab = '  '

  html.split(/(<[^>]+>)/g).forEach(part => {
    if (part.trim() === '') return

    if (part.startsWith('</')) {
      indent--
      formatted += tab.repeat(indent) + part.trim() + '\n'
    } else if (part.startsWith('<') && !part.startsWith('<!') && !part.endsWith('/>')) {
      formatted += tab.repeat(indent) + part.trim() + '\n'
      if (!part.startsWith('<br') && !part.startsWith('<hr') && !part.startsWith('<img')) {
        indent++
      }
    } else {
      formatted += tab.repeat(indent) + part.trim() + '\n'
    }
  })

  return formatted.trim()
}

/**
 * Format CSS
 */
export function formatCSS(css) {
  return css
    .replace(/\{/g, ' {\n  ')
    .replace(/\}/g, '\n}\n\n')
    .replace(/;/g, ';\n  ')
    .replace(/,/g, ',\n')
    .trim()
}

/**
 * Encode URL
 */
export function encodeURL(url) {
  return encodeURIComponent(url)
}

/**
 * Decode URL
 */
export function decodeURL(url) {
  return decodeURIComponent(url)
}

/**
 * Generate hash (simple hash function)
 */
export function generateHash(text) {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

/**
 * Convert color formats
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * Generate UUID
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Escape HTML
 */
export function escapeHTML(html) {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * Unescape HTML
 */
export function unescapeHTML(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent
}
