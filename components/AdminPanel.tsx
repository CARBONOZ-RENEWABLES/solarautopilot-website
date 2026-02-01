'use client'

import { useState, useEffect } from 'react'
import { Save, X, Edit } from 'lucide-react'
import { HeroContent, getHeroContent, saveHeroContent } from '@/lib/admin'

interface AdminPanelProps {
  onContentChange: (content: HeroContent) => void
}

export default function AdminPanel({ onContentChange }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    primaryCTA: '',
    secondaryCTA: ''
  })

  useEffect(() => {
    getHeroContent().then(setContent)
  }, [])

  const handleSave = () => {
    saveHeroContent(content)
    onContentChange(content)
    setIsOpen(false)
  }

  const handleChange = (field: keyof HeroContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-primary text-dark p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        title="Edit Hero Content"
      >
        <Edit size={20} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Edit Hero Content</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-secondary hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Title
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="Enter hero title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Subtitle
            </label>
            <textarea
              value={content.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              rows={4}
              className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
              placeholder="Enter hero subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Primary CTA Button
            </label>
            <input
              type="text"
              value={content.primaryCTA}
              onChange={(e) => handleChange('primaryCTA', e.target.value)}
              className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="Enter primary button text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Secondary CTA Button
            </label>
            <input
              type="text"
              value={content.secondaryCTA}
              onChange={(e) => handleChange('secondaryCTA', e.target.value)}
              className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
              placeholder="Enter secondary button text"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 border border-gray-600 text-text-secondary rounded-lg hover:bg-dark-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}