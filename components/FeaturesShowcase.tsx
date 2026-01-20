'use client'

import { motion } from 'framer-motion'
import { Monitor, BarChart3, Activity, Smartphone } from 'lucide-react'

const features = [
  {
    title: 'Real-Time Dashboard',
    description: 'Monitor your solar system with live data visualization and comprehensive analytics for all your energy metrics.',
    image: '/images/dashboard.png',
    icon: Monitor,
    stats: ['Live monitoring', 'Data visualization', 'Energy analytics']
  },
  {
    title: 'AI Optimization Engine',
    description: 'Advanced AI learns from your patterns and optimizes battery charging for maximum savings and efficiency.',
    image: '/images/ai.png',
    icon: BarChart3,
    stats: ['Smart learning', 'Auto optimization', '12.7% cost savings']
  },
  {
    title: 'Analytics',
    description: 'Comprehensive energy analytics with historical data spanning 30 days, 12 months, and 10 years. Beautiful interactive charts show your solar production, consumption patterns, and optimization performance.',
    image: '/images/analytics.png',
    icon: Activity,
    stats: ['30 days data', '12 months history', '10 years analytics']
  },
  {
    title: 'Multi-Platform Support',
    description: 'Available as native desktop apps for Windows, macOS, and Linux, plus a dedicated Home Assistant add-on and Docker container. Choose what works best for your setup.',
    image: '/images/homeassistant.png',
    icon: Smartphone,
    stats: ['Desktop Apps', 'Home Assistant', 'Docker Ready']
  }
]

export default function FeaturesShowcase() {
  return (
    <section id="features" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience <span className="text-primary">SolarAutopilot</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See how our advanced features transform solar energy management
          </p>
        </motion.div>

        <div className="space-y-12">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <feature.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                </div>
                
                <p className="text-lg text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {feature.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      whileHover={{ scale: 1.05 }}
                      className="bg-dark/50 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="text-primary font-semibold text-sm">
                        {stat}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-80 lg:h-96 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  
                  {/* Overlay with feature highlight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="bg-dark/90 rounded-xl p-6 border border-primary/50">
                      <feature.icon className="text-primary mx-auto mb-2" size={40} />
                      <div className="text-center text-primary font-semibold">
                        View {feature.title}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-blue/20 rounded-full blur-xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}