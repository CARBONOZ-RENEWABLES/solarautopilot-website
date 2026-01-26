'use client'

import { motion } from 'framer-motion'
import { Github, MessageCircle, BookOpen, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCommunityContent, CommunityContent } from '@/lib/admin'

const iconMap: Record<string, any> = {
  github: Github,
  'message-circle': MessageCircle,
  'book-open': BookOpen,
  mail: Mail
}

export default function Community() {
  const [content, setContent] = useState<CommunityContent | null>(null)

  useEffect(() => {
    setContent(getCommunityContent())
  }, [])

  if (!content) return null

  const enabledLinks = content.links.filter(l => l.enabled)

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">{content.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {enabledLinks.map((item, i) => {
            const Icon = iconMap[item.icon] || Github
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className="card">
                <Icon className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.items.map((text, j) => (
                    <li key={j} className="text-sm text-text-secondary flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: content.ctaTitle }} />
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">{content.ctaSubtitle}</p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="btn-primary">Star on GitHub</a>
            <a href="#" className="btn-secondary">Join Discord</a>
          </div>
        </div>
      </div>
    </section>
  )
}
