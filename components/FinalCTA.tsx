'use client'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCTAContent, CTAContent } from '@/lib/admin'

export default function FinalCTA() {
  const [content, setContent] = useState<CTAContent | null>(null)

  useEffect(() => {
    setContent(getCTAContent())
  }, [])

  if (!content) return null

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #DEAF0B 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Card */}
          <div className="card-elevated border-2 border-primary/30 relative overflow-hidden">
            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="p-12 md:p-16">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Get Started Now</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="heading-2 mb-6"
              >
                {content.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="body-large text-text-secondary max-w-3xl mx-auto mb-12"
              >
                {content.subtitle}
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {[
                  { icon: Clock, text: '5-Minute Setup' },
                  { icon: Shield, text: '100% Privacy' },
                  { icon: Zap, text: '12.7% Savings' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 bg-dark-secondary border border-dark-border rounded-full px-6 py-3"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="body-small font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary group"
                >
                  <Download className="w-5 h-5" />
                  <span>{content.primaryButton}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#features"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  {content.secondaryButton}
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-12 pt-8 border-t border-dark-border"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: '10K+', label: 'Active Users' },
                    { value: '4.9/5', label: 'User Rating' },
                    { value: 'Open', label: 'Source' },
                    { value: 'Free', label: 'Forever' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="caption text-text-muted">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
