'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { analyzeText } from '@/utils/textUtils'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const analysis = analyzeText(text)
    setStats(analysis)
  }, [text])

  const handleCopy = () => {
    const statsText = `
Statistics:
- Words: ${stats.words}
- Characters: ${stats.characters}
- Characters (no spaces): ${stats.charactersNoSpaces}
- Sentences: ${stats.sentences}
- Paragraphs: ${stats.paragraphs}
- Lines: ${stats.lines}
- Reading Time: ${stats.readingTime}
    `.trim()

    navigator.clipboard.writeText(statsText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statCards = [
    { label: 'Words', value: stats?.words || 0, color: 'blue' },
    { label: 'Characters', value: stats?.characters || 0, color: 'purple' },
    { label: 'No Spaces', value: stats?.charactersNoSpaces || 0, color: 'green' },
    { label: 'Sentences', value: stats?.sentences || 0, color: 'orange' },
    { label: 'Paragraphs', value: stats?.paragraphs || 0, color: 'pink' },
    { label: 'Lines', value: stats?.lines || 0, color: 'indigo' },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
  }

  const textColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Tools
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Word Counter
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Count words, characters, sentences, paragraphs, and estimate reading time instantly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Enter Your Text
              </h2>
              {text && (
                <button
                  onClick={() => setText('')}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-[500px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 ring-green-500 outline-none resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Statistics
              </h2>
              {stats && stats.words > 0 && (
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Copy statistics"
                >
                  {copied ? (
                    <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy size={18} className="text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
            </div>

            <div className="space-y-3">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className={`p-4 rounded-lg border ${colorClasses[stat.color]}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </span>
                    <span className={`text-2xl font-bold ${textColorClasses[stat.color]}`}>
                      {stat.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              {/* Reading Time */}
              <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reading Time
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats?.readingTime || '0 min'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Based on 200 words/min
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2 text-sm">
              💡 Tips:
            </h3>
            <ul className="text-xs text-green-800 dark:text-green-400 space-y-1">
              <li>• Paste text from any source</li>
              <li>• Statistics update in real-time</li>
              <li>• Perfect for essays, articles, posts</li>
              <li>• SEO optimization ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Text */}
      {!text && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Try with sample text:
          </h3>
          <button
            onClick={() => setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            Load Sample Text
          </button>
        </div>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Real-time</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Instant updates</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Detailed</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Complete stats</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Accurate</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Precise counting</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Private</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Never stored</p>
        </div>
      </div>
    </div>
  )
}
