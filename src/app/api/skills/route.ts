import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const skills = await prisma.skill.findMany()
  return NextResponse.json(skills)
}

export async function POST(req: Request) {
  const data = await req.json()
  if (data.percentage) {
    data.percentage = parseInt(data.percentage, 10)
  }
  const skill = await prisma.skill.create({ data })
  return NextResponse.json(skill, { status: 201 })
}