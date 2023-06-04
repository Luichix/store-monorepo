import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField } from '@/components/common';

export default function Login() {
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
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" color="pink" className="mt-8 w-full">
            Sign in to account
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
