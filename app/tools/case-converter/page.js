'use client'

import Link from 'next/link'
import { ArrowLeft, Wrench } from 'lucide-react'

export default function CaseConverterPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
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
            Case Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Convert text to UPPERCASE, lowercase, Title Case, and more formats.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <Wrench size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This tool is currently under development. Check back soon!
        </p>
      </div>
    </div>
  )
}
