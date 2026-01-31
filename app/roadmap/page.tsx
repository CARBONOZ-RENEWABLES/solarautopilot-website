'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Clock, Rocket, Calendar } from 'lucide-react'

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: string
  priority: string
  category: string
  targetDate?: string
}

export default function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/roadmap')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setRoadmaps(data)
        setLoading(false)
      })
      .catch(() => {
        setRoadmaps([])
        setLoading(false)
      })
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-400" size={20} />
      case 'in-progress': return <Clock className="text-blue-400" size={20} />
      default: return <Rocket className="text-primary" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-400/30 bg-green-400/5'
      case 'in-progress': return 'border-blue-400/30 bg-blue-400/5'
      default: return 'border-primary/30 bg-primary/5'
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-400/10 text-red-400',
      medium: 'bg-yellow-400/10 text-yellow-400',
      low: 'bg-gray-400/10 text-gray-400',
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const groupedRoadmaps = {
    planned: roadmaps.filter(r => r.status === 'planned'),
    'in-progress': roadmaps.filter(r => r.status === 'in-progress'),
    completed: roadmaps.filter(r => r.status === 'completed'),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark">
      <Header />
      
      <section className="section-padding pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-1 mb-6">
              Product <span className="text-primary">Roadmap</span>
            </h1>
            <p className="body-large text-text-secondary max-w-3xl mx-auto">
              See what we're working on and what's coming next
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(groupedRoadmaps).map(([status, items]) => (
              <div key={status}>
                <div className="flex items-center gap-3 mb-6">
                  {getStatusIcon(status)}
                  <h2 className="heading-3 capitalize">{status.replace('-', ' ')}</h2>
                  <span className="px-3 py-1 bg-dark-secondary rounded-full text-sm text-text-secondary">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`card-elevated border ${getStatusColor(item.status)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="heading-4 flex-1">{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>

                      <p className="body-base text-text-secondary mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-dark-secondary rounded-full text-primary">
                          {item.category}
                        </span>
                        {item.targetDate && (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <Calendar size={14} />
                            <span>{new Date(item.targetDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {roadmaps.length === 0 && (
            <div className="text-center py-20">
              <Rocket size={48} className="mx-auto text-text-secondary mb-4" />
              <p className="text-text-secondary body-large">Roadmap coming soon</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
