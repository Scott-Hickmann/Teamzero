import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';

export const withAuth =
  <U = unknown>(
    apiRoute: (
      req: NextApiRequest,
      res: NextApiResponse,
      userId: string,
      metadata: U
    ) => void | Promise<void>
  ) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    metadata: U
  ): Promise<void> => {
    const userId = await getUserId({ req });
    if (!userId) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }
    return apiRoute(req, res, userId, metadata);
  };

export async function getUserId(
  params: GetSessionParams
): Promise<string | undefined> {
  const session = await getSession(params);
  const userId = session?.user?.name ?? undefined;
  return userId;
}
