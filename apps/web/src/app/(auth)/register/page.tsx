import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField, SelectField } from '@/components/common';

export default function Register() {
  return (
    <>
      <Head>
        <title>Sign Up - Queen Clothes</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?&nbsp;
            <Link href="/login" className="text-pink-600">
              Sign in
            </Link>
            &nbsp; to your account.
          </>
        }
      >
        <form>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <SelectField
              className="col-span-full"
              label="How did you hear about us?"
              id="referral-source"
              name="referral_source"
            >
              <option>AltaVista search</option>
              <option>Super Bowl commercial</option>
              <option>Our route 34 city bus ad</option>
              <option>The “Never Use This” podcast</option>
            </SelectField>
          </div>
          <Button type="submit" color="pink" className="mt-8 w-full">
            Get started today
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
