'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Create a single Supabase browser client instance (cookie-based for PKCE)
  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }, [])

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        // Check active session
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) console.error('Error getting session:', error)

        if (isMounted && session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
      } catch (err) {
        console.error('Error checking user:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    init()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return

        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [supabase])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      // PGRST116 = "No rows found" (safe to ignore)
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(data ?? null)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      setUser(data.user)
      await fetchProfile(data.user.id)
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.message || 'Failed to login')
    }
  }

  const signup = async ({ email, password, firstName, lastName }) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      })

      if (signUpError) throw signUpError

      // Create profile row (optional but you’re already doing it)
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: firstName,
              last_name: lastName,
              email: email
            }
          ])

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        setUser(authData.user)
        await fetchProfile(authData.user.id)
      }

      return authData
    } catch (error) {
      console.error('Signup error:', error)
      throw new Error(error.message || 'Failed to sign up')
    }
  }

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Must match what you allowed in Supabase Redirect URLs
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Google login error:', error)
      throw new Error(error.message || 'Failed to login with Google')
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      login,
      logout,
      signup,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}