'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Auth Callback Page
 * Handles Supabase OAuth redirects and session synchronization
 */
export default function AuthCallbackPage() {
  const handledRef = useRef(false)

  useEffect(() => {
    if (handledRef.current) return
    handledRef.current = true

    const handleCallback = async () => {
      let fallbackTimer
      const withTimeout = (promise, ms) =>
        Promise.race([
          promise,
          new Promise((_, reject) => {
            window.setTimeout(() => reject(new Error('auth_timeout')), ms)
          }),
        ])

      try {
        fallbackTimer = window.setTimeout(() => {
          window.location.replace('/products')
        }, 8000)

        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (!code) {
          console.error('Auth callback missing authorization code')
          window.location.replace('/auth?error=callback_failed')
          return
        }

        // Don't let lock/contention issues trap users on callback screen.
        try {
          const { data: { session } } = await withTimeout(supabase.auth.getSession(), 2500)

          if (!session) {
            const { error } = await withTimeout(supabase.auth.exchangeCodeForSession(code), 4000)
            if (error) {
              console.error('Error exchanging auth code:', error)
            }
          }
        } catch (authError) {
          console.error('OAuth callback non-blocking warning:', authError)
        }

        window.location.replace('/products')
      } catch (error) {
        console.error('Callback error:', error)
        window.location.replace('/auth?error=callback_failed')
      } finally {
        if (fallbackTimer) {
          clearTimeout(fallbackTimer)
        }
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Signing you in...</p>
      </div>
    </div>
  )
}
