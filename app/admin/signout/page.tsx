'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="bg-dark-secondary border border-dark-border rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-2">Sign out</h1>
        <p className="text-text-secondary mb-6">Are you sure you want to sign out?</p>
        
        <div className="flex gap-3">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ backgroundColor: '#DEAF0B' }}
            className="flex-1 hover:bg-primary-dark text-dark px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign out
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 bg-dark-tertiary hover:bg-surface-hover text-white px-6 py-3 rounded-lg font-medium transition-colors border border-dark-border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
