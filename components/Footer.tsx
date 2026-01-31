'use client'

import { Github, MessageCircle, Twitter, Youtube, Mail, ExternalLink } from 'lucide-react'
import { getFooterContent } from '../lib/admin'

const iconMap = {
  Github,
  MessageCircle,
  Twitter,
  Youtube,
  Mail,
  ExternalLink
}

export default function Footer() {
  const footerConfig = getFooterContent()

  return (
    <footer className="bg-dark-secondary border-t border-gray-800">
      <div className="container-custom py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                {footerConfig.logoImage ? (
                  <img src={footerConfig.logoImage} alt={footerConfig.companyName} className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <span className="text-dark font-bold text-lg">{footerConfig.logo}</span>
                )}
              </div>
              <span className="text-xl font-bold">{footerConfig.companyName}</span>
            </a>
            <p className="text-text-secondary mb-6 leading-relaxed max-w-md">
              {footerConfig.description}
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {footerConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap] || ExternalLink
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer sections */}
          {footerConfig.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-primary">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center"
                    >
                      {link.name}
                      {link.external && <ExternalLink size={12} className="ml-1" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-text-secondary text-sm">
              {footerConfig.copyright}
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              {footerConfig.showStatus && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-text-secondary">{footerConfig.statusText}</span>
                </div>
              )}
              
              <div className="text-text-secondary">
                {footerConfig.madeByText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}