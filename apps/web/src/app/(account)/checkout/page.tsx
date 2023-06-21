'use client';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/20/solid';
import useCart from '@/store';
import { useSession } from 'next-auth/react';
import { useFetchCartItems } from '@/hooks';
import Link from 'next/link';
import { confirmOrder } from '@/utils';
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/24/outline';

const products = [
  {
    id: 1,
    title: 'Micro Backpack',
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  // More products...
];

export default function Checkout() {
  const { cart } = useCart();

  const { data: session } = useSession();

  useFetchCartItems(session);

  const isDataEmpty = !Array.isArray(cart) || cart.length < 1 || !cart;

  const getTotal = (cartItems) =>
    cartItems.reduce((amount, item) => item.items.price + amount, 0);

  const onSubmit = async () => {
    if (session?.user?.accessToken) {
      await confirmOrder({
        authorization: session.user.accessToken,
        userId: session.user.id,
      });
    }
  };

  return (
    <div className="bg-white pt-10">
      {/* Background color split screen for large screens */}
      <div
        className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Información de Contacto</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              Resumen del Pedido
            </h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items en tu carrito</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map(({ items }, index) => (
                  <li key={index} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={items.imageUrl}
                        alt={items.description}
                        width={80}
                        height={80}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              href={`collection/${items.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {items.item}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {items.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {items.size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remover</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          C$ {items.price}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Cantidad
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-cyan-500 focus:outline-none cyanocus:ring-1 focus:ring-cyan-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Envio</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Impuestos</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $75.52
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="w-full rounded-md border border-transparent bg-pink-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirmar Orden
                </button>
              </div>
            </div>
          </div>
        </section>

        <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900"
              >
                Información de Contacto
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apellidos
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telefono
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electronico
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="payment-heading" className="mt-10">
              <h2
                id="payment-heading"
                className="text-lg font-medium text-gray-900"
              >
                Forma de entrega
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-3">
                  <div className="flex w-full  border-2 rounded-md gap-2 justify-between  border-gray-200 p-1 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm">
                    <label
                      htmlFor="send-on-truck"
                      className="flex items-center gap-2  text-sm font-medium text-gray-700"
                    >
                      <TruckIcon width={28} height={28} />
                      Envio
                    </label>
                    <div className="mt-1">
                      <input
                        type="radio"
                        id="send-on-truck"
                        name="send-on-truck"
                        autoComplete="cc-name"
                        className="border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className=" mt-4 flex w-full rounded-md gap-2 justify-between border-2  border-gray-200 p-1 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm">
                    <label
                      htmlFor="pick-up-in-store"
                      className="flex items-center gap-2  text-sm font-medium text-gray-700"
                    >
                      <BuildingStorefrontIcon width={28} height={28} />
                      Retirar en la tienda
                    </label>
                    <div className="mt-1">
                      <input
                        type="radio"
                        id="pick-up-in-store"
                        name="pick-up-in-store"
                        autoComplete="cc-name"
                        className="    border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-lg font-medium text-gray-900"
              >
                Dirección de envió
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    País
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Municipio
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Departamento
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="billing-heading" className="mt-10">
              <h2
                id="billing-heading"
                className="text-lg font-medium text-gray-900"
              >
                Información de Facturación
              </h2>

              <div className="mt-6 flex items-center">
                <input
                  id="same-as-shipping"
                  name="same-as-shipping"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-cyan-500"
                />
                <div className="ml-2">
                  <label
                    htmlFor="same-as-shipping"
                    className="text-sm font-medium text-gray-900"
                  >
                    Igual que la información de Envio
                  </label>
                </div>
              </div>
            </section>

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:flex-col gap-2 sm:justify-between">
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                *Se enviaran los datos del pedido para ser procesados.
              </p>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                *Unicamente se aceptaran ordenes dentro de Nicaragua.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
