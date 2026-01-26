'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Monitor, Smartphone, HardDrive, Container, Apple, Copy, Check } from 'lucide-react'
import { DownloadItem, getDownloads, getDownloadSectionContent } from '@/lib/admin'

export default function DownloadSection() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [sectionContent, setSectionContent] = useState({ title: '', description: '' })
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    setDownloads(getDownloads())
    setSectionContent(getDownloadSectionContent())
  }, [])

  const enabledDownloads = downloads.filter(d => d.enabled)

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'windows':
      case 'windows x64':
      case 'windows x86':
        return Monitor
      case 'macos':
      case 'macos universal':
        return Apple
      case 'linux':
      case 'linux deb':
      case 'linux appimage':
        return Smartphone
      case 'home assistant':
      case 'home assistant add-on':
        return HardDrive
      default:
        return Download
    }
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <section id="download" className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-6">
            <span dangerouslySetInnerHTML={{ __html: sectionContent.title }} />
          </h2>
          <p className="body-large text-text-secondary max-w-4xl mx-auto px-4">
            {sectionContent.description}
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid-auto-fit mb-16">
          {enabledDownloads.map((download, index) => {
            const Icon = getIcon(download.platform)
            return (
              <motion.div
                key={download.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-interactive"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                      <Icon size={28} className="text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="heading-4 mb-4">{download.platform}</h3>
                  
                  <div className="space-y-2 mb-6 body-small text-text-secondary">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="text-primary font-medium">{download.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="text-text-primary font-medium">{download.size}</span>
                    </div>
                  </div>
                  
                  <a
                    href={download.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-sm py-3 space-x-2"
                  >
                    <Download size={16} />
                    <span>Download {download.platform}</span>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Installation Commands */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="card-elevated border-primary/20 mb-16"
        >
          <h3 className="heading-3 mb-8 text-center">Quick Installation</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="body-base text-primary font-medium">Home Assistant Add-on</div>
              <div className="code-block">
                <code className="break-all">https://github.com/CARBONOZ-RENEWABLES/solarautopilot-addon</code>
              </div>
              <button 
                onClick={() => copyToClipboard('https://github.com/CARBONOZ-RENEWABLES/solarautopilot-addon', 0)}
                className="btn-ghost text-xs space-x-2"
              >
                {copiedIndex === 0 ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedIndex === 0 ? 'Copied!' : 'Copy to clipboard'}</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="body-base text-primary font-medium">Desktop App</div>
              <div className="code-block">
                <code className="break-all">Download → Extract → Install</code>
              </div>
              <button 
                onClick={() => copyToClipboard('Download → Extract → Install', 1)}
                className="btn-ghost text-xs space-x-2"
              >
                {copiedIndex === 1 ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedIndex === 1 ? 'Copied!' : 'Copy to clipboard'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{enabledDownloads.length}+</div>
            <div className="body-small text-text-secondary">Platforms</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">Free</div>
            <div className="body-small text-text-secondary">Download</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">12.7%</div>
            <div className="body-small text-text-secondary">Cost Savings</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">AI</div>
            <div className="body-small text-text-secondary">Powered</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}