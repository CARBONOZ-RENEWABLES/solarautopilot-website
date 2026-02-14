'use client'
import { motion } from 'framer-motion'
import { Play, Clock, Star, ExternalLink } from 'lucide-react'
import { getVideoTutorials, VideoTutorial } from '@/lib/admin'
import { useState, useEffect } from 'react'

export default function VideoTutorials() {
  const [tutorials, setTutorials] = useState<VideoTutorial[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getVideoTutorials().then(data => {
      const enabled = data.filter(t => t.enabled)
      setTutorials(enabled)
      setSelectedVideo(enabled[0]?.videoId || null)
      setIsLoading(false)
    })
  }, [])

  if (isLoading || tutorials.length === 0) return null

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">
            Video <span className="text-primary">Tutorials</span>
          </h2>
          <p className="body-large text-text-secondary">
            Learn how to get the most out of SolarAutopilot
          </p>
        </motion.div>

        {/* Featured Video */}
        {selectedVideo && (
          <motion.div
            key={selectedVideo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="card-elevated overflow-hidden">
              <div className="aspect-video bg-dark-tertiary">
                <iframe
                  key={selectedVideo}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo}?start=${tutorials.find(t => t.videoId === selectedVideo)?.startTime || 0}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Grid - Only show if there are 2 or more videos */}
        {tutorials.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => {
                    setSelectedVideo(tutorial.videoId)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`card-interactive group h-full text-left w-full transition-all cursor-pointer ${
                    selectedVideo === tutorial.videoId ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="relative aspect-video bg-dark-tertiary rounded-lg overflow-hidden mb-4">
                    <img
                      src={`https://img.youtube.com/vi/${tutorial.videoId}/hqdefault.jpg`}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${tutorial.videoId}/mqdefault.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-8 h-8 text-dark fill-dark ml-1" />
                      </div>
                    </div>
                    {selectedVideo === tutorial.videoId && (
                      <div className="absolute top-2 right-2 bg-primary text-dark text-xs font-bold px-2 py-1 rounded">
                        Playing
                      </div>
                    )}
                  </div>
                  
                  <h3 className="heading-4 mb-2 line-clamp-2">{tutorial.title}</h3>
                  <p className="body-small text-text-secondary mb-4 line-clamp-2">{tutorial.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-text-secondary caption">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span>{tutorial.rating}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
