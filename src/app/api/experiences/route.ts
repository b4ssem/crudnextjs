import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const experiences = await prisma.experience.findMany()
  return NextResponse.json(experiences)
}

export async function POST(req: Request) {
  const data = await req.json()
  const exp = await prisma.experience.create({ data })
  return NextResponse.json(exp, { status: 201 })
}