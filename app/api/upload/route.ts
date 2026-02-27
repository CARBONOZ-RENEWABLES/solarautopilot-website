import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import Image from '@/lib/models/Image'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'general'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    
    const image = await Image.create({
      filename,
      originalName: file.name,
      data: buffer,
      size: file.size,
      mimeType: file.type,
      category
    })
    
    return NextResponse.json({ 
      success: true, 
      url: `/api/images/${image._id}`,
      id: image._id,
      filename: sanitizedName,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}