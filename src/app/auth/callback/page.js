"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/common/Loading'

/**
 * Client-side OAuth landing page.
 * Reads the `code` query param and forwards the browser
 * to the server API route which performs the token exchange
 * and sets auth cookies, then redirects the user.
 */
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) {
      router.replace('/auth?error=missing_code')
      return
    }

    // Perform a full navigation so the server route can set cookies
    // and then redirect the user server-side.
    window.location.href = `/api/auth/callback?code=${encodeURIComponent(code)}`
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50/20">
      <div className="text-center">
        <Loading text="Completing authentication..." />
      </div>
    </div>
  )
}
