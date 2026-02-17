import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('No file in request')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ error: 'Invalid file type. Only images allowed.' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size)
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 })
    }

    const guidesDir = join(process.cwd(), 'public', 'images', 'guides')
    
    // Ensure directory exists with proper permissions
    try {
      await access(guidesDir, constants.W_OK)
    } catch {
      await mkdir(guidesDir, { recursive: true, mode: 0o755 })
      console.log('Created guides directory:', guidesDir)
    }

    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    const filepath = join(guidesDir, filename)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filepath, buffer, { mode: 0o644 })
    
    // Verify file was written
    try {
      await access(filepath, constants.R_OK)
      console.log('Successfully uploaded:', filename)
    } catch {
      throw new Error('File verification failed')
    }

    return NextResponse.json({ 
      success: true, 
      url: `/images/guides/${filename}`,
      filename: filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
