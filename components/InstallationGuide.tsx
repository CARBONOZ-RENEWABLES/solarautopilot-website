'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Terminal, Download, Settings, Play, Monitor, Apple, Smartphone, HardDrive, Container } from 'lucide-react'

const installSteps = {
  desktop: {
    title: 'Desktop Applications',
    icon: Monitor,
    platforms: [
      {
        name: 'Windows',
        icon: Monitor,
        steps: [
          'Visit GitHub Actions → Universal Builds workflow',
          'Download "windows-installers" artifact',
          'Extract ZIP and run the .exe installer',
          'If SmartScreen appears, click "More info" → "Run anyway"',
          'Launch from Start Menu or Desktop shortcut'
        ],
        notes: ['Requires Windows 10 or later', 'Automatic Docker integration if Docker is installed']
      },
      {
        name: 'macOS',
        icon: Apple,
        steps: [
          'Visit GitHub Actions → Universal Builds workflow',
          'Download "macos-universal" artifact',
          'Extract ZIP and open the .dmg file',
          'Drag app to Applications folder',
          'Right-click app → "Open" (first time only for security)'
        ],
        notes: ['Requires macOS 10.13 or later', 'Universal binary (Intel + Apple Silicon)']
      },
      {
        name: 'Linux',
        icon: Smartphone,
        steps: [
          'Visit GitHub Actions → Universal Builds workflow',
          'Download "linux-x64" or "linux-arm64-rpi" for Raspberry Pi',
          'Extract ZIP file',
          'Make AppImage executable: chmod +x *.AppImage',
          'Run the AppImage or install .deb package'
        ],
        notes: ['Ubuntu 18.04+, Debian 10+', 'ARM64 version available for Raspberry Pi']
      }
    ]
  },
  homeassistant: {
    title: 'Home Assistant Add-on',
    icon: HardDrive,
    steps: [
      'Open Home Assistant → Settings → Add-ons',
      'Click "Add-on Store" → Three dots menu → "Repositories"',
      'Add repository: https://github.com/CARBONOZ-RENEWABLES/solarautopilot',
      'Find "CARBONOZ SolarAutopilot" in the store',
      'Click "Install" and wait for completion',
      'Configure settings and click "Start"'
    ],
    notes: [
      'Requires Home Assistant OS or Supervised',
      'Integrates with existing HA automations',
      'Access via sidebar after installation'
    ]
  },
  docker: {
    title: 'Docker Container',
    icon: Container,
    steps: [
      'Clone repository: git clone https://github.com/CARBONOZ-RENEWABLES/solarautopilot.git',
      'Navigate to directory: cd solarautopilot',
      'Copy environment file: cp .env.example .env',
      'Edit .env with your configuration',
      'Start services: docker-compose up -d',
      'Access at http://localhost:6789'
    ],
    notes: [
      'Requires Docker 20.10+ and Docker Compose',
      'Includes InfluxDB and Grafana containers',
      'Persistent data storage configured'
    ]
  }
}

export default function InstallationGuide() {
  const [activeTab, setActiveTab] = useState('desktop')

  return (
    <section id="install-guide" className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Installation <span className="text-primary">Guide</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Step-by-step instructions for installing SolarAutopilot on your preferred platform.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(installSteps).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                activeTab === key
                  ? 'bg-primary text-dark'
                  : 'bg-dark border border-gray-700 text-text-secondary hover:border-primary'
              }`}
            >
              <section.icon size={20} />
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        {/* Installation Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {(installSteps[activeTab as keyof typeof installSteps] as any).platforms ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(installSteps[activeTab as keyof typeof installSteps] as any).platforms.map((platform: any, platformIndex: number) => (
                <div key={platformIndex} className="card">
                  <div className="flex items-center space-x-3 mb-6">
                    <platform.icon className="text-primary" size={24} />
                    <h4 className="text-xl font-semibold">{platform.name}</h4>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {platform.steps.map((step: string, stepIndex: number) => (
                      <div key={stepIndex} className="flex items-start space-x-3">
                        <div className="bg-primary/20 rounded-full p-1 mt-1 flex-shrink-0">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {platform.notes.map((note: string, noteIndex: number) => (
                      <div key={noteIndex} className="flex items-start space-x-2">
                        <CheckCircle className="text-accent-blue flex-shrink-0 mt-0.5" size={14} />
                        <p className="text-xs text-text-secondary">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card max-w-4xl mx-auto">
              <div className="space-y-6">
                {(installSteps[activeTab as keyof typeof installSteps] as any).steps.map((step: string, stepIndex: number) => (
                  <div key={stepIndex} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">{stepIndex + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-text-secondary leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 space-y-2">
                {(installSteps[activeTab as keyof typeof installSteps] as any).notes.map((note: string, noteIndex: number) => (
                  <div key={noteIndex} className="flex items-start space-x-2">
                    <CheckCircle className="text-accent-blue flex-shrink-0 mt-0.5" size={14} />
                    <p className="text-sm text-text-secondary">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <a
            href="https://github.com/CARBONOZ-RENEWABLES/solarautopilot/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:scale-105 transition-transform duration-300 text-center"
          >
            <Download className="text-primary mx-auto mb-4" size={32} />
            <h4 className="text-lg font-semibold mb-2">GitHub Actions</h4>
            <p className="text-text-secondary text-sm mb-4">Download pre-built installers</p>
            <div className="flex items-center justify-center space-x-2 text-primary">
              <span className="text-sm">Visit Downloads</span>
            </div>
          </a>
          
          <a
            href="https://github.com/CARBONOZ-RENEWABLES/solarautopilot"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:scale-105 transition-transform duration-300 text-center"
          >
            <Container className="text-primary mx-auto mb-4" size={32} />
            <h4 className="text-lg font-semibold mb-2">Source Code</h4>
            <p className="text-text-secondary text-sm mb-4">View repository and documentation</p>
            <div className="flex items-center justify-center space-x-2 text-primary">
              <span className="text-sm">View on GitHub</span>
            </div>
          </a>
          
          <a
            href="https://login.carbonoz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card hover:scale-105 transition-transform duration-300 text-center"
          >
            <CheckCircle className="text-primary mx-auto mb-4" size={32} />
            <h4 className="text-lg font-semibold mb-2">CARBONOZ Account</h4>
            <p className="text-text-secondary text-sm mb-4">Create account for CO2 tracking</p>
            <div className="flex items-center justify-center space-x-2 text-primary">
              <span className="text-sm">Sign Up</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}