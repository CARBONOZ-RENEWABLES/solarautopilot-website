'use client'

import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <Image
          src="https://carbonoz.com/assets/images/image04.jpg?v=baf9c51a"
          alt="CARBONOZ"
          width={200}
          height={80}
          className="mx-auto mb-8"
        />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary">
          Go Home
        </a>
      </div>
    </div>
  )
}