'use client';
import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField } from '@/components/common';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import SignInGoogle from '@/components/common/SignInGoogle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const result = await signIn('credentials', {
      username: email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <>
      <Head>
        <title>Login - Queen Clothes</title>
      </Head>
      <AuthLayout
        title="Ingresar a la cuenta"
        subtitle={
          <>
            ¿No tienes una cuenta?&nbsp;
            <Link href="/register" className="text-pink-600">
              Crear mi cuenta
            </Link>
          </>
        }
      >
        <form className="-mt-4">
          <div className="space-y-6">
            <TextField
              label="Correo electronico"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button
            onClick={onSubmit}
            type="button"
            color="pink"
            className="mt-8 w-full"
          >
            Ingresar a la cuenta
          </Button>
        </form>
        <div className="flex w-full p-4 text-md  justify-center ">
          <p className="text-gray-600">ó </p>
        </div>
        <SignInGoogle />
      </AuthLayout>
    </>
  );
}
