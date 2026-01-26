'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, BarChart3, Activity, Smartphone, Zap, Brain, Shield, ArrowRight, Play } from 'lucide-react'
import { Feature, getFeatures, getFeaturesSectionContent } from '@/lib/admin'

export default function FeaturesShowcase() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [sectionContent, setSectionContent] = useState({ title: '', subtitle: '' })
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setFeatures(getFeatures())
    setSectionContent(getFeaturesSectionContent())
  }, [])

  const enabledFeatures = features.filter(f => f.enabled)

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'monitor': return Monitor
      case 'brain': return Brain
      case 'activity': return Activity
      case 'smartphone': return Smartphone
      case 'zap': return Zap
      case 'shield': return Shield
      default: return Monitor
    }
  }

  return (
    <section id="features" className="section-padding bg-dark-secondary relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#DEAF0B 1px, transparent 1px), linear-gradient(90deg, #DEAF0B 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Features</span>
          </div>
          <h2 className="heading-2 mb-6">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.title }} />
          </h2>
          <p className="body-large text-text-secondary max-w-4xl mx-auto px-4">
            {sectionContent.subtitle}
          </p>
        </motion.div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {enabledFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            return (
              <motion.button
                key={feature.id || index}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeFeature === index
                    ? 'bg-primary text-dark shadow-glow'
                    : 'bg-dark border border-dark-border text-white hover:border-primary/50'
                }`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{feature.title}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Active Feature Display */}
        <AnimatePresence mode="wait">
          {enabledFeatures[activeFeature] && (
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = getIcon(enabledFeatures[activeFeature].icon)
                    return (
                      <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-4">
                        <Icon className="text-primary" size={32} />
                      </div>
                    )
                  })()}
                  <h3 className="heading-3">{enabledFeatures[activeFeature].title}</h3>
                </div>
                
                <p className="body-large text-text-secondary leading-relaxed">
                  {enabledFeatures[activeFeature].description}
                </p>
                
                {enabledFeatures[activeFeature].stats && (
                  <div className="grid grid-cols-3 gap-4">
                    {enabledFeatures[activeFeature].stats.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: statIndex * 0.1 }}
                        className="card-elevated text-center p-4 group hover:border-primary/30 transition-colors"
                      >
                        <div className="text-primary font-semibold body-small group-hover:scale-110 transition-transform">
                          {stat}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-primary font-medium group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Image */}
              {(enabledFeatures[activeFeature].uploadedImage || enabledFeatures[activeFeature].image) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 shadow-elevated group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative">
                      <img
                        src={enabledFeatures[activeFeature].uploadedImage || enabledFeatures[activeFeature].image}
                        alt={enabledFeatures[activeFeature].title}
                        className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                      
                      {/* Bottom Info Bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-bold text-lg mb-1">
                              {enabledFeatures[activeFeature].title}
                            </div>
                            <div className="text-text-secondary text-sm">
                              Feature {activeFeature + 1} of {enabledFeatures.length}
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {enabledFeatures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`h-2 rounded-full transition-all ${
                          activeFeature === index ? 'w-8 bg-primary' : 'w-2 bg-dark-border hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
