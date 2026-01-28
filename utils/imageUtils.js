import imageCompression from 'browser-image-compression'

/**
 * Resize image to specified dimensions
 */
export async function resizeImage(file, width, height, maintainAspectRatio = true) {
  try {
    const options = {
      maxWidthOrHeight: maintainAspectRatio ? Math.max(width, height) : width,
      useWebWorker: true,
      fileType: file.type,
    }

    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    throw new Error(`Failed to resize image: ${error.message}`)
  }
}

/**
 * Compress image with quality control
 */
export async function compressImage(file, quality = 0.8) {
  try {
    const options = {
      maxSizeMB: quality * 10, // Scale quality to file size
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality,
    }

    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    throw new Error(`Failed to compress image: ${error.message}`)
  }
}

/**
 * Convert image format
 */
export async function convertImageFormat(file, targetFormat) {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)

          canvas.toBlob((blob) => {
            if (blob) {
              const convertedFile = new File([blob], 
                file.name.replace(/\.[^/.]+$/, `.${targetFormat}`), 
                { type: `image/${targetFormat}` }
              )
              resolve(convertedFile)
            } else {
              reject(new Error('Failed to convert image'))
            }
          }, `image/${targetFormat}`)
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target.result
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  } catch (error) {
    throw new Error(`Failed to convert image: ${error.message}`)
  }
}

/**
 * Crop image
 */
export async function cropImage(file, cropData) {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = cropData.width
          canvas.height = cropData.height
          const ctx = canvas.getContext('2d')
          
          ctx.drawImage(
            img,
            cropData.x,
            cropData.y,
            cropData.width,
            cropData.height,
            0,
            0,
            cropData.width,
            cropData.height
          )

          canvas.toBlob((blob) => {
            if (blob) {
              const croppedFile = new File([blob], 
                `cropped_${file.name}`, 
                { type: file.type }
              )
              resolve(croppedFile)
            } else {
              reject(new Error('Failed to crop image'))
            }
          }, file.type)
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target.result
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  } catch (error) {
    throw new Error(`Failed to crop image: ${error.message}`)
  }
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height
        })
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Create preview URL for image
 */
export function createImagePreview(file) {
  return URL.createObjectURL(file)
}

/**
 * Download file
 */
export function downloadFile(file, filename) {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || file.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
