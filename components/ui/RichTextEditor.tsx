'use client'
import { useState } from 'react'
import { Bold, Italic, List, Link, Image } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isEditing, setIsEditing] = useState(false)

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML
    onChange(content)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex space-x-2">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter URL:')
            if (url) formatText('createLink', url)
          }}
          className="p-2 hover:bg-gray-200 rounded"
          title="Add Link"
        >
          <Link className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="p-4 min-h-[200px] focus:outline-none"
        style={{ minHeight: '200px' }}
        data-placeholder={placeholder}
      />

      {/* Character count */}
      <div className="bg-gray-50 border-t px-4 py-2 text-sm text-gray-500">
        {value.replace(/<[^>]*>/g, '').length} characters
      </div>
    </div>
  )
}