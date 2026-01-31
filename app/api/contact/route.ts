import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendContactEmail } from '@/lib/email/mailer'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    const { name, email, subject, message } = data

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    await prisma.contact.create({
      data: { name, email, subject, message },
    })

    try {
      await sendContactEmail(data)
    } catch (error) {
      console.error('Email send failed:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: true })
  }
}
