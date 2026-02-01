import { Inter, Outfit, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

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

export const metadata = {
  title: 'KeyChain Collective - Elite Daily Carry',
  description: 'Precision-engineered minimalist keychains for the modern collector.',
  keywords: 'keychains, industrial design, everyday carry, minimalist accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="font-outfit bg-white text-gray-900">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <LayoutWrapper>{children}</LayoutWrapper>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
