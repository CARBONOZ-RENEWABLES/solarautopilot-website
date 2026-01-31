'use client'

import { motion } from 'framer-motion'
import { Check, Heart, Github, Download } from 'lucide-react'

const features = [
  'AI-powered optimization',
  'Unlimited installations',
  'All inverter types supported',
  'Real-time monitoring',
  'Historical analytics',
  'Community support',
  'Regular updates',
  'Commercial use allowed',
  'No data collection',
  'Full source code access'
]

export default function PricingSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Free and Open Source. <span className="text-primary">Forever.</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Built by the community, for the community. No hidden costs, no subscriptions, no vendor lock-in.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-secondary to-dark border-2 border-primary/20 rounded-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            
            <div className="relative z-10">
              {/* Price */}
              <div className="mb-8">
                <div className="text-6xl md:text-7xl font-bold text-primary mb-2">$0</div>
                <div className="text-xl text-text-secondary">Forever and always</div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  No hidden costs
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  No subscriptions
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  No data collection
                </span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  MIT License
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <Check size={16} className="text-success flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.a
                  href="/#download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary text-base px-6 py-3 inline-flex items-center space-x-2"
                >
                  <Download size={18} />
                  <span>Start Using Now</span>
                </motion.a>
                
                <motion.a
                  href="https://github.com/solarautopilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary text-base px-6 py-3 inline-flex items-center space-x-2"
                >
                  <Github size={18} />
                  <span>View Source Code</span>
                </motion.a>
              </div>

              {/* Support note */}
              <div className="bg-dark/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm font-medium">Support Development</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Love SolarAutopilot? Consider supporting development through GitHub Sponsors. 
                  100% optional, 100% appreciated.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center"
        >
          <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-primary mb-2">MIT License</div>
            <p className="text-text-secondary text-sm">
              Use commercially, modify freely, distribute without restrictions
            </p>
          </div>
          
          <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-success mb-2">Open Source</div>
            <p className="text-text-secondary text-sm">
              Full transparency, community-driven development, no vendor lock-in
            </p>
          </div>
          
          <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-accent-blue mb-2">Privacy First</div>
            <p className="text-text-secondary text-sm">
              Runs locally, no telemetry, your data stays on your hardware
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}