import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongodb'
import Image from '@/lib/models/Image'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    
    const image = await Image.findById(params.id)
    
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
    
    return new NextResponse(image.data, {
      headers: {
        'Content-Type': image.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
  }
}
