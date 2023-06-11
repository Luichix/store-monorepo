import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

interface RequestBody {
  userId: string;
  itemId: string;
  quantity: number;
}
export async function POST(request: Request) {
  const accessToken = request.headers.get('authorization');
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: 'unauthorized',
      }),
      { status: 401 }
    );
  }

  const body: RequestBody = await request.json();

  const cartItem = await prisma.cart.create({
    data: {
      userId: body.userId,
      itemId: body.itemId,
      quantity: body.quantity,
    },
  });

  return new Response(JSON.stringify(cartItem));
}
