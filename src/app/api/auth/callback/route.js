import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

/**
 * Server API route for OAuth callback logic.
 * Accepts `GET /api/auth/callback?code=...`, exchanges the code,
 * sets auth cookies and redirects to `/products`.
 */
export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=missing_code', origin))
  }

  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)')
    return NextResponse.redirect(new URL('/auth?error=missing_env', origin))
  }

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
          console.error('Failed to set cookies in auth callback:', err)
        }
      },
    },
  })

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Exchange code error:', error)
      return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error.message)}`, origin))
    }
  } catch (err) {
    console.error('Unexpected error in auth callback:', err)
    return NextResponse.redirect(new URL('/auth?error=server_error', origin))
  }

  return NextResponse.redirect(new URL('/products', origin))
}
