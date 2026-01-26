import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '../../../src/lib/cloudflare'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'image' or 'binary'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const key = type === 'binary' 
      ? `binaries/${timestamp}-${sanitizedName}`
      : `images/${timestamp}-${sanitizedName}`

    const url = await uploadFile(file, key)
    
    return NextResponse.json({ 
      success: true, 
      url,
      filename: sanitizedName,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}