'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import FileUploader from '@/components/FileUploader'
import { resizeImage, getImageDimensions, downloadFile, formatFileSize } from '@/utils/imageUtils'

export default function ImageResizePage() {
  const [file, setFile] = useState(null)
  const [originalDimensions, setOriginalDimensions] = useState(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [resizedImage, setResizedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = async (selectedFiles) => {
    if (selectedFiles.length === 0) return

    const selectedFile = selectedFiles[0]
    setFile(selectedFile)
    setResizedImage(null)
    setError('')

    try {
      const dimensions = await getImageDimensions(selectedFile)
      setOriginalDimensions(dimensions)
      setWidth(dimensions.width.toString())
      setHeight(dimensions.height.toString())
      
      const preview = URL.createObjectURL(selectedFile)
      setPreviewUrl(preview)
    } catch (err) {
      setError('Failed to load image. Please try again.')
    }
  }

  const handleWidthChange = (e) => {
    const newWidth = e.target.value
    setWidth(newWidth)
    
    if (maintainAspectRatio && originalDimensions && newWidth) {
      const ratio = originalDimensions.aspectRatio
      const newHeight = Math.round(parseInt(newWidth) / ratio)
      setHeight(newHeight.toString())
    }
  }

  const handleHeightChange = (e) => {
    const newHeight = e.target.value
    setHeight(newHeight)
    
    if (maintainAspectRatio && originalDimensions && newHeight) {
      const ratio = originalDimensions.aspectRatio
      const newWidth = Math.round(parseInt(newHeight) * ratio)
      setWidth(newWidth.toString())
    }
  }

  const handleResize = async () => {
    if (!file || !width || !height) {
      setError('Please enter valid dimensions')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const resized = await resizeImage(file, parseInt(width), parseInt(height), maintainAspectRatio)
      setResizedImage(resized)
    } catch (err) {
      setError(err.message || 'Failed to resize image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (resizedImage) {
      downloadFile(resizedImage, `resized_${file.name}`)
    }
  }

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setOriginalDimensions(null)
    setWidth('')
    setHeight('')
    setResizedImage(null)
    setPreviewUrl(null)
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
            Resize Image
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Resize images to any dimension. Supports JPG, PNG, WebP, and more.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
        {!file ? (
          <div className="space-y-6">
            <FileUploader
              onFiles={handleFiles}
              accept="image/*"
              multiple={false}
              maxFiles={1}
              maxSize={20 * 1024 * 1024}
              title="Upload Image"
              description="Select an image to resize"
            />

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                Supported formats:
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-400">
                JPG, PNG, WebP, GIF, BMP, and more
              </p>
            </div>
          </div>
        ) : !resizedImage ? (
          <div className="space-y-6">
            {/* Preview */}
            {previewUrl && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Preview:</h3>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-w-full max-h-96 object-contain"
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Original: {originalDimensions?.width} × {originalDimensions?.height} px 
                  ({formatFileSize(file.size)})
                </div>
              </div>
            )}

            {/* Dimensions Input */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">New Dimensions:</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={handleWidthChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 ring-purple-500 outline-none"
                    placeholder="Width"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={handleHeightChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 ring-purple-500 outline-none"
                    placeholder="Height"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Maintain aspect ratio
                </span>
              </label>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleResize}
                disabled={isProcessing || !width || !height}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Resizing...</span>
                  </>
                ) : (
                  <span>Resize Image</span>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <CheckCircle2 size={32} className="text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Image Resized Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                New size: {width} × {height} px ({formatFileSize(resizedImage.size)})
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30"
              >
                <Download size={20} />
                <span>Download Resized Image</span>
              </button>

              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all"
              >
                Resize Another Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Quality</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Maintain image quality</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📐</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Aspect Ratio</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Keep proportions perfect</p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Instant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Process in milliseconds</p>
        </div>
      </div>
    </div>
  )
}
