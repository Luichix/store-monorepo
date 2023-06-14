'use client';
import useCart from '@/store';
import { useSession } from 'next-auth/react';
import React from 'react';

const ButtonBag = ({ itemId }: { itemId: string }) => {
  const { data: session } = useSession();

  const { addItem } = useCart();
  const handlerSubmit = async () => {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    if (session.user) {
      const headers = {
        authorization: session.user.accessToken,
      };
      const data = {
        userId: session.user.id,
        itemId,
        quantity: 1,
      };

      try {
        const response = await fetch(`${URL}/cart`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Add into bag:', result);

          addItem(result);

          // alert('Agregado al carrito');
          // Realiza alguna acción adicional después de crear el usuario
        } else {
          console.error('Error add item into bag:', response.status);
          // Maneja el error apropiadamente
        }
      } catch (error) {
        console.error('Error adding item into bag:', error);
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
          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-pink-500 px-8 py-3 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
        >
          Add to bag
        </button>
      ) : (
        <button
          onClick={handlerSession}
          // disabled
          type="button"
          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-pink-500 px-8 py-3 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
        >
          Add to bag
        </button>
      )}
    </>
  );
};

export default ButtonBag;
