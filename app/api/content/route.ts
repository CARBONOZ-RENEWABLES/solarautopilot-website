import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')

  try {
    const contentPath = path.join(process.cwd(), 'content', 'collections', `${collection}.json`)
    
    if (!fs.existsSync(contentPath)) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 })
    }

    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'))
    
    if (slug) {
      const item = Array.isArray(content) 
        ? content.find(item => item.slug === slug)
        : content.slug === slug ? content : null
      return NextResponse.json(item, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        }
      })
    }
    
    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}