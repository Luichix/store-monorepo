import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.users.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}

// import { verifyJwt } from '@/lib/jwt';
// import prisma from '@/lib/prisma';

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const accessToken = request.headers.get('authorization');
//   if (!accessToken || !verifyJwt(accessToken)) {
//     return new Response(
//       JSON.stringify({
//         error: 'unauthorized',
//       }),
//       { status: 401 }
//     );
//   }

//   const userCart = await prisma.cart.findFirst({
//     where: { userId: params.id },
//     include: {
//       items: {
//         select: {
//           imageUrl: true,
//           description: true,
//           item: true,
//           category: true,
//           price: true,
//           stock: true,
//         },
//       },
//     },
//   });

//   return new Response(JSON.stringify(userCart));
// }
