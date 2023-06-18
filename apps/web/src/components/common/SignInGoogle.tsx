'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import google from 'public/svg/google.svg';

const SignInGoogle = () => {
  const signInWithGoogle = async (event) => {
    event.preventDefault();

    const result = await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    });
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="relative flex items-center  justify-center  cursor-pointer outline-none bg-white shadow p-2 w-full border-r-2   rounded-lg hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70"
    >
      <figure className="absolute object-cover  left-2">
        <Image
          src={google}
          alt={'logo google button signin'}
          width={32}
          height={32}
        />
      </figure>
      <p className="self-center text-gray-800 text-sm font-semibold">
        Ingresar con Google
      </p>
    </button>
  );
};

export default SignInGoogle;
