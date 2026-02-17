import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

/**
 * OAuth callback handler for Google authentication
 * Exchanges the code for a session and redirects to products page
 */
export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  // If no code, just send user back to auth page
  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=missing_code', origin))
  }

  const cookieStore = cookies()

  // Debug logging
  console.log('Auth Callback: Processing code exchange')
  console.log('Supabase URL available:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Supabase Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
    return NextResponse.redirect(new URL('/auth?error=missing_env', origin))
  }

  // Create Supabase server client (App Router compatible)
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (err) {
          // In some edge cases Next may restrict setting cookies here,
          // but usually this works fine in route handlers.
          console.error('Failed to set cookies in auth callback:', err)
        }
      },
    },
  })

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Exchange code error:', error)
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(error.message)}`, origin)
      )
    }
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(new URL('/auth?error=server_error', origin))
  }

  // Redirect to products page after successful authentication
  return NextResponse.redirect(new URL('/products', origin))
}