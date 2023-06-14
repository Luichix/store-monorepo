import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get('authorization');
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: 'unauthorized',
      }),
      { status: 401 }
    );
  }
  const cartId = params.id;
  if (request.method === 'DELETE') {
    const deleteCart = await prisma.cart.delete({
      where: { id: cartId },
    });
    return new Response(JSON.stringify(deleteCart));
  } else {
    throw new Error(
      `The HTTP ${request.method} method is not supported at this route.`
    );
  }
}
