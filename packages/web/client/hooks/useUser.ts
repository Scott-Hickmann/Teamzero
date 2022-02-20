import { User } from '@teamzero/types';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

import { UserIdContext } from '../components/userIdContext';
import { useApi } from './useApi';

export function useUser() {
  const serverId = useContext(UserIdContext);
  const { data: session } = useSession();
  const userId = session?.user?.name ?? serverId ?? undefined;
  const { data: userData, mutate: mutateUser } = useApi<
    { data: { user: User } },
    { id: string }
  >(
    userId
      ? {
          path: '/users/get',
          payload: { id: userId }
        }
      : undefined
  );
  if (!userId || !userData)
    return {
      signedIn: false,
      user: undefined,
      mutateUser: undefined
    };
  return {
    signedIn: true,
    user: userData.data.user,
    mutateUser
  };
}
