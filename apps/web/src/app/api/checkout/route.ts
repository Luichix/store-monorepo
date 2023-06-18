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
      chat_id: '6144943354',
      text: 'This message is the server',
    };

    const sendMessage = await fetch(
      'https://api.telegram.org/bot6240552119:AAFiPpXqq7Gtvtr9JT4_vYjAri1_M3cTW0M/sendMessage​',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCart),
      }
    );

    if (!sendMessage.ok) {
      console.log(sendMessage);
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
