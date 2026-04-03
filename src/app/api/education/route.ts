import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const education = await prisma.education.findMany()
  return NextResponse.json(education)
}

export async function POST(req: Request) {
  const data = await req.json()
  const edu = await prisma.education.create({ data })
  return NextResponse.json(edu, { status: 201 })
}