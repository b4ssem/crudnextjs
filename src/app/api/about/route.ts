import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const about = await prisma.about.findFirst()
  return NextResponse.json(about)
}

export async function POST(req: Request) {
  const data = await req.json()
  const about = await prisma.about.create({ data })
  return NextResponse.json(about, { status: 201 })
}