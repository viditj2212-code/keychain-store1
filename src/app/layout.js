import { Inter, Outfit, Space_Grotesk, Poppins, Roboto_Slab } from 'next/font/google'
import '../styles/globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

import { NotificationProvider } from '@/contexts/NotificationContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-slab',
  display: 'swap',
})

export const metadata = {
  title: 'KeyChain Collective - Elite Daily Carry',
  description: 'Precision-engineered minimalist keychains for the modern collector.',
  keywords: 'keychains, industrial design, everyday carry, minimalist accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} ${poppins.variable} ${robotoSlab.variable}`}>
      <body className="font-poppins bg-white text-gray-900">
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
