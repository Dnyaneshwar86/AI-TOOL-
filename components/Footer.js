import { Heart, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OmniTool Hub
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Free online tools for everyone. All processing happens in your browser for maximum privacy.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#pdf" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PDF Tools</a></li>
              <li><a href="#image" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Image Tools</a></li>
              <li><a href="#content" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Content Tools</a></li>
              <li><a href="#dev" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dev Tools</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} className="text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="mailto:contact@omnitool.com"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} className="text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Made with <Heart size={16} className="mx-1 text-red-500 fill-red-500" /> for the community
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} OmniTool Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
