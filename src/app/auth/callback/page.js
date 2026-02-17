'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/Loading'

/**
 * Auth callback page - handles OAuth redirects
 */
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after successful auth
    const timer = setTimeout(() => {
      router.push('/')
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50/20">
      <div className="text-center">
        <Loading text="Completing authentication..." />
      </div>
    </div>
  )
}
