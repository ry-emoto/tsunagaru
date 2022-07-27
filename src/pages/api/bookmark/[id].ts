import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'GET' });
      break;

    case 'POST': {
      const session = await getSession({ req });
      if (session?.user?.email) {
        const result = await prisma.bookmark.create({
          data: {
            post: {
              connect: { id: Number(req.query.id) },
            },
            user: {
              connect: { email: session?.user?.email },
            },
          },
        });
        res.json(result);
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
      break;
    }

    case 'PATCH':
      res.status(200).json({ message: 'PATCH' });
      break;

    case 'DELETE': {
      const session = await getSession({ req });
      if (session?.user?.email) {
        const result = await prisma.bookmark.deleteMany({
          where: {
            post_id: Number(req.query.id),
            user_id: session.user.id,
          },
        });
        res.json(result);
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
