import { useSession } from 'next-auth/react';
import axios from '@/lib/axios';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post('/auth/refresh', {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
  };

  return refreshToken;
};
