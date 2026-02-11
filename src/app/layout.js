import { Poppins } from 'next/font/google'
import '../styles/globals.css'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

import { NotificationProvider } from '@/contexts/NotificationContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'KeyChain Collective - Elite Daily Carry',
  description: 'Precision-engineered minimalist keychains for the modern collector.',
  keywords: 'keychains, industrial design, everyday carry, minimalist accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
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
