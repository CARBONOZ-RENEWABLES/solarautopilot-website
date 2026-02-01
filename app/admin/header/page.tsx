'use client'
import { useState, useEffect } from 'react'
import { Save, Upload, X } from 'lucide-react'
import { getHeaderContent, saveHeaderContent, HeaderContent } from '@/lib/admin'

export default function HeaderAdmin() {
  const [content, setContent] = useState<HeaderContent>({
    logo: 'SolarAutopilot',
    navigation: []
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getHeaderContent().then(setContent)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await saveHeaderContent(content)
    alert('Header saved!')
    setSaving(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      setContent({ ...content, logoImage: data.url })
    } catch (error) {
      alert('Upload failed')
    }
    setUploading(false)
  }

  const addNavItem = () => {
    setContent({ ...content, navigation: [...content.navigation, { label: 'New Link', href: '#' }] })
  }

  const updateNavItem = (index: number, field: 'label' | 'href', value: string) => {
    const nav = [...content.navigation]
    nav[index] = { ...nav[index], [field]: value }
    setContent({ ...content, navigation: nav })
  }

  const removeNavItem = (index: number) => {
    setContent({ ...content, navigation: content.navigation.filter((_, i) => i !== index) })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Header Settings</h1>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            <Save size={18} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Logo Text</label>
            <input type="text" value={content.logo} onChange={(e) => setContent({ ...content, logo: e.target.value })} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo Image</label>
            <div className="flex items-center gap-4">
              {content.logoImage && <img src={content.logoImage} alt="Logo" className="h-12" />}
              <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded cursor-pointer hover:bg-gray-200">
                <Upload size={18} />
                {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
              {content.logoImage && <button onClick={() => setContent({ ...content, logoImage: undefined })} className="text-red-600">Remove</button>}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium">Navigation</label>
              <button onClick={addNavItem} className="text-blue-600 text-sm">+ Add</button>
            </div>
            <div className="space-y-3">
              {content.navigation.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <input type="text" value={item.label} onChange={(e) => updateNavItem(i, 'label', e.target.value)} placeholder="Label" className="flex-1 border rounded px-3 py-2" />
                  <input type="text" value={item.href} onChange={(e) => updateNavItem(i, 'href', e.target.value)} placeholder="URL" className="flex-1 border rounded px-3 py-2" />
                  <button onClick={() => removeNavItem(i)} className="text-red-600"><X size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
