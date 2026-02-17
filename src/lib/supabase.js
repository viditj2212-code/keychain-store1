import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase

// Check for valid URL format (simple check for http/https)
const isValidUrl = (url) => url && url.match(/^https?:\/\//)

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
  console.warn('Missing or invalid Supabase environment variables - database features will be unavailable')

  // Create a mock builder that supports method chaining
  const mockBuilder = {
    select: () => mockBuilder,
    insert: () => mockBuilder,
    update: () => mockBuilder,
    delete: () => mockBuilder,
    eq: () => mockBuilder,
    neq: () => mockBuilder,
    gt: () => mockBuilder,
    gte: () => mockBuilder,
    lt: () => mockBuilder,
    lte: () => mockBuilder,
    like: () => mockBuilder,
    ilike: () => mockBuilder,
    is: () => mockBuilder,
    in: () => mockBuilder,
    contains: () => mockBuilder,
    orderBy: () => mockBuilder,
    limit: () => mockBuilder,
    single: () => mockBuilder,
    maybeSingle: () => mockBuilder,
    order: () => mockBuilder,
    range: () => mockBuilder,

    // Make it thenable so it can be awaited
    then: (resolve) => resolve({ data: [], error: new Error('Supabase not configured') })
  };

  supabase = {
    from: () => mockBuilder,
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      exchangeCodeForSession: async () => ({ data: null, error: new Error('Supabase not configured') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      })
    }
  };
} else {
  // Centralized singleton browser client
  supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
