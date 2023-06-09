'use client';

import { Fragment, useState } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import navigation from 'public/data/navigation-dummies.json';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';

export const MobileNavigation = () => {
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();

  return (
    <>
      <button
        type="button"
        className="rounded-md absolute z-30 left-2 top-3 bg-white p-2 text-gray-400 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'border-pink-500 text-pink-500'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  width={100}
                                  height={100}
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
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
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {session && session.user ? (
                    <>
                      <div className="flow-root">
                        <Link
                          href="profile"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {session.user.name} &nbsp;
                          <p className="text-xs  text-gray-400">
                            {session.user.email}
                          </p>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <button
                          onClick={() => signOut()}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Cerrar session
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flow-root">
                        <button
                          onClick={() => signIn()}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Ingresar
                        </button>
                      </div>
                      <div className="flow-root">
                        <Link
                          href="register"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Crear cuenta
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="-m-2 flex items-center p-2">
                    <Image
                      width={20}
                      height={20}
                      src="/svg/nicaragua-flag.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      NIO
                    </span>
                    <span className="sr-only">, change currency</span>
                  </div>
                </div>
                {session && session.user.role === 'admin' && (
                  <div className="border-t border-gray-200 px-4 py-6">
                    <Link
                      href="admin/dashboard"
                      className="flex flex-row gap-2"
                    >
                      <span className=" block text-base font-medium text-gray-900">
                        Back Office
                      </span>
                      <ArrowLeftOnRectangleIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
