import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';

interface RequestBody {
  userId: string;
}

export async function POST(request: Request) {
  try {
    const accessToken = request.headers.get('authorization');
    if (!accessToken || !verifyJwt(accessToken)) {
      return new Response(
        JSON.stringify({
          error: 'unauthorized',
        }),
        { status: 401 }
      );
    }

    if (request.method !== 'POST') {
      throw new Error(
        `The HTTP ${request.method} method is not supported at this route.`
      );
    }

    const body: RequestBody = await request.json();
    const URL_TELEGRAM = process.env.API_TELEGRAM;
    const CHAT_ID = process.env.CHAT_ID_TELEGRAM;

    const userCart = await prisma.cart.findMany({
      where: { userId: body.userId },
      include: {
        items: true,
      },
    });

    const data = {
      chat_id: CHAT_ID,
      text: 'New Order - Please Check Web',
    };

    const sendMessage = await fetch(URL_TELEGRAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!sendMessage.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return new Response(JSON.stringify(sendMessage));
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal Server Error',
      }),
      { status: 500 }
    );
  }
}
