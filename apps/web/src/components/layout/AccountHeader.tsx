'use client';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '../common';
import Link from 'next/link';
import Image from 'next/image';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';

import { signIn, signOut, useSession } from 'next-auth/react';
import useCart from '@/store';
import { useFetchCartItems } from '@/hooks';

const navigation = [
  { name: 'Tienda', href: 'collection' },
  { name: 'Carrito', href: 'cart' },
  { name: 'Historial', href: 'history' },
];

export const AccountHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useFetchCartItems(session);

  const { cart } = useCart();

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          <button
            type="button"
            className="-m-3 p-3 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Logo width={32} height={32} />
            </Link>
          </div>

          <nav className="hidden  md:flex md:gap-x-11 md:text-sm md:font-medium md:leading-6 md:text-gray-700 md:hover:text-gray-800">
            {navigation.map((item, itemIdx) => (
              <Link key={itemIdx} href={item.href}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center">
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            {session && session.user ? (
              <>
                <Link
                  href="profile"
                  className="text-sm font-medium text-gray-700 flex flex-col items-end hover:text-gray-800"
                >
                  {session.user.name} &nbsp;
                  <p className="text-xs  text-gray-400">{session.user.email}</p>
                </Link>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cerrar Session
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Ingresar
                </button>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <Link
                  href="register"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:ml-8 lg:flex">
            <div className="flex items-center text-gray-700 hover:text-gray-800">
              <Image
                className="block h-auto w-5 flex-shrink-0"
                src="/svg/nicaragua-flag.svg"
                alt=""
                width={24}
                height={24}
              />
              <span className="ml-3 block text-sm font-medium">NIO</span>
              <span className="sr-only">, cambiar moneda</span>
            </div>
          </div>

          {/* Search */}
          {/* <div className="flex lg:ml-6">
              <div className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Buscar</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div> */}

          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-6">
            <Link href="cart" className="group -m-2 flex items-center p-2">
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {cart.length}
              </span>
              <span className="sr-only">
                artículos en el carrito, ver bolsa
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="-ml-0.5 flex h-16 items-center gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="-ml-0.5">
              <Link href="#" className="-m-1.5 block p-1.5">
                <span className="sr-only">Your Company</span>
                <Logo width="40" />
              </Link>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
