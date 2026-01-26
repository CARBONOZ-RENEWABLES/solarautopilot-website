import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const mediaPath = path.join(process.cwd(), 'public', 'images')
    const files = fs.readdirSync(mediaPath).map(file => ({
      name: file,
      url: `/images/${file}`,
      size: fs.statSync(path.join(mediaPath, file)).size
    }))
    
    return NextResponse.json(files)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json()
    const filePath = path.join(process.cwd(), 'public', 'images', filename)
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}