import useCart from '@/store';
import { Cart } from '@/types';
import { useEffect } from 'react';

export const useFetchCartItems = (session) => {
  const { updateCart } = useCart();

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    if (session?.user?.accessToken) {
      fetch(`${URL}/user/${session.user.id}`, {
        headers: {
          authorization: session.user.accessToken,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })
        .then((response) => response.json())
        .then((data: Cart[]) => {
          // Manipula los datos recibidos
          updateCart(data);
        })
        .catch((error) => {
          // Maneja los errores
          console.log(error);
        });
    }
  }, [session, updateCart]);
};
