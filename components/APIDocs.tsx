'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getAPIDocsContent, APIDocsContent } from '@/lib/admin'

export default function APIDocs() {
  const [content, setContent] = useState<APIDocsContent | null>(null)

  useEffect(() => {
    setContent(getAPIDocsContent())
  }, [])

  if (!content) return null

  const enabledEndpoints = content.endpoints.filter(e => e.enabled)

  return (
    <section id="api" className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="body-large text-text-secondary max-w-4xl mx-auto">{content.subtitle}</p>
        </motion.div>

        <div className="space-y-6">
          {enabledEndpoints.map((endpoint, index) => (
            <motion.div
              key={endpoint.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className={`px-3 py-1 rounded text-sm font-bold ${
                  endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                  endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {endpoint.method}
                </span>
                <div className="flex-1">
                  <code className="text-primary font-mono">{endpoint.path}</code>
                  <p className="text-text-secondary text-sm mt-1">{endpoint.description}</p>
                </div>
              </div>
              
              {endpoint.response && (
                <div className="bg-dark p-4 rounded mt-3">
                  <div className="text-xs text-text-secondary mb-2">Response:</div>
                  <pre className="text-sm text-primary overflow-x-auto">
                    <code>{endpoint.response}</code>
                  </pre>
                </div>
              )}
              
              {endpoint.request && (
                <div className="bg-dark p-4 rounded mt-3">
                  <div className="text-xs text-text-secondary mb-2">Request Body:</div>
                  <pre className="text-sm text-primary overflow-x-auto">
                    <code>{endpoint.request}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
