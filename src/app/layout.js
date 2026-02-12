import { Inter, Poppins as QueraSub } from 'next/font/google'
import '../styles/globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

import { NotificationProvider } from '@/contexts/NotificationContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

// Using Poppins as a stand-in for Quera (Quera not on Google Fonts, using Poppins as display font)
// If you want to use custom Quera, replace with local font-face
const quera = QueraSub({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-quera',
  display: 'swap',
})

export const metadata = {
  title: 'KeyChain Collective - Elite Daily Carry',
  description: 'Precision-engineered minimalist keychains for the modern collector.',
  keywords: 'keychains, industrial design, everyday carry, minimalist accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${quera.variable}`}>
      <body className="font-sans bg-white text-gray-900">
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <LayoutWrapper>{children}</LayoutWrapper>
              </div>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
