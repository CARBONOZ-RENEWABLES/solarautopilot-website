'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Rocket, Settings, Zap, Brain, Database, Bell, Target, Shield, BarChart, Battery, Book, Download, Code, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react'
import { getUserGuideContent, UserGuideContent } from '@/lib/admin'

const iconMap: Record<string, any> = {
  rocket: Rocket,
  settings: Settings,
  zap: Zap,
  brain: Brain,
  database: Database,
  bell: Bell,
  target: Target,
  shield: Shield,
  'bar-chart': BarChart,
  battery: Battery,
  book: Book,
  download: Download,
  code: Code
}

export default function UserGuide() {
  const [content, setContent] = useState<UserGuideContent>({ title: "", subtitle: "", sections: [], proTips: [] })
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    getUserGuideContent().then(data => {
      setContent(data)
      if (data.sections.length > 0) setActiveSection(data.sections[0].id)
    })
  }, [])

  const enabledSections = content.sections.filter(s => s.enabled)
  const enabledTips = content.proTips.filter(t => t.enabled)
  const activeContent = enabledSections.find(s => s.id === activeSection)

  return (
    <section id="user-guide" className="section-padding bg-gradient-to-b from-dark to-dark-secondary">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="body-large text-text-secondary max-w-3xl mx-auto">{content.subtitle}</p>
        </motion.div>

        {/* Main Layout - Modern Card Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {/* Navigation Cards */}
          <div className="lg:col-span-1 space-y-3">
            {enabledSections.map((section, idx) => {
              const Icon = iconMap[section.icon] || Settings
              const isActive = activeSection === section.id
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-glow' 
                      : 'bg-dark-secondary border border-dark-border hover:border-primary/40 hover:bg-dark-tertiary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-primary/20' : 'bg-dark-tertiary group-hover:bg-primary/10'
                    }`}>
                      <Icon className={isActive ? 'text-primary' : 'text-text-secondary group-hover:text-primary'} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold body-base truncate ${
                        isActive ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                      }`}>
                        {section.title}
                      </h4>
                    </div>
                    {isActive && (
                      <CheckCircle2 className="text-primary flex-shrink-0" size={18} />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Content Area - Modern Design */}
          <div className="lg:col-span-3">
            {activeContent && (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card-elevated"
              >
                {/* Section Header with Icon */}
                <div className="flex items-start gap-4 mb-8 pb-6 border-b border-dark-border">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                    {(() => {
                      const Icon = iconMap[activeContent.icon] || Settings
                      return <Icon className="text-primary" size={32} />
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-3 mb-2">{activeContent.title}</h3>
                    <p className="body-base text-text-secondary">{activeContent.description}</p>
                  </div>
                </div>

                {/* Subsections - Step-by-Step Cards */}
                <div className="space-y-6">
                  {activeContent.subsections.map((subsection, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-dark-secondary border border-dark-border rounded-xl p-6 hover:border-primary/30 transition-all group"
                    >
                      {/* Subsection Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                          <span className="text-primary font-bold body-small">{idx + 1}</span>
                        </div>
                        <h4 className="heading-4 flex-1">{subsection.title}</h4>
                        <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                      </div>

                      {/* Steps with Modern Design */}
                      <div className="space-y-4 pl-11">
                        {subsection.steps.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex gap-3 group/step">
                            <div className="mt-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/step:scale-150 transition-transform" />
                            </div>
                            <p className="body-base text-text-secondary group-hover/step:text-text-primary transition-colors leading-relaxed">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Subsection Image */}
                      {subsection.image && (
                        <div className="mt-6 pl-11 rounded-lg overflow-hidden border border-dark-border hover:border-primary/30 transition-colors">
                          <img 
                            src={subsection.image} 
                            alt={subsection.title}
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Pro Tips - Modern Grid */}
        {enabledTips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-10">
              <h3 className="heading-3 mb-3">
                Pro <span className="text-primary">Tips</span>
              </h3>
              <p className="body-base text-text-secondary">Expert recommendations for optimal performance</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {enabledTips.map((tip, idx) => {
                const TipIcon = iconMap[tip.icon] || BarChart
                return (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="card-interactive group"
                  >
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 inline-flex mb-4 group-hover:scale-110 transition-transform">
                      <TipIcon className="text-primary" size={24} />
                    </div>
                    <h4 className="heading-4 mb-3">{tip.title}</h4>
                    <p className="body-small text-text-secondary leading-relaxed">{tip.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
