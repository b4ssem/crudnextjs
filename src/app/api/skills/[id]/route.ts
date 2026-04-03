import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json()
  if (data.percentage) {
    data.percentage = parseInt(data.percentage, 10)
  }
  const skill = await prisma.skill.update({ where: { id: Number(id) }, data })
  return NextResponse.json(skill)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.skill.delete({ where: { id: Number(id) } })
  return NextResponse.json({ success: true })
}