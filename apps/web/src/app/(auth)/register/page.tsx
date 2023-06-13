'use client';
import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/layout';
import { Button, TextField, SelectField } from '@/components/common';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: `${name} ${lastName}`,
      email: email,
      password: password,
    };

    const URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User created:', result);
        // Realiza alguna acción adicional después de crear el usuario
        router.push('/login'); // Redirige a la página de inicio de sesión
      } else {
        console.error('Error creating user:', response.status);
        // Maneja el error apropiadamente
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Maneja el error apropiadamente
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="Nombre"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Apellido"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <TextField
              className="col-span-full"
              label="Correo electronico"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className="col-span-full"
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
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
