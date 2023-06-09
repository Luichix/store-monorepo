'use client';
import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField } from '@/components/common';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
        <title>Sign In - Queen Clothes</title>
      </Head>
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?&nbsp;
            <Link href="/register" className="text-pink-600">
              Sign up
            </Link>
            &nbsp; for a free trial.
          </>
        }
      >
        <form>
          <div className="space-y-6">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
              label="Password"
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
            Sign in to account
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
