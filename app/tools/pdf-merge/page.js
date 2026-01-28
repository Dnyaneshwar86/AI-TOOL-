'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import FileUploader from '@/components/FileUploader'
import { mergePDFs, downloadBlob, formatFileSize } from '@/utils/pdfUtils'

export default function PDFMergePage() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [mergedPdf, setMergedPdf] = useState(null)
  const [error, setError] = useState('')

  const handleFiles = (selectedFiles) => {
    setFiles(selectedFiles)
    setMergedPdf(null)
    setError('')
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const merged = await mergePDFs(files)
      setMergedPdf(merged)
    } catch (err) {
      setError(err.message || 'Failed to merge PDFs. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (mergedPdf) {
      downloadBlob(mergedPdf, 'merged.pdf')
    }
  }

  const handleReset = () => {
    setFiles([])
    setMergedPdf(null)
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
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
            Merge PDF Files
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Combine multiple PDF files into a single document. All processing happens in your browser.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
        {!mergedPdf ? (
          <div className="space-y-6">
            <FileUploader
              onFiles={handleFiles}
              accept=".pdf,application/pdf"
              multiple={true}
              maxFiles={20}
              maxSize={100 * 1024 * 1024}
              title="Upload PDF Files"
              description="Select 2 or more PDF files to merge"
            />

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {files.length} file{files.length !== 1 ? 's' : ''} selected
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <button
                  onClick={handleMerge}
                  disabled={isProcessing || files.length < 2}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Merging PDFs...</span>
                    </>
                  ) : (
                    <span>Merge {files.length} PDFs</span>
                  )}
                </button>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                How it works:
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Upload 2 or more PDF files</li>
                <li>• Files will be merged in the order selected</li>
                <li>• Processing happens entirely in your browser</li>
                <li>• Your files never leave your device</li>
                <li>• Download your merged PDF instantly</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle2 size={32} className="text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                PDF Merged Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your {files.length} PDF files have been combined into one document
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Size: {formatFileSize(mergedPdf.size)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30"
              >
                <Download size={20} />
                <span>Download Merged PDF</span>
              </button>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all"
              >
                Merge More PDFs
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Secure</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">100% client-side processing</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fast</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Instant merging, no uploads</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🆓</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Free</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">No limits, no watermarks</p>
        </div>
      </div>
    </div>
  )
}
