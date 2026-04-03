import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const exp = await prisma.experience.update({ where: { id: Number(params.id) }, data })
  return NextResponse.json(exp)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.experience.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}