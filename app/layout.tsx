import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://192.168.160.98'),
  title: {
    default: 'SolarAutopilot - AI-Powered Solar Energy Management',
    template: '%s | SolarAutopilot'
  },
  icons: {
    icon: 'https://carbonoz.com/assets/images/image04.jpg?v=baf9c51a',
  },
  description: 'Optimize your solar system with AI that learns your patterns. Save up to 12.7% on electricity costs. Free, open source, and privacy-first solar energy management.',
  keywords: ['solar energy', 'AI optimization', 'battery management', 'cost savings', 'open source', 'solar autopilot', 'home assistant', 'energy management', 'smart solar', 'renewable energy'],
  authors: [{ name: 'CARBONOZ', url: 'https://carbonoz.com' }],
  creator: 'CARBONOZ',
  publisher: 'CARBONOZ',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://192.168.160.98',
    siteName: 'SolarAutopilot',
    title: 'SolarAutopilot - AI-Powered Solar Energy Management',
    description: 'Save up to 12.7% on electricity costs with AI that learns your patterns. Free, open source, and privacy-first.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolarAutopilot - AI-Powered Solar Energy Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolarAutopilot - AI-Powered Solar Energy Management',
    description: 'Save up to 12.7% on electricity costs with AI that learns your patterns.',
    images: ['/og-image.jpg'],
    creator: '@solarautopilot',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://192.168.160.98',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-dark text-text-primary antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}