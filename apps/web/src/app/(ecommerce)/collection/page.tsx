import Image from 'next/image';
import Filter from '@/components/common/Filter';
import Link from 'next/link';
import { fetchCollection } from '@/utils';
import { CollectionProps, Item } from '@/types';

export default async function Collection({ searchParams }: CollectionProps) {
  const products: Item[] = await fetchCollection({
    section: searchParams.section || undefined,
    category: searchParams.category || undefined,
    gender: searchParams.gender || undefined,
    size: searchParams.size || undefined,
    color: searchParams.color || undefined,
    material: searchParams.material || undefined,
    style: searchParams.style || undefined,
    brand: searchParams.brand || undefined,
    price: searchParams.price || undefined,
    state: searchParams.state || undefined,
  });
  return (
    <div className="bg-white">
      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Nuestra Colección
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Estilo y elegancia se unen en cada prenda
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
                <div className="pb-4 pt-10 ">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`collection/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.item}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    C$ {product.price}
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
