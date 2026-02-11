'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/**
 * Auth Callback Page
 * Handles Supabase OAuth redirects and session synchronization
 */
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have hash parameters (OAuth callback)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (accessToken && refreshToken) {
          // Set the session with the tokens from the hash
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })

          if (error) {
            console.error('Error setting session:', error)
            router.push('/auth?error=callback_failed')
            return
          }

          // Get the user data to create database record if needed
          const { data: { user } } = await supabase.auth.getUser()

          if (user) {
            // Check if user exists in database, if not create them
            const { data: existingUser } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single()

            if (!existingUser) {
              // Create user record for OAuth users
              await supabase
                .from('users')
                .insert([
                  {
                    id: user.id,
                    email: user.email,
                    first_name: user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name || '',
                    last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                    role: 'user'
                  }
                ])
            }
          }

          // Redirect to homepage
          router.push('/')
        } else {
          // Fallback to regular session check
          const { error } = await supabase.auth.getSession()
          if (!error) {
            router.push('/')
          } else {
            console.error('Auth callback error:', error)
            router.push('/auth?error=callback_failed')
          }
        }
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
