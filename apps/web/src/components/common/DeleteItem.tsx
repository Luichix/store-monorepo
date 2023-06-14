'use client';
import useCart from '@/store';
import { XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';

import { useSession } from 'next-auth/react';
import React from 'react';

const DeleteItem = ({ cartId }: { cartId: string }) => {
  const { data: session } = useSession();
  const { removeItem } = useCart();

  const handlerSubmit = async () => {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    if (session.user) {
      const headers = {
        authorization: session.user.accessToken,
      };
      try {
        const response = await fetch(`${URL}/cart/${cartId}`, {
          method: 'DELETE',
          headers,
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Remove item from cart:', result);
          removeItem(cartId);
          // alert('Removido del carrito');
          // Realiza alguna acción adicional después de crear el usuario
        } else {
          console.error('Error in remove item to cart:', response.status);
          // Maneja el error apropiadamente
        }
      } catch (error) {
        console.error('Error removing item to cart:', error);
        // Maneja el error apropiadamente
      }
    }
  };

  const handlerSession = () => {
    alert('Necesita iniciar session');
  };
  return (
    <>
      {session && session.user ? (
        <button
          onClick={handlerSubmit}
          type="button"
          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Remove</span>
          <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : (
        <button
          onClick={handlerSession}
          type="button"
          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Remove</span>
          <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default DeleteItem;
