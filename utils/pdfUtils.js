import { PDFDocument } from 'pdf-lib'

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(files) {
  try {
    const mergedPdf = await PDFDocument.create()

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => mergedPdf.addPage(page))
    }

    const mergedPdfBytes = await mergedPdf.save()
    return new Blob([mergedPdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error(`Failed to merge PDFs: ${error.message}`)
  }
}

/**
 * Split PDF into separate pages
 */
export async function splitPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pageCount = pdfDoc.getPageCount()
    
    const splitPdfs = []

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create()
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])
      newPdf.addPage(copiedPage)
      
      const pdfBytes = await newPdf.save()
      splitPdfs.push({
        blob: new Blob([pdfBytes], { type: 'application/pdf' }),
        name: `page_${i + 1}.pdf`,
        pageNumber: i + 1
      })
    }

    return splitPdfs
  } catch (error) {
    throw new Error(`Failed to split PDF: ${error.message}`)
  }
}

/**
 * Extract specific pages from PDF
 */
export async function extractPDFPages(file, pageNumbers) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const newPdf = await PDFDocument.create()

    // Convert to 0-based indices
    const indices = pageNumbers.map(num => num - 1)
    
    const copiedPages = await newPdf.copyPages(pdfDoc, indices)
    copiedPages.forEach((page) => newPdf.addPage(page))

    const pdfBytes = await newPdf.save()
    return new Blob([pdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error(`Failed to extract pages: ${error.message}`)
  }
}

/**
 * Get PDF metadata
 */
export async function getPDFInfo(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    return {
      pageCount: pdfDoc.getPageCount(),
      title: pdfDoc.getTitle() || 'Untitled',
      author: pdfDoc.getAuthor() || 'Unknown',
      size: file.size,
      name: file.name
    }
  } catch (error) {
    throw new Error(`Failed to read PDF info: ${error.message}`)
  }
}

/**
 * Compress PDF (basic compression by removing metadata and optimizing)
 */
export async function compressPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)

    // Remove metadata for size reduction
    pdfDoc.setTitle('')
    pdfDoc.setAuthor('')
    pdfDoc.setSubject('')
    pdfDoc.setKeywords([])
    pdfDoc.setProducer('')
    pdfDoc.setCreator('')

    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    })

    return new Blob([compressedPdfBytes], { type: 'application/pdf' })
  } catch (error) {
    throw new Error(`Failed to compress PDF: ${error.message}`)
  }
}

/**
 * Download blob as file
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
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
