'use client'

import { useState } from 'react'
import ToolCard from '@/components/ToolCard'
import { 
  FileText, Image as ImageIcon, FileStack, Type, Hash, Code,
  Scissors, Compress, FileDown, Maximize, Crop, Shuffle,
  Text, CaseSensitive, List, Braces, Binary, Minimize2
} from 'lucide-react'

const TOOLS = [
  // PDF Tools
  {
    id: 'pdf-merge',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document. Fast and secure client-side processing.',
    category: 'PDF',
    icon: FileStack,
    href: '/tools/pdf-merge',
    color: 'blue',
    tags: ['pdf', 'merge', 'combine', 'join']
  },
  {
    id: 'pdf-split',
    title: 'Split PDF',
    description: 'Extract pages from your PDF file or split it into multiple documents.',
    category: 'PDF',
    icon: Scissors,
    href: '/tools/pdf-split',
    color: 'blue',
    tags: ['pdf', 'split', 'extract', 'separate']
  },
  {
    id: 'pdf-compress',
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality. Perfect for sharing and storage.',
    category: 'PDF',
    icon: Compress,
    href: '/tools/pdf-compress',
    color: 'blue',
    tags: ['pdf', 'compress', 'reduce', 'optimize']
  },

  // Image Tools
  {
    id: 'image-resize',
    title: 'Resize Image',
    description: 'Resize images to any dimension without quality loss. Supports JPG, PNG, WebP.',
    category: 'Image',
    icon: Maximize,
    href: '/tools/image-resize',
    color: 'purple',
    tags: ['image', 'resize', 'scale', 'dimension']
  },
  {
    id: 'image-crop',
    title: 'Crop Image',
    description: 'Crop and trim your images with precision. Perfect for profile pictures.',
    category: 'Image',
    icon: Crop,
    href: '/tools/image-crop',
    color: 'purple',
    tags: ['image', 'crop', 'trim', 'cut']
  },
  {
    id: 'image-convert',
    title: 'Convert Image',
    description: 'Convert images between formats: JPG, PNG, WebP, and more.',
    category: 'Image',
    icon: Shuffle,
    href: '/tools/image-convert',
    color: 'purple',
    tags: ['image', 'convert', 'format', 'transform']
  },

  // Content Tools
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly.',
    category: 'Content',
    icon: Hash,
    href: '/tools/word-counter',
    color: 'green',
    tags: ['word', 'count', 'text', 'characters']
  },
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, and more formats.',
    category: 'Content',
    icon: CaseSensitive,
    href: '/tools/case-converter',
    color: 'green',
    tags: ['case', 'convert', 'uppercase', 'lowercase']
  },
  {
    id: 'lorem-ipsum',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups. Multiple formats available.',
    category: 'Content',
    icon: List,
    href: '/tools/lorem-ipsum',
    color: 'green',
    tags: ['lorem', 'ipsum', 'placeholder', 'text', 'generator']
  },

  // Dev Tools
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON code with syntax highlighting.',
    category: 'Dev',
    icon: Braces,
    href: '/tools/json-formatter',
    color: 'orange',
    tags: ['json', 'format', 'validate', 'beautify']
  },
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode or decode text and files to/from Base64 format.',
    category: 'Dev',
    icon: Binary,
    href: '/tools/base64-encoder',
    color: 'orange',
    tags: ['base64', 'encode', 'decode', 'convert']
  },
  {
    id: 'html-minifier',
    title: 'HTML Minifier',
    description: 'Minify and optimize your HTML code to reduce file size and improve performance.',
    category: 'Dev',
    icon: Minimize2,
    href: '/tools/html-minifier',
    color: 'orange',
    tags: ['html', 'minify', 'optimize', 'compress']
  },
]

const CATEGORIES = ['All', 'PDF', 'Image', 'Content', 'Dev']

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = 
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">in one place</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Free online tools for PDF, Images, Text, and Development. 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> 100% client-side processing</span> - 
            your files never leave your device.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for tools (e.g., 'PDF merge', 'resize image', 'word count')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 ring-blue-500/10 outline-none transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <kbd className="px-3 py-1.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg border border-gray-300 dark:border-gray-700">
              {filteredTools.length} tools
            </kbd>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              category={tool.category}
              icon={tool.icon}
              href={tool.href}
              color={tool.color}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <FileText size={32} className="text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No tools found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Features Section */}
      <div id="features" className="pt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Choose OmniTool Hub?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with privacy, speed, and ease of use in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              🔒
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              100% Private
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>

          <div className="text-center space-y-3 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              ⚡
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No server uploads. Process files instantly with client-side technology.
            </p>
          </div>

          <div className="text-center space-y-3 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              🎯
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Easy to Use
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Simple, intuitive interface. No registration or sign-up required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
