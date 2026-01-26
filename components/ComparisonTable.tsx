'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Zap } from 'lucide-react'

const features = [
  { name: 'Cross-Platform Support', traditional: false, homeAssistant: 'HA Only', solarAutopilot: 'Desktop Apps + HA Add-on' },
  { name: 'AI Optimization', traditional: false, homeAssistant: false, solarAutopilot: true },
  { name: 'Desktop Application', traditional: false, homeAssistant: false, solarAutopilot: true },
  { name: 'Price-based Charging', traditional: false, homeAssistant: 'manual', solarAutopilot: true },
  { name: 'Learning System', traditional: false, homeAssistant: false, solarAutopilot: true },
  { name: 'Cost Savings', traditional: '0%', homeAssistant: '~5%', solarAutopilot: 'Up to 12.7%' },
  { name: 'Setup Time', traditional: 'Hours', homeAssistant: 'Hours', solarAutopilot: '5 Minutes' },
  { name: 'Privacy First', traditional: false, homeAssistant: true, solarAutopilot: true },
]

const renderCell = (value: boolean | string) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={20} className="text-success mx-auto" />
    ) : (
      <X size={20} className="text-red-500 mx-auto" />
    )
  }
  
  if (value === 'manual') {
    return <span className="text-yellow-500 body-small font-medium">Manual Rules</span>
  }
  
  return <span className="body-small font-medium">{value}</span>
}

export default function ComparisonTable() {
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
          <h2 className="heading-2 mb-6">
            <span className="text-primary">SolarAutopilot</span> vs Traditional Systems
          </h2>
          <p className="body-large text-text-secondary max-w-4xl mx-auto">
            See how SolarAutopilot's multi-platform approach compares to traditional solar management and Home Assistant-only solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="card-elevated overflow-hidden min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-4 bg-dark-tertiary border-b border-dark-border">
              <div className="p-5 heading-4">Feature</div>
              <div className="p-5 heading-4 text-center">Traditional</div>
              <div className="p-5 heading-4 text-center">Home Assistant</div>
              <div className="p-5 heading-4 text-center bg-primary/10 text-primary flex items-center justify-center space-x-2">
                <Star size={18} className="fill-primary" />
                <span>SolarAutopilot</span>
              </div>
            </div>

            {/* Rows */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-4 border-b border-dark-border hover:bg-surface-hover transition-colors ${
                  index % 2 === 0 ? 'bg-dark-tertiary/30' : ''
                }`}
              >
                <div className="p-5 body-base font-medium">{feature.name}</div>
                <div className="p-5 text-center">{renderCell(feature.traditional)}</div>
                <div className="p-5 text-center">{renderCell(feature.homeAssistant)}</div>
                <div className="p-5 text-center bg-primary/5 font-medium">
                  {renderCell(feature.solarAutopilot)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="card-elevated bg-primary/5 border-primary/30 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 border border-primary/30 rounded-2xl p-3 flex-shrink-0">
                <Zap className="text-primary" size={24} />
              </div>
              <div className="text-left">
                <h3 className="heading-4 mb-3 text-primary">Why Choose SolarAutopilot?</h3>
                <p className="body-base text-text-secondary">
                  The only cross-platform solution that combines advanced AI optimization with zero-configuration setup. 
                  Run on any platform - start saving money in minutes, not hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}