'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Rocket, Settings, Zap, Brain, Database, Bell, Target, Shield, BarChart, Battery, Book, Download, Code, ChevronRight, ExternalLink, Search } from 'lucide-react'
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
    <section id="user-guide" className="section-padding bg-[#0b0c0e]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-white mb-3" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="text-lg text-gray-400">{content.subtitle}</p>
        </div>

        {/* Main Layout */}
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {enabledSections.map((section) => {
                const Icon = iconMap[section.icon] || Settings
                const isActive = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeContent && (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section Header */}
                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    {(() => {
                      const Icon = iconMap[activeContent.icon] || Settings
                      return <Icon className="text-primary" size={24} />
                    })()}
                    <h3 className="text-3xl font-semibold text-white">{activeContent.title}</h3>
                  </div>
                  <p className="text-gray-400">{activeContent.description}</p>
                </div>

                {/* Subsections */}
                <div className="space-y-8">
                  {activeContent.subsections.map((subsection, idx) => (
                    <div key={idx} className="bg-[#111217] border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-colors">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="text-primary text-sm font-mono bg-primary/10 px-2 py-1 rounded">{idx + 1}</span>
                        {subsection.title}
                      </h4>
                      <div className="space-y-3">
                        {subsection.steps.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex gap-3 group">
                            <ChevronRight className="text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" size={16} />
                            <p className="text-gray-300 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Pro Tips */}
        {enabledTips.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-6">Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {enabledTips.map((tip) => {
                const TipIcon = iconMap[tip.icon] || BarChart
                return (
                  <div key={tip.id} className="bg-[#111217] border border-white/10 rounded-lg p-5 hover:border-primary/30 transition-colors">
                    <TipIcon className="text-primary mb-3" size={20} />
                    <h4 className="text-white font-medium mb-2">{tip.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{tip.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
