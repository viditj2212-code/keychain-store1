'use client'

import Link from 'next/link'

/**
 * Footer component
 * Premium flower store design with dark theme
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-1.5 3-4 4.5-7 5m7-5c1.5 3 4 4.5 7 5M5 8c0 7 7 13 7 13s7-6 7-13" />
                </svg>
              </div>
              <span className="font-logo text-2xl font-bold text-white tracking-tight">
                Petal & Stem
              </span>
            </Link>
            <p className="font-sans text-gray-400 leading-relaxed max-w-xs">
              Handcrafted bouquets made with love and the freshest blooms. Delivering happiness one arrangement at a time.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.027 2 12.315 2zm-.962 1.833h-.677c-2.417 0-2.748.01-3.754.056-.994.045-1.536.208-1.9.35-.481.187-.825.412-1.19.777-.365.364-.59.709-.777 1.19-.142.364-.305.906-.35 1.9-.046 1.006-.056 1.338-.056 3.754v.678c0 2.417.01 2.748.056 3.754.045.994.208 1.536.35 1.9.187.481.412.825.777 1.19.364.365.709.59 1.19.777.364.142.906.305 1.9.35 1.006.046 1.338.056 3.754.056h.678c2.417 0 2.748-.01 3.754-.056.994-.045 1.536-.208 1.9-.35.481-.187.825-.412 1.19-.777.364-.365.59-.709.777-1.19.142-.364.305-.906.35-1.9.046-1.006.056-1.338.056-3.754v-.678c0-2.417-.01-2.748-.056-3.754-.045-.994-.208-1.536-.35-1.9-.187-.481-.412-.825-.777-1.19-.364-.365-.709-.59-1.19-.777-.364-.142-.906-.305-1.9-.35-1.006-.046-1.338-.056-3.754-.056z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.315 6.848a5.352 5.352 0 100 10.704 5.352 5.352 0 000-10.704zm0 1.833a3.519 3.519 0 110 7.038 3.519 3.519 0 010-7.038zM17.801 5.163a1.222 1.222 0 100 2.444 1.222 1.222 0 000-2.444z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-primary-400 transition-colors">All Bouquets</Link></li>
              <li><Link href="/products?category=Birthday" className="hover:text-primary-400 transition-colors">Birthday Flowers</Link></li>
              <li><Link href="/products?category=Anniversary" className="hover:text-primary-400 transition-colors">Anniversary</Link></li>
              <li><Link href="/products?category=Sympathy" className="hover:text-primary-400 transition-colors">Sympathy</Link></li>
              <li><Link href="/products?category=Wedding" className="hover:text-primary-400 transition-colors">Wedding</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary-400 transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary-400 transition-colors">Returns Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Stay in Bloom</h3>
            <p className="font-sans text-xs text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
              />
              <button
                type="submit"
                className="w-full bg-primary-500 text-white font-semibold py-3 rounded-lg hover:bg-primary-600 transition-all text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Petal & Stem. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
