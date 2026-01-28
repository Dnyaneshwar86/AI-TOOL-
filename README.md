# 🛠️ OmniTool Hub - All-in-One Free Online Tools

A comprehensive, privacy-focused web platform offering free online tools for PDF manipulation, image processing, text analysis, and development utilities. Built with Next.js 14 and powered by 100% client-side processing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

### 🔒 Privacy First
- **100% Client-Side Processing** - Your files never leave your device
- **No Server Uploads** - All processing happens in your browser
- **No Data Storage** - We don't store or track your files
- **Completely Free** - No registration, no limits, no watermarks

### 📁 PDF Tools
- **Merge PDF** - Combine multiple PDF files into one document
- **Split PDF** - Extract or separate pages from PDF files
- **Compress PDF** - Reduce PDF file size while maintaining quality

### 🖼️ Image Tools
- **Resize Image** - Change image dimensions with aspect ratio control
- **Crop Image** - Trim and crop images precisely
- **Convert Image** - Convert between JPG, PNG, WebP, and more

### 📝 Content Tools
- **Word Counter** - Count words, characters, sentences, and paragraphs
- **Case Converter** - Convert text to uppercase, lowercase, title case, etc.
- **Lorem Ipsum Generator** - Generate placeholder text for designs

### 💻 Developer Tools
- **JSON Formatter** - Format, validate, and beautify JSON code
- **Base64 Encoder/Decoder** - Encode and decode text/files to Base64
- **HTML Minifier** - Minify and optimize HTML code

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Processing**: [pdf-lib](https://pdf-lib.js.org/)
- **Image Processing**: [browser-image-compression](https://www.npmjs.com/package/browser-image-compression)
- **Deployment**: [Vercel](https://vercel.com/) (Recommended)

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dnyaneshwar86/AI-TOOL-.git
   cd AI-TOOL-
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
AI-TOOL-/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with Navbar/Footer
│   ├── page.js                   # Homepage with tool dashboard
│   ├── globals.css               # Global styles & Tailwind
│   └── tools/                    # Tool pages
│       ├── pdf-merge/
│       ├── image-resize/
│       ├── word-counter/
│       └── json-formatter/
├── components/                   # React components
│   ├── Navbar.js                 # Navigation with theme toggle
│   ├── Footer.js                 # Footer with links
│   ├── ToolCard.js               # Tool card component
│   └── FileUploader.js           # Drag & drop file uploader
├── utils/                        # Utility functions
│   ├── pdfUtils.js               # PDF processing logic
│   ├── imageUtils.js             # Image processing logic
│   ├── textUtils.js              # Text analysis utilities
│   └── devUtils.js               # Developer tool utilities
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🎨 Features in Detail

### Dark Mode Support
- Automatic dark mode detection
- Manual theme toggle
- Persistent theme preference (localStorage)
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts

### Search & Filter
- Real-time search across all tools
- Category-based filtering
- Tag-based search
- Keyboard shortcuts

### Performance
- Client-side processing for instant results
- No server round-trips
- Optimized bundle size
- Fast page loads

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Tools

1. **Create utility functions** in `utils/`
2. **Create tool page** in `app/tools/[tool-name]/page.js`
3. **Add tool metadata** in `app/page.js` TOOLS array
4. **Test functionality** locally

Example tool structure:
```javascript
{
  id: 'tool-id',
  title: 'Tool Name',
  description: 'Tool description',
  category: 'Category',
  icon: IconComponent,
  href: '/tools/tool-id',
  color: 'blue',
  tags: ['tag1', 'tag2']
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

3. **Configure (if needed)**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Deploy to Other Platforms
- Compatible with any platform supporting Next.js
- See [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [pdf-lib](https://pdf-lib.js.org/) - PDF manipulation
- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) - Image processing

## 📧 Contact

- **Author**: Dnyaneshwar
- **GitHub**: [@Dnyaneshwar86](https://github.com/Dnyaneshwar86)
- **Repository**: [AI-TOOL-](https://github.com/Dnyaneshwar86/AI-TOOL-)

## 🗺️ Roadmap

- [ ] Add more PDF tools (PDF to Word, Word to PDF)
- [ ] Add image background remover
- [ ] Add more text transformation tools
- [ ] Add code minifiers for CSS and JavaScript
- [ ] Add color converter tool
- [ ] Add QR code generator
- [ ] Add markdown editor
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

---

**Made with ❤️ for the community**
