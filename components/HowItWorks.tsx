'use client'

import { motion } from 'framer-motion'
import { Download, Link, Settings, TrendingUp, Zap, Brain, Activity, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getHowItWorksContent, HowItWorksContent } from '@/lib/admin'

const iconMap: Record<string, any> = {
  download: Download,
  link: Link,
  settings: Settings,
  'trending-up': TrendingUp,
  zap: Zap,
  brain: Brain,
  activity: Activity,
  target: Target
}

export default function HowItWorks() {
  const [content, setContent] = useState<HowItWorksContent | null>(null)

  useEffect(() => {
    setContent(getHowItWorksContent())
  }, [])

  if (!content) return null

  const enabledSteps = content.steps.filter(step => step.enabled)

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {enabledSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || Download
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-dark font-bold text-xl relative z-10">
                      {step.number}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/30 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-text-secondary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow for desktop */}
                  {index < enabledSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-2 text-primary">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#download" className="btn-primary text-base px-6 py-3 inline-flex">
            {content.ctaButtonText || content.ctaText}
          </a>
        </motion.div>
      </div>
    </section>
  )
}