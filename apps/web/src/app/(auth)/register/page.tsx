import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField, SelectField } from '@/components/common';

export default function Register() {
  return (
    <>
      <Head>
        <title>Registrarse - Queen Clothes</title>
      </Head>
      <AuthLayout
        title="Regístrese para obtener una cuenta"
        subtitle={
          <>
            ¿Ya estas registrado?&nbsp;
            <Link href="/login" className="text-pink-600">
              Ingresar
            </Link>
            &nbsp; a tu cuenta.
          </>
        }
      >
        <form>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="Nombre"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
            />
            <TextField
              label="Apellido"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
            />
            <TextField
              className="col-span-full"
              label="Correo electronico"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              className="col-span-full"
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>
          <Button type="submit" color="pink" className="mt-8 w-full">
            Crear mi cuenta
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
