'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Search, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFAQs, FAQ as FAQType } from '@/lib/admin'

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQType[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getFAQs().then(data => setFaqs(data.filter(f => f.enabled)))
  }, [])

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Support</span>
          </div>
          <h2 className="heading-2 mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="body-large text-text-secondary mb-8">
            Everything you need to know about SolarAutopilot
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-secondary border border-dark-border rounded-xl text-white placeholder-text-muted focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <div className="card-elevated overflow-hidden group">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between p-6 text-left gap-4 hover:bg-dark-tertiary/30 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="heading-4 mb-1 group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      {openIndex !== index && (
                        <p className="body-small text-text-muted line-clamp-1">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-primary" />
                      )}
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 body-base text-text-secondary leading-relaxed border-t border-dark-border pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="body-large text-text-muted">No questions found matching your search.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center card-elevated p-8"
        >
          <h3 className="heading-4 mb-2">Still have questions?</h3>
          <p className="body-base text-text-secondary mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a href="/#community" className="btn-primary inline-flex">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  )
}
