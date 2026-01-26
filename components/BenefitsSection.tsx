'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Monitor, Shield, Activity, DollarSign, Leaf, Sparkles } from 'lucide-react'
import { Benefit, getBenefits, getBenefitsSectionContent } from '@/lib/admin'

export default function BenefitsSection() {
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [sectionContent, setSectionContent] = useState({ title: '', subtitle: '' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setBenefits(getBenefits())
    setSectionContent(getBenefitsSectionContent())
  }, [])

  const enabledBenefits = benefits.filter(b => b.enabled)

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'brain': return Brain
      case 'monitor': return Monitor
      case 'shield': return Shield
      case 'activity': return Activity
      case 'dollar-sign': return DollarSign
      case 'leaf': return Leaf
      default: return Brain
    }
  }

  return (
    <section id="benefits" className="section-padding bg-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Benefits</span>
          </div>
          <h2 className="heading-2 mb-6">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.title }} />
          </h2>
          <p className="body-large text-text-secondary max-w-4xl mx-auto">
            {sectionContent.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enabledBenefits.map((benefit, index) => {
            const Icon = getIcon(benefit.icon)
            const isHovered = hoveredIndex === index
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1 : 0.8
                  }}
                  className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10"
                />

                <div className="card-elevated h-full relative overflow-hidden">
                  {/* Top Border Accent */}
                  <motion.div
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/60"
                  />

                  <div className="p-8">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl flex items-center justify-center relative">
                        <Icon className="text-primary" size={28} />
                        {/* Icon Glow */}
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="heading-4 mb-4 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="body-base text-text-secondary leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <motion.div
                      animate={{ width: isHovered ? '60px' : '0px' }}
                      transition={{ duration: 0.3 }}
                      className="h-1 bg-primary rounded-full mt-6"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '12.7%', label: 'Cost Savings' },
            { value: '85%+', label: 'AI Accuracy' },
            { value: '5 min', label: 'Setup Time' },
            { value: '100%', label: 'Privacy' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="body-small text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
