'use client'

import { motion } from 'framer-motion'
import { Check, X, Zap, TrendingUp, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getComparisonContent, ComparisonContent } from '@/lib/admin'

export default function Comparison() {
  const [content, setContent] = useState<ComparisonContent | null>(null)

  useEffect(() => {
    setContent(getComparisonContent())
  }, [])

  if (!content) return null

  const enabledFeatures = content.features.filter(f => f.enabled)

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Comparison</span>
          </div>
          <h2 className="heading-2 mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="body-large text-text-secondary max-w-3xl mx-auto">{content.subtitle}</p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Traditional Systems */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card bg-dark-secondary border border-dark-border"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="heading-4 text-gray-300">Traditional Systems</h3>
              <p className="caption text-text-muted mt-2">Basic solar management</p>
            </div>
            <div className="space-y-3">
              {enabledFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
                  <span className="body-small text-text-secondary text-left flex-1">{feature.name}</span>
                  <div className="flex-shrink-0 ml-3">
                    {typeof feature.traditional === 'boolean' ? (
                      feature.traditional ? (
                        <Check className="text-green-400" size={18} />
                      ) : (
                        <X className="text-red-400" size={18} />
                      )
                    ) : (
                      <span className="text-xs text-text-muted font-medium">{feature.traditional}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Home Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card bg-dark-secondary border border-dark-border"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="heading-4 text-blue-300">Home Assistant</h3>
              <p className="caption text-text-muted mt-2">Smart home integration</p>
            </div>
            <div className="space-y-3">
              {enabledFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
                  <span className="body-small text-text-secondary text-left flex-1">{feature.name}</span>
                  <div className="flex-shrink-0 ml-3">
                    {typeof feature.ha === 'boolean' ? (
                      feature.ha ? (
                        <Check className="text-green-400" size={18} />
                      ) : (
                        <X className="text-red-400" size={18} />
                      )
                    ) : (
                      <span className="text-xs text-text-muted font-medium">{feature.ha}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SolarAutopilot - Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="card-elevated border-2 border-primary relative overflow-hidden"
          >
            {/* Popular Badge */}
            <div className="absolute top-4 right-4 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="heading-4 text-primary">SolarAutopilot</h3>
              <p className="caption text-text-secondary mt-2">AI-powered optimization</p>
            </div>
            <div className="space-y-3">
              {enabledFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
                  <span className="body-small text-white text-left flex-1 font-medium">{feature.name}</span>
                  <div className="flex-shrink-0 ml-3">
                    {typeof feature.solar === 'boolean' ? (
                      feature.solar ? (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="text-primary" size={16} />
                        </div>
                      ) : (
                        <X className="text-red-400" size={18} />
                      )
                    ) : (
                      <span className="text-sm text-primary font-bold">{feature.solar}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-elevated text-center p-12"
        >
          <h3 className="heading-3 mb-4" dangerouslySetInnerHTML={{ __html: content.bottomTitle }} />
          <p className="body-large text-text-secondary max-w-3xl mx-auto mb-8">{content.bottomSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#download" className="btn-primary">
              Start Your 5-Minute Setup
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
