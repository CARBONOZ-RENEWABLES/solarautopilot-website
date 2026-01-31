import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET() {
  try {
    const downloads = await prisma.download.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(downloads)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const platform = formData.get('platform') as string
    const version = formData.get('version') as string
    const checksum = formData.get('checksum') as string | null

    if (!file || !platform || !version) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Store files locally in public/downloads
    const uploadsDir = join(process.cwd(), 'public', 'downloads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${platform}-${version}-${file.name}`
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    const fileUrl = `/downloads/${filename}`

    const download = await prisma.download.create({
      data: {
        platform,
        version,
        filename: file.name,
        fileKey: filename,
        fileUrl,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        checksum,
        enabled: true,
      },
    })

    return NextResponse.json(download)
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, enabled, downloads } = await req.json()

  const updateData: any = {}
  if (enabled !== undefined) updateData.enabled = enabled
  if (downloads !== undefined) updateData.downloads = downloads

  const download = await prisma.download.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json(download)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

    const download = await prisma.download.findUnique({ where: { id } })
    if (!download) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Delete local file
    const filepath = join(process.cwd(), 'public', 'downloads', download.fileKey)
    if (existsSync(filepath)) {
      await require('fs/promises').unlink(filepath)
    }

    await prisma.download.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 500 })
  }
}
