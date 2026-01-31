'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Play, Shield, Zap, Globe } from 'lucide-react'
import InteractiveDashboard from './InteractiveDashboard'
import { HeroContent, getHeroContent } from '@/lib/admin'

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({
    title: 'AI-Powered Solar Energy Management for Every Platform',
    subtitle: 'Cross-platform desktop app with intelligent battery charging optimization using advanced AI. Available for Windows, macOS, Linux, and as a Home Assistant add-on. Achieve up to 12.7% cost reduction with dynamic pricing.',
    primaryCTA: 'Download for Free',
    secondaryCTA: 'See It In Action'
  })

  useEffect(() => {
    setContent(getHeroContent())
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Headline */}
          <h1 className="heading-1 mb-6 px-4">
            {content.title.includes('Every Platform') ? (
              <>
                AI-Powered Solar Energy Management for{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Every Platform
                </span>
              </>
            ) : (
              content.title
            )}
          </h1>

          {/* Subheadline */}
          <p className="body-large text-text-secondary mb-8 max-w-4xl mx-auto px-4">
            {content.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
            <motion.a
              href="/#download"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-4 space-x-3 w-full sm:w-auto shadow-glow"
            >
              <Download size={20} />
              <span>{content.primaryCTA}</span>
            </motion.a>
            
            <motion.a
              href="/#showcase"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-base px-8 py-4 space-x-3 w-full sm:w-auto"
            >
              <Play size={20} />
              <span>{content.secondaryCTA}</span>
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 text-text-secondary px-4"
          >
            <div className="flex items-center space-x-3 bg-dark-secondary/50 px-4 py-2 rounded-full border border-dark-border">
              <Zap size={16} className="text-primary" />
              <span className="body-small font-medium">No Subscription</span>
            </div>
            <div className="flex items-center space-x-3 bg-dark-secondary/50 px-4 py-2 rounded-full border border-dark-border">
              <Globe size={16} className="text-primary" />
              <span className="body-small font-medium">100% Privacy</span>
            </div>
            <div className="flex items-center space-x-3 bg-dark-secondary/50 px-4 py-2 rounded-full border border-dark-border">
              <Shield size={16} className="text-primary" />
              <span className="body-small font-medium">Open Source</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 relative px-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-3xl blur-3xl" />
            <InteractiveDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}