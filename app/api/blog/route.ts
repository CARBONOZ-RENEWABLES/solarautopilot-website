import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const post = await prisma.blogPost.findUnique({
        where: { slug, published: true },
      })
      return NextResponse.json(post)
    }

    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  })

  return NextResponse.json(post)
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, ...data } = await req.json()

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
    },
  })

  return NextResponse.json(post)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

  await prisma.blogPost.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
