'use client';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const relatedProducts = [
  {
    id: 1,
    name: 'Billfold Wallet',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'Front of Billfold Wallet in natural leather.',
    price: '$118',
    color: 'Natural',
  },
  // More products...
];

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetch(`http://localhost:3000/api/user/${session.user.id}`, {
        headers: {
          authorization: session.user.accessToken,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Manipula los datos recibidos
          setCartItems(data);
        })
        .catch((error) => {
          // Maneja los errores
          console.log(error);
        });
    }
  }, [session]);

  const isDataEmpty =
    !Array.isArray(cartItems) || cartItems.length < 1 || !cartItems;

  const getTotal = (cartItems) =>
    cartItems.reduce((amount, item) => item.items.price + amount, 0);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito de Compras
        </h1>

        {!isDataEmpty ? (
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items en tu carrito de compras
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartItems.map(({ items }, productIdx) => (
                  <li key={items.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={items.imageUrl}
                        alt={items.description}
                        width={192}
                        height={192}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm">
                              <Link
                                href={`collection/${items.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {items.item}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{items.color}</p>
                            {items.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                {items.size}
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            C$ {items.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {items.item}
                          </label>
                          <select
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:text-sm"
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

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {items.stock ? (
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ClockIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            aria-hidden="true"
                          />
                        )}

                        <span>
                          {items.stock ? 'In stock' : `Ships in ${items.stock}`}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Resumen de la orden
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    C$ {getTotal(cartItems).toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Envío estimado</span>
                    <span
                      // href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    C$ 45.00
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Total de la orden
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    C$ 112.32
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-pink-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        ) : (
          <>None</>
        )}
        {/* Related products */}
        <section aria-labelledby="related-heading" className="mt-24">
          <h2
            id="related-heading"
            className="text-lg font-medium text-gray-900"
          >
            Tambien te puede interesar&hellip;
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={relatedProduct.imageSrc}
                    alt={relatedProduct.imageAlt}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`colection/${relatedProduct.href}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {relatedProduct.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    C$ {relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
