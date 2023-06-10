'use client';

import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import navigation from '@/data/navigation-dummies.json';
import Image from 'next/image';
import Link from 'next/link';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Logo } from '../common';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  return (
    <nav
      aria-label="Top"
      className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <button
            type="button"
            className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>

            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Logo width={32} height={32} />
            </Link>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={classNames(
                            open
                              ? 'border-pink-500 text-pink-500'
                              : 'border-transparent text-gray-700 hover:text-gray-800',
                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            className="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />

                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-base sm:text-sm"
                                    >
                                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <Image
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          width={100}
                                          height={100}
                                          className="object-cover object-center"
                                        />
                                      </div>
                                      <a
                                        href={item.href}
                                        className="mt-6 block font-medium text-gray-900"
                                      >
                                        <span
                                          className="absolute inset-0 z-10"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </a>
                                      <p aria-hidden="true" className="mt-1">
                                        Compra ahora
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                  {category.sections.map((section) => (
                                    <div key={section.name}>
                                      <p
                                        id={`${section.name}-heading`}
                                        className="font-medium text-gray-900"
                                      >
                                        {section.name}
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`${section.name}-heading`}
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        {section.items.map((item) => (
                                          <li key={item.name} className="flex">
                                            <a
                                              href={item.href}
                                              className="hover:text-gray-800"
                                            >
                                              {item.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}

              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </Popover.Group>

          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              {session && session.user ? (
                <>
                  <Link
                    href="profile"
                    className="text-sm font-medium text-gray-700 flex flex-col items-end hover:text-gray-800"
                  >
                    {session.user.name} &nbsp;
                    <p className="text-xs  text-gray-400">
                      {session.user.email}
                    </p>
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
            <div className="flex lg:ml-6">
              <div className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Buscar</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-6">
              <Link href="cart" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
                <span className="sr-only">
                  artículos en el carrito, ver bolsa
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
