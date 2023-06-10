import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import Filter from '@/components/common/Filter';
import Link from 'next/link';

const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
};
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

async function getData() {
  const res = await fetch('http://localhost:3000/api/collection');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface Products {
  id: string;
  v: number;
  category: string;
  created_at: string;
  description: string;
  imageUrl: string;
  item: string;
  price: number;
  public_id: string;
  state: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

export default async function Example() {
  const products: Products[] = await getData();
  return (
    <div className="bg-white">
      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Workspace
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            The secret to a tidy desk? Don&apos;t get rid of anything, just put
            it in really really nice looking containers.
          </p>
        </div>

        {/* Filters */}
        <Filter />

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <Image
                    src={product.imageUrl}
                    alt={product.description}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`collection/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.item}
                    </Link>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? 'text-yellow-400'
                              : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <nav
          aria-label="Pagination"
          className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
        >
          <div className="min-w-0 flex-1">
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              Previous
            </a>
          </div>
          <div className="hidden space-x-2 sm:flex">
            {/* Current: "border-cyan-600 ring-1 ring-cyan-600", Default: "border-gray-300" */}
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              1
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-cyan-600 bg-white px-4 ring-1 ring-cyan-600 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              3
            </a>
            <span className="inline-flex h-10 items-center px-1.5 text-gray-500">
              ...
            </span>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              8
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              9
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              10
            </a>
          </div>
          <div className="flex min-w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-cyan-600"
            >
              Next
            </a>
          </div>
        </nav>
      </main>
    </div>
  );
}
