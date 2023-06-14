import { signJwtAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.users.findFirst({
    where: {
      email: body.username,
    },
    include: {
      cart: {
        include: {
          items: true,
        },
      },
    },
  });

  console.log(user);

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
