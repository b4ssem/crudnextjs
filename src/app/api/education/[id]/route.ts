import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const edu = await prisma.education.update({ where: { id: Number(params.id) }, data })
  return NextResponse.json(edu)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.education.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}