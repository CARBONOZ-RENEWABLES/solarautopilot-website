'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Zap, Target, BarChart3, Clock, Battery, DollarSign } from 'lucide-react'
import { AIFeature, getAIFeatures, getAIFeaturesSectionContent } from '@/lib/admin'

export default function AIFeatures() {
  const [aiFeatures, setAIFeatures] = useState<AIFeature[]>([])
  const [sectionContent, setSectionContent] = useState({
    title: '', subtitle: '', badgeText: '', performanceTitle: '', learningTitle: '', academicTitle: '', academicDescription: '',
    performanceMetrics: [], learningPhases: [], academicPoints: []
  })

  useEffect(() => {
    setAIFeatures(getAIFeatures())
    setSectionContent(getAIFeaturesSectionContent())
  }, [])

  const enabledFeatures = aiFeatures.filter(f => f.enabled)

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'brain': return Brain
      case 'trending-up': return TrendingUp
      case 'zap': return Zap
      case 'target': return Target
      default: return Brain
    }
  }

  const performanceMetrics = [
    {
      icon: BarChart3,
      label: 'Solar Accuracy',
      value: '85%+',
      description: 'Next-day prediction accuracy'
    },
    {
      icon: Target,
      label: 'Load Accuracy',
      value: '90%+',
      description: 'Consumption forecasting'
    },
    {
      icon: DollarSign,
      label: 'Cost Savings',
      value: '12.7%',
      description: 'vs traditional systems'
    },
    {
      icon: Clock,
      label: 'Learning Period',
      value: '30-90d',
      description: 'Optimal performance'
    }
  ]

  const learningPhases = [
    {
      phase: 'Phase 1',
      title: 'Initial Training',
      days: 'Day 1-7',
      confidence: '30-50%',
      activities: [
        'Load historical data from InfluxDB',
        'Train solar predictor models',
        'Build load forecasting baseline',
        'Detect initial patterns'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Active Learning',
      days: 'Day 8-30',
      confidence: '50-80%',
      activities: [
        'Compare predictions vs outcomes',
        'Update model weights',
        'Improve pattern recognition',
        'Refine charging strategies'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Optimization',
      days: 'Day 31-90',
      confidence: '80-95%',
      activities: [
        'Fine-tune charging decisions',
        'Learn optimal timing patterns',
        'Maximize cost savings',
        'Seasonal adaptation'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Maintenance',
      days: 'Day 90+',
      confidence: '95%+',
      activities: [
        'Continuous incremental learning',
        'Performance monitoring',
        'Stable high performance',
        'Automatic adaptation'
      ]
    }
  ]

  return (
    <section id="ai-features" className="section-padding bg-dark">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Brain className="text-primary" size={20} />
            <span className="text-primary font-semibold">{sectionContent.badgeText}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.title }} />
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {sectionContent.subtitle}
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {enabledFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:border-primary/40"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.performanceTitle }} />
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sectionContent.performanceMetrics?.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:border-primary/40"
              >
                {index === 0 && <BarChart3 className="text-primary mx-auto mb-4" size={32} />}
                {index === 1 && <Target className="text-primary mx-auto mb-4" size={32} />}
                {index === 2 && <DollarSign className="text-primary mx-auto mb-4" size={32} />}
                {index === 3 && <Clock className="text-primary mx-auto mb-4" size={32} />}
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm font-semibold mb-1">{metric.label}</div>
                <div className="text-xs text-text-secondary">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Phases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.learningTitle }} />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionContent.learningPhases?.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:border-primary/40 relative"
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-dark">
                  {index + 1}
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-primary font-semibold mb-1">{phase.phase}</div>
                  <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{phase.days}</span>
                    <span className="text-primary font-semibold">{phase.confidence}</span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {phase.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Academic Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 card bg-primary/5 border-primary/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              <span dangerouslySetInnerHTML={{ __html: sectionContent.academicTitle }} />
            </h3>
            <p className="text-text-secondary mb-6 max-w-3xl mx-auto">
              {sectionContent.academicDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {sectionContent.academicPoints?.map((point, index) => (
                <div key={index}>
                  {index === 0 && <Battery className="text-primary mb-2" size={24} />}
                  {index === 1 && <DollarSign className="text-primary mb-2" size={24} />}
                  {index === 2 && <Target className="text-primary mb-2" size={24} />}
                  <div className="font-semibold mb-1">{point.title}</div>
                  <div className="text-sm text-text-secondary">
                    {point.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
