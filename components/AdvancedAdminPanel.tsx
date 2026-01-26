'use client'
import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Edit, Eye, Upload, Settings, Users, FileText, Download } from 'lucide-react'
import FileUpload from './ui/FileUpload'
import RichTextEditor from './ui/RichTextEditor'

interface ContentItem {
  id?: string
  title?: string
  description?: string
  content?: string
  [key: string]: any
}

export default function AdvancedAdminPanel() {
  const [activeTab, setActiveTab] = useState('pages')
  const [content, setContent] = useState<ContentItem[]>([])
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  const tabs = [
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'features', label: 'Features', icon: Settings },
    { id: 'installation', label: 'Installation', icon: Download },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'media', label: 'Media', icon: Upload },
    { id: 'users', label: 'Users', icon: Users },
  ]

  useEffect(() => {
    fetchContent(activeTab)
  }, [activeTab])

  const fetchContent = async (collection: string) => {
    try {
      const res = await fetch(`/api/content?collection=${collection}`)
      const data = await res.json()
      setContent(Array.isArray(data) ? data : [data].filter(Boolean))
    } catch (error) {
      console.error('Failed to fetch content:', error)
      setContent([])
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      await fetch('/api/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: activeTab, data: content })
      })
      alert('Content saved successfully!')
    } catch (error) {
      alert('Failed to save content')
    }
    setSaving(false)
  }

  const addItem = () => {
    const newItem: ContentItem = { 
      id: Date.now().toString(), 
      title: 'New Item',
      description: '',
      content: '',
      enabled: true
    }
    
    if (activeTab === 'downloads') {
      newItem.platform = 'windows'
      newItem.version = '1.0.0'
      newItem.downloadUrl = ''
    }
    
    setContent([...content, newItem])
    setEditingItem(newItem)
  }

  const updateItem = (id: string, field: string, value: any) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
    if (editingItem?.id === id) {
      setEditingItem({ ...editingItem, [field]: value })
    }
  }

  const deleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setContent(content.filter(item => item.id !== id))
      if (editingItem?.id === id) {
        setEditingItem(null)
      }
    }
  }

  const duplicateItem = (item: ContentItem) => {
    const duplicate = { ...item, id: Date.now().toString(), title: `${item.title} (Copy)` }
    setContent([...content, duplicate])
  }

  const renderEditForm = () => {
    if (!editingItem) return null

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Edit {activeTab.slice(0, -1)}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              <Eye className="h-4 w-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={() => setEditingItem(null)}
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        {showPreview ? (
          <div className="prose max-w-none">
            <h2>{editingItem.title}</h2>
            <p>{editingItem.description}</p>
            <div dangerouslySetInnerHTML={{ __html: editingItem.content || '' }} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => updateItem(editingItem.id!, 'title', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {activeTab === 'pages' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug || ''}
                    onChange={(e) => updateItem(editingItem.id!, 'slug', e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={editingItem.description || ''}
                onChange={(e) => updateItem(editingItem.id!, 'description', e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Download-specific fields */}
            {activeTab === 'downloads' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <select
                    value={editingItem.platform || ''}
                    onChange={(e) => updateItem(editingItem.id!, 'platform', e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="windows">Windows</option>
                    <option value="macos">macOS</option>
                    <option value="linux">Linux</option>
                    <option value="docker">Docker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Version</label>
                  <input
                    type="text"
                    value={editingItem.version || ''}
                    onChange={(e) => updateItem(editingItem.id!, 'version', e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">File Size</label>
                  <input
                    type="text"
                    value={editingItem.size || ''}
                    onChange={(e) => updateItem(editingItem.id!, 'size', e.target.value)}
                    placeholder="e.g., 45.2 MB"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div>
                <label className="block text-sm font-medium mb-2">Download URL</label>
                <input
                  type="url"
                  value={editingItem.downloadUrl || ''}
                  onChange={(e) => updateItem(editingItem.id!, 'downloadUrl', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Rich Text Content */}
            {(activeTab === 'pages' || activeTab === 'features') && (
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <RichTextEditor
                  value={editingItem.content || ''}
                  onChange={(value) => updateItem(editingItem.id!, 'content', value)}
                  placeholder="Enter content here..."
                />
              </div>
            )}

            {/* File Upload */}
            {activeTab === 'media' && (
              <div>
                <label className="block text-sm font-medium mb-2">Upload Files</label>
                <FileUpload
                  onUpload={(files) => {
                    files.forEach(file => {
                      updateItem(editingItem.id!, 'url', file.url)
                      updateItem(editingItem.id!, 'filename', file.name)
                    })
                  }}
                  type="image"
                  multiple
                />
              </div>
            )}

            {/* Enable/Disable Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enabled"
                checked={editingItem.enabled !== false}
                onChange={(e) => updateItem(editingItem.id!, 'enabled', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="enabled" className="text-sm font-medium">
                Enabled
              </label>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">SolarAutopilot CMS</h1>
            <button 
              onClick={saveContent}
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left ${
                        activeTab === tab.id 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {editingItem ? (
              renderEditForm()
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Manage {tabs.find(t => t.id === activeTab)?.label}</h2>
                    <button 
                      onClick={addItem}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {content.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No items found. Click "Add New" to create one.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {content.map((item, index) => (
                        <div key={item.id || index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{item.title || 'Untitled'}</h3>
                              {item.description && (
                                <p className="text-gray-600 mt-1">{item.description}</p>
                              )}
                              {activeTab === 'downloads' && (
                                <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                                  <span>Platform: {item.platform}</span>
                                  <span>Version: {item.version}</span>
                                  {item.size && <span>Size: {item.size}</span>}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => setEditingItem(item)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => duplicateItem(item)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Duplicate"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteItem(item.id || index.toString())}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}