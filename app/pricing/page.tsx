'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPricingTiers, PricingTier } from '@/lib/admin'

export default function PricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([])

  useEffect(() => {
    getPricingTiers().then(data => setTiers(data.filter((t: PricingTier) => t.enabled)))
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dark pt-20">
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="heading-1 mb-4">
              Simple, <span className="text-primary">Transparent</span> Pricing
            </h1>
            <p className="body-large text-text-secondary max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include core features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card-elevated p-8 ${
                  tier.highlighted ? 'ring-2 ring-primary' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="heading-3 mb-2">{tier.name}</h3>
                <p className="text-text-secondary text-sm mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-text-secondary">{tier.period}</span>}
                </div>

                <a
                  href={tier.buttonLink}
                  className={`btn-${tier.highlighted ? 'primary' : 'secondary'} w-full mb-8`}
                >
                  {tier.buttonText}
                </a>

                <div className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
