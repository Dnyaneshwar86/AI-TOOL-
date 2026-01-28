import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'OmniTool Hub - All-in-One Free Online Tools',
  description: 'Free online tools for PDF, Images, Text, and Development. Privacy-focused, client-side processing. No uploads to servers.',
  keywords: 'PDF tools, image tools, online tools, free tools, pdf merge, image resize, word counter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
