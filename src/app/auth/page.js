'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

/**
 * Premium Authentication Page
 * Features toggle between Sign In and Sign Up with Industrial Noir styling
 */
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { signup, login, loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        await login({ email, password })
      } else {
        await signup({ email, password, firstName, lastName })
      }
      router.push('/products')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await loginWithGoogle()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white py-24 px-8 overflow-hidden">
      {/* Heavy Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.03)_0%,transparent_50%)] pointer-events-none"></div>
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="w-full max-w-sm relative z-10">
        {/* Header / Identity Protocol */}
        <div className="text-center mb-16">
          <Link href="/" className="group inline-flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-space font-extrabold italic text-2xl transform group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-gray-900/20">
              K
            </div>
            <span className="font-space text-3xl font-extrabold text-gray-900 tracking-tighter uppercase italic group-hover:tracking-normal transition-all duration-500">
              Keychain<span className="text-gray-300">.</span>
            </span>
          </Link>
          <div className="space-y-4">
            <p className="font-outfit text-[10px] font-bold text-gray-400 uppercase tracking-[0.6em] italic">Access_Protocol</p>
            <h2 className="font-space text-4xl font-extrabold text-gray-900 uppercase italic tracking-tighter leading-none">
              {isLogin ? 'System \nEntry.' : 'New \nIdentity.'}
            </h2>
          </div>
        </div>

        {/* Console Error Output */}
        {error && (
          <div className="mb-10 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600 font-outfit text-[10px] font-bold uppercase tracking-widest italic flex items-center gap-4 shadow-lg shadow-red-100/50 animate-shake">
            <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center font-bold">!</div>
            <span>FAULT: {error}</span>
          </div>
        )}

        {/* Form / Data Matrix */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest italic ml-1">F_Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all"
                  placeholder="ID_FIRST"
                />
              </div>
              <div className="space-y-3">
                <label className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest italic ml-1">L_Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all"
                  placeholder="ID_LAST"
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest italic ml-1">Email_Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all"
              placeholder="USER_CORE"
            />
          </div>

          <div className="space-y-3">
            <label className="font-outfit text-[9px] font-bold text-gray-400 uppercase tracking-widest italic ml-1">Secure_Code</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 font-outfit font-bold uppercase tracking-widest text-gray-900 text-xs italic focus:border-gray-900 focus:bg-white focus:ring-0 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-20 bg-gray-900 text-white rounded-[2rem] font-space font-extrabold text-[12px] uppercase tracking-[0.5em] italic hover:bg-black transition-all active:scale-[0.98] disabled:opacity-30 mt-10 shadow-2xl shadow-gray-900/20"
          >
            {loading ? 'Authorizing_' : (isLogin ? 'Initiate_Session' : 'Finalize_ID')}
          </button>
        </form>

        {/* Technical Splitter */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-900/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.4em] italic bg-white px-6 text-gray-300">
            External_Link
          </div>
        </div>

        {/* Neural Login / Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-18 bg-white border-2 border-gray-900/5 rounded-2xl font-outfit font-bold uppercase tracking-widest text-[10px] italic text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-lg shadow-gray-200/50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>

        {/* Toggle Protocol */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-outfit text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest italic transition-all border-b border-transparent hover:border-gray-900 pb-1"
          >
            {isLogin ? "Request_New_Access_ID" : "Return_To_Entry_Protocol"}
          </button>
        </div>
      </div>
    </div>
  )
}
