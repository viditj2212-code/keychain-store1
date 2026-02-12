'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/**
 * Auth Callback Page
 * Handles Supabase OAuth redirects and session synchronization
 */
export default function AuthCallbackPage() {
  const router = useRouter()
  const handledRef = useRef(false)

  useEffect(() => {
    if (handledRef.current) return
    handledRef.current = true

    const handleCallback = async () => {
      try {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (!code) {
          console.error('Auth callback missing authorization code')
          router.push('/auth?error=callback_failed')
          return
        }

        // PKCE flow only: exchange auth code for a session.
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error('Error exchanging auth code:', error)
          router.push('/auth?error=callback_failed')
          return
        }

        // Supabase can consume hash/query params; always verify active session.
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
          console.error('Auth callback user error:', userError)
          router.push('/auth?error=callback_failed')
          return
        }

        // Ensure OAuth users always have a profile row.
        await supabase
          .from('users')
          .upsert(
            {
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name || '',
              last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              role: 'user'
            },
            { onConflict: 'id' }
          )

        router.replace('/products')
      } catch (error) {
        console.error('Callback error:', error)
        router.push('/auth?error=callback_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Signing you in...</p>
      </div>
    </div>
  )
}
