import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

    const page = await prisma.page.findUnique({
      where: { slug, published: true },
    })

    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json(null)
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, ...data } = await req.json()

  const page = await prisma.page.upsert({
    where: { slug },
    update: data,
    create: { slug, ...data },
  })

  return NextResponse.json(page)
}
