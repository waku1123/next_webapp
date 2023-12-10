'use server';

import { auth } from '@clerk/nextjs';

export const authGuard = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  return userId;
}
