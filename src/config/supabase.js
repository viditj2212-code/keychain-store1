const { createClient } = require('@supabase/supabase-js');
const logger = require('../utils/logger');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || !supabaseUrl.match(/^https?:\/\//)) {
  logger.warn('Missing Supabase credentials - database features will be unavailable');
  // Return a mock client that logs warnings for development  
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

  const mockClient = {
    from: () => mockBuilder,
    auth: {
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      admin: {
        getUserById: async () => ({ data: null, error: new Error('Supabase not configured') }),
        updateUserById: async () => ({ data: null, error: new Error('Supabase not configured') }),
      },
      resetPasswordForEmail: async () => ({ data: null, error: new Error('Supabase not configured') }),
      updateUser: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
    }
  };
  module.exports = mockClient;
} else {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  module.exports = supabase;
}
