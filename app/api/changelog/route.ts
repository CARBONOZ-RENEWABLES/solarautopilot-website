import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const changelogs = await prisma.changelog.findMany({
      where: { published: true },
      orderBy: { releaseDate: 'desc' },
    })
    return NextResponse.json(changelogs)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const changelog = await prisma.changelog.create({ data })
  return NextResponse.json(changelog)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, ...data } = await req.json()
  const changelog = await prisma.changelog.update({ where: { id }, data })
  return NextResponse.json(changelog)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

  await prisma.changelog.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
