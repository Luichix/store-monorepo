'use client';
import React from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';

const Gallery = ({ product }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {/* {product.images.map((image) => ( */}
          <Tab
            key={product.id}
            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
          >
            {({ selected }) => (
              <>
                <span className="sr-only">{product.item}</span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={96}
                    height={130}
                    className="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  className={classNames(
                    selected ? 'ring-pink-500' : 'ring-transparent',
                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Tab>
          {/* ))} */}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
        {/* {product.images.map((image) => ( */}
        <Tab.Panel key={product.id}>
          <Image
            src={product.imageUrl}
            alt={product.description}
            width={672}
            height={672}
            className="h-full w-full object-cover object-center sm:rounded-lg"
          />
        </Tab.Panel>
        {/* ))} */}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
