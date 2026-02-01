'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, User } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="heading-2 mb-2">Admin <span className="text-primary">Login</span></h1>
          <p className="text-text-secondary">Access the admin dashboard</p>
        </div>

        <div className="card-elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block body-base mb-2 text-text-primary">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full p-4 pl-12 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block body-base mb-2 text-text-primary">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full p-4 pl-12 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-text-secondary hover:text-primary transition-colors">
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  )
}
