import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json()
  const contact = await prisma.contact.update({ 
    where: { id: Number(id) }, 
    data 
  });
  return NextResponse.json(contact)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.contact.delete({ 
    where: { id: Number(id) } 
  });
  return NextResponse.json({ success: true })
}