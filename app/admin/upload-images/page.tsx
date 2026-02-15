'use client'

import { useState } from 'react'
import { Upload, Check, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [error, setError] = useState('')

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setUploadedUrl('')
    
    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File
    
    if (!file) {
      setError('Please select a file')
      return
    }

    setUploading(true)
    
    try {
      const response = await fetch('/api/upload-guide-image', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setUploadedUrl(data.url)
        e.currentTarget.reset()
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl)
  }

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-2xl mx-auto">
        <div className="card-elevated p-8">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-primary" size={32} />
            <h1 className="heading-2">Upload Guide Images</h1>
          </div>
          
          <p className="body-base text-text-secondary mb-8">
            Upload images for Installation and User Guide sections
          </p>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block body-base font-medium mb-3">
                Select Image
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="w-full p-4 bg-dark-secondary border border-dark-border rounded-lg text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-dark file:cursor-pointer hover:file:bg-primary/90"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Image
                </>
              )}
            </button>
          </form>

          {uploadedUrl && (
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <div className="flex-1">
                  <p className="body-base font-medium text-primary mb-2">Upload Successful!</p>
                  <p className="body-small text-text-secondary mb-3">
                    Copy this URL and paste it in the JSON file:
                  </p>
                  <div className="flex gap-2">
                    <code className="flex-1 p-3 bg-dark-secondary rounded text-sm text-text-primary break-all">
                      {uploadedUrl}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="btn-secondary px-4"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <img 
                src={uploadedUrl} 
                alt="Uploaded" 
                className="w-full rounded-lg border border-dark-border mt-4"
              />
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
              <p className="body-base text-red-500">{error}</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-dark-secondary rounded-lg">
            <h3 className="body-base font-medium mb-3">How to use:</h3>
            <ol className="space-y-2 body-small text-text-secondary">
              <li>1. Upload your guide image here</li>
              <li>2. Copy the generated URL</li>
              <li>3. Go to Admin Panel → Installation or User Guide</li>
              <li>4. Paste the URL in the "image" field for any step</li>
              <li>5. Save changes</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
