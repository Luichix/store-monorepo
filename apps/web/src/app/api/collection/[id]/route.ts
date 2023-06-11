import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = await prisma.items.findFirst({
    where: { id: params.id },
  });

  return new Response(JSON.stringify(item));
}
