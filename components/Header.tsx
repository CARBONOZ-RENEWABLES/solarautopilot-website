'use client'

import { useState } from 'react'
import { Menu, X, Github, Download } from 'lucide-react'
import { getHeaderContent } from '../lib/admin'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerConfig = getHeaderContent()

  return (
    <header className="fixed top-0 w-full bg-dark/95 backdrop-blur-md border-b border-dark-border z-50 shadow-card">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {headerConfig.logoImage ? (
              <img 
                src={headerConfig.logoImage} 
                alt="SolarAutopilot Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-dark font-bold text-lg">{headerConfig.logo}</span>
              </div>
            )}
            <span className="text-xl font-semibold text-text-primary">SolarAutopilot</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {headerConfig.navigation.map((nav) => (
              <a 
                key={nav.label} 
                href={nav.href} 
                className="btn-ghost px-4 py-2 text-sm font-medium"
              >
                {nav.label}
              </a>
            ))}
            <a 
              href="https://github.com/CARBONOZ-RENEWABLES/solarautopilot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-ghost px-4 py-2 text-sm font-medium flex items-center space-x-2"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#download" className="btn-primary text-sm px-5 py-2.5 space-x-2">
              <Download size={16} />
              <span>Download</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors focus-ring"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border bg-dark-secondary/50 backdrop-blur-sm rounded-b-xl mt-1">
            <nav className="flex flex-col space-y-1">
              {headerConfig.navigation.map((nav) => (
                <a 
                  key={nav.label} 
                  href={nav.href} 
                  className="btn-ghost justify-start px-4 py-3 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.label}
                </a>
              ))}
              <a 
                href="https://github.com/CARBONOZ-RENEWABLES/solarautopilot" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-ghost justify-start px-4 py-3 text-sm font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <div className="px-4 pt-2">
                <a href="#download" className="btn-primary w-full text-sm py-3 space-x-2">
                  <Download size={16} />
                  <span>Download</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}