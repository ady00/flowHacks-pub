import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    user: { sub },
  }: { user: UserProfile } = getSession(req, res);
  const whiteboards = await prisma.whiteboards.findMany({
    where: {
      createdBy: sub,
      inTrash: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(whiteboards);
};

export default withApiAuthRequired(handler);
