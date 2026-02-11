import Link from 'next/link'

/**
 * Footer component with links and social media
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'New Arrivals', href: '/products?sort=new' },
        { label: 'Best Sellers', href: '/products?sort=popular' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
  ]

  return (
    <footer className="bg-white border-t-2 border-gray-900/5 text-gray-900 relative overflow-hidden">
      {/* Heavy Technical Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24">
          {/* Brand Technical Section */}
          <div className="md:col-span-1 space-y-8">
            <Link prefetch={false} href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-space font-extrabold italic text-xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-gray-900/20">
                K
              </div>
              <span className="font-poppins text-2xl font-bold text-gray-900 tracking-tighter uppercase italic">
                Keychain<span className="text-gray-300">.</span>
              </span>
            </Link>
            <p className="font-poppins text-[11px] font-semibold text-gray-400 uppercase tracking-[0.3em] leading-relaxed italic max-w-xs">
              Engineering essential carriers through material integrity and industrial precision.
            </p>
            {/* Social Protocols */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  prefetch={false}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-900/20"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === 'instagram' && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    )}
                    {social.icon === 'facebook' && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    )}
                    {social.icon === 'twitter' && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Infrastructure Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-8">
              <h3 className="font-space text-[10px] font-extrabold text-gray-900 uppercase tracking-[0.5em] italic">{section.title} Matrix</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      className="font-poppins text-xs font-semibold text-gray-400 hover:text-gray-900 uppercase tracking-widest italic transition-all duration-300 hover:pl-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* System Terminal Bar */}
        <div className="border-t-2 border-gray-900/5 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-poppins text-[10px] font-semibold text-gray-300 uppercase tracking-widest italic leading-relaxed text-center md:text-left">
            Acquisition Portal Protocol 1.0 <br />
            © {currentYear} Industrial Bureau. Secure Transmission.
          </p>
          <div className="flex items-center gap-10">
            <Link prefetch={false} href="/privacy" className="font-poppins text-[9px] font-semibold text-gray-400 hover:text-gray-900 uppercase tracking-[0.2em] italic transition-colors">Privacy_Protocol</Link>
            <Link prefetch={false} href="/terms" className="font-poppins text-[9px] font-semibold text-gray-400 hover:text-gray-900 uppercase tracking-[0.2em] italic transition-colors">Terms_Sequence</Link>
            <p className="font-poppins text-[12px] font-bold text-gray-900 uppercase italic tracking-tighter hidden lg:block">Material Integrity_</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
