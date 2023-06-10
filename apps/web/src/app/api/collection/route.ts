import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const items = await prisma.items.findMany();

  return new Response(JSON.stringify(items));
}
