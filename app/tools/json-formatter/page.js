'use client'

import { useState } from 'react'
import { ArrowLeft, Copy, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { formatJSON, minifyJSON, validateJSON } from '@/utils/devUtils'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('format') // 'format' or 'minify'
  const [indentSpaces, setIndentSpaces] = useState(2)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isValid, setIsValid] = useState(null)

  const handleFormat = () => {
    setError('')
    setIsValid(null)

    if (!input.trim()) {
      setError('Please enter JSON to format')
      return
    }

    if (mode === 'format') {
      const result = formatJSON(input, indentSpaces)
      if (result.success) {
        setOutput(result.formatted)
        setIsValid(true)
      } else {
        setError(result.error)
        setIsValid(false)
      }
    } else {
      const result = minifyJSON(input)
      if (result.success) {
        setOutput(result.minified)
        setIsValid(true)
      } else {
        setError(result.error)
        setIsValid(false)
      }
    }
  }

  const handleValidate = () => {
    setError('')
    
    if (!input.trim()) {
      setError('Please enter JSON to validate')
      return
    }

    const result = validateJSON(input)
    if (result.valid) {
      setIsValid(true)
      setError('')
    } else {
      setIsValid(false)
      setError(result.error)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setIsValid(null)
  }

  const loadSample = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "country": "USA"
      },
      "hobbies": ["reading", "coding", "gaming"],
      "active": true
    }
    setInput(JSON.stringify(sample))
    setOutput('')
    setError('')
    setIsValid(null)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
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
            JSON Formatter & Validator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Format, minify, and validate your JSON code with syntax highlighting.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Mode Selector */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode('format')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mode === 'format'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Format
            </button>
            <button
              onClick={() => setMode('minify')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 dark:border-gray-700 ${
                mode === 'minify'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Minify
            </button>
          </div>

          {/* Indent Spaces */}
          {mode === 'format' && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Indent:
              </label>
              <select
                value={indentSpaces}
                onChange={(e) => setIndentSpaces(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleValidate}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              Validate
            </button>
            <button
              onClick={handleFormat}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {mode === 'format' ? 'Format JSON' : 'Minify JSON'}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Validation Status */}
        {isValid !== null && (
          <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
            isValid
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            {isValid ? (
              <>
                <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                  Valid JSON ✓
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-400">
                  Invalid JSON
                </span>
              </>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 font-mono">{error}</p>
          </div>
        )}
      </div>

      {/* Input/Output */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Input JSON
            </h2>
            <button
              onClick={loadSample}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setOutput('')
              setIsValid(null)
              setError('')
            }}
            placeholder='{"key": "value"}'
            className="w-full h-[500px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 ring-orange-500 outline-none resize-none font-mono text-sm"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Output
            </h2>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-600 dark:text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-[500px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 resize-none font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">✓</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Validate</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Check syntax</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">✨</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Format</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Beautify code</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">📦</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Minify</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Compress size</p>
        </div>
        <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">Instant</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Real-time processing</p>
        </div>
      </div>
    </div>
  )
}
