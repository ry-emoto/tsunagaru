import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const result = await prisma.post.findMany({
        orderBy: [
          {
            id: 'desc',
          },
        ],
        include: {
          user: { select: { name: true } },
          like: true,
          bookmark: true,
          comment: { include: { user: true } },
          _count: { select: { like: true, bookmark: true, comment: true } },
        },
      });
      res.status(200).json(result);
      break;
    }

    case 'POST': {
      const { type, content } = req.body;
      const session = await getSession({ req });

      if (session?.user?.email) {
        const result = await prisma.post.create({
          data: {
            type,
            content,
            user: { connect: { email: session.user.email } },
          },
        });
        res.status(200).json(result);
      } else {
        res.status(200);
      }
      break;
    }

    case 'PATCH':
      res.status(200).json({ message: 'PATCH' });
      break;

    case 'DELETE':
      res.status(200).json({ message: 'PATCH' });
      break;

    default:
      res.status(405).end();
      break;
  }
}
