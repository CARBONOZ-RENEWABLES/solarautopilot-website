'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Monitor, Smartphone, HardDrive, Apple, Copy, Check, ExternalLink, Package } from 'lucide-react'
import { getDownloadSectionContent } from '@/lib/admin'

export default function DownloadSection() {
  const [downloads, setDownloads] = useState<any[]>([])
  const [sectionContent, setSectionContent] = useState({ title: '', description: '' })
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDownloads()
    getDownloadSectionContent().then(setSectionContent)
  }, [])

  const fetchDownloads = async () => {
    try {
      const res = await fetch('/api/downloads')
      const data = await res.json()
      setDownloads(data.filter((d: any) => d.enabled))
    } catch (error) {
      console.error('Failed to fetch downloads:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase()
    if (p.includes('windows')) return Monitor
    if (p.includes('mac') || p.includes('apple')) return Apple
    if (p.includes('linux')) return Smartphone
    if (p.includes('home') || p.includes('assistant')) return HardDrive
    if (p.includes('docker')) return Package
    return Download
  }

  const getPlatformColor = (platform: string) => {
    const p = platform.toLowerCase()
    if (p.includes('windows')) return 'from-blue-500 to-blue-600'
    if (p.includes('mac') || p.includes('apple')) return 'from-gray-500 to-gray-600'
    if (p.includes('linux')) return 'from-orange-500 to-orange-600'
    if (p.includes('home') || p.includes('assistant')) return 'from-green-500 to-green-600'
    if (p.includes('docker')) return 'from-cyan-500 to-cyan-600'
    return 'from-primary to-primary-dark'
  }

  const handleDownload = async (download: any) => {
    // Track download count
    await fetch('/api/downloads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: download.id, downloads: download.downloads + 1 })
    })
    
    // Trigger download
    window.open(download.fileUrl, '_blank')
  }

  if (loading) {
    return (
      <section id="download" className="section-padding bg-dark">
        <div className="container-custom text-center">
          <div className="text-text-secondary">Loading downloads...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="download" className="section-padding bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary to-dark opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-primary font-medium text-sm">Free & Open Source</span>
          </div>
          <h2 className="heading-2 mb-6">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.title || 'Download <span class="text-primary">SolarAutopilot</span>' }} />
          </h2>
          <p className="body-large text-text-secondary max-w-4xl mx-auto px-4">
            {sectionContent.description || 'Choose your platform and start optimizing your solar system with AI-powered automation.'}
          </p>
        </motion.div>

        {downloads.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Downloads Coming Soon</h3>
            <p className="text-text-secondary max-w-md mx-auto">We're preparing installer files for all platforms. Check back soon to download SolarAutopilot!</p>
          </motion.div>
        ) : (
          <>
            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {downloads.map((download, index) => {
                const Icon = getIcon(download.platform)
                const gradientColor = getPlatformColor(download.platform)
                return (
                  <motion.div
                    key={download.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="card-elevated hover:border-primary/50 transition-all duration-300 h-full">
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-r ${gradientColor} p-6 rounded-t-xl -m-6 mb-6`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                              <Icon size={24} className="text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">{download.platform}</h3>
                              <p className="text-white/80 text-sm">v{download.version}</p>
                            </div>
                          </div>
                          <div className="text-white/80 text-sm">{download.size}</div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Downloads</span>
                          <span className="text-primary font-semibold">{download.downloads || 0}</span>
                        </div>
                        
                        {download.checksum && (
                          <div className="text-xs text-text-secondary font-mono bg-dark-secondary p-2 rounded border border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="truncate mr-2">{download.checksum.substring(0, 16)}...</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(download.checksum)
                                  setCopiedIndex(index)
                                  setTimeout(() => setCopiedIndex(null), 2000)
                                }}
                                className="text-primary hover:text-primary-dark"
                              >
                                {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <button
                          onClick={() => handleDownload(download)}
                          className="btn-primary w-full text-sm py-3 space-x-2 group-hover:scale-105 transition-transform"
                        >
                          <Download size={16} />
                          <span>Download Now</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">{downloads.length}</div>
                <div className="body-small text-text-secondary">Platforms</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">Free</div>
                <div className="body-small text-text-secondary">Forever</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">12.7%</div>
                <div className="body-small text-text-secondary">Cost Savings</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">AI</div>
                <div className="body-small text-text-secondary">Powered</div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}