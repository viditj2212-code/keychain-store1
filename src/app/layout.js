import { Inter, Poppins as QueraSub, Playfair_Display } from 'next/font/google'
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

// Using Poppins as display font (Quera alternative)
const quera = QueraSub({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-quera',
  display: 'swap',
})

// Using Playfair Display as logo font (Ragika alternative - elegant serif for premium feel)
const ragika = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-ragika',
  display: 'swap',
})

export const metadata = {
  title: 'Petal & Stem - Premium Fresh Flowers',
  description: 'Artisan floral arrangements crafted with the freshest blooms. Same-day delivery, custom bouquets, and seasonal collections.',
  keywords: 'flowers, bouquets, fresh flowers, floral arrangements, flower delivery, same-day delivery, wedding flowers, occasion flowers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${quera.variable} ${ragika.variable}`}>
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
