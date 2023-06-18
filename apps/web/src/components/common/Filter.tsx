'use client';
import React, { useState } from 'react';
import { classNames } from '@/utils/classNames';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import { CustomFilterProps } from '@/types';

const filters = {
  color: [
    { value: 'white', label: 'Blanco', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Azul', checked: true },
    { value: 'brown', label: 'Cafe', checked: false },
    { value: 'green', label: 'Verde', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  gender: [
    { value: 'M', label: 'Mujeres', checked: false },
    { value: 'F', label: 'Hombres', checked: false },
  ],
  category: [
    { value: 'clothing', label: 'Ropa', checked: false },
    { value: 'accesories', label: 'Accesorios', checked: false },
    { value: 'brand', label: 'Marcas', checked: false },
  ],
  clothing: [
    { value: 'tops', label: 'Tops', checked: false },
    { value: 'dresses', label: 'Vestidos', checked: false },
    { value: 'pants', label: 'Pantalones', checked: false },
    { value: 'denim', label: 'Denim', checked: false },
    { value: 'sweaters', label: 'Sueteres', checked: false },
    { value: 'tshirts', label: 'Camisas', checked: false },
    { value: 'jackets', label: 'Chaquetas', checked: false },
  ],
  accesories: [
    { value: 'watches', label: 'Relojes', checked: false },
    { value: 'portfolios', label: 'Portafolios', checked: false },
    { value: 'handbags', label: 'Bolsos de mano', checked: false },
    { value: 'sunglasses', label: 'Lentes de Sol', checked: false },
    { value: 'hats', label: 'Sombreros', checked: false },
    { value: 'belts', label: 'Fajas', checked: false },
  ],
  styles: [
    { value: 'sporty', label: 'Deportivo', checked: false },
    { value: 'casual', label: 'Casual', checked: false },
    { value: 'formal', label: 'Formal', checked: false },
  ],
};
const sortOptions = [
  { name: 'Popular', href: '#', current: true },
  { name: 'Mejor Raiting', href: '#', current: false },
  { name: 'Nuevos', href: '#', current: false },
  { name: 'Price: Menor a Mayor', href: '#', current: false },
  { name: 'Price: Mayor a Menor', href: '#', current: false },
];

const Filter = () => {
  const router = useRouter();

  const { title, options }: CustomFilterProps = { title: '', options: [] };
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  // update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName);
  };
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid items-center border-b border-t border-gray-200"
    >
      <h2 id="filter-heading" className="sr-only">
        Filtros
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          <div>
            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              2 Filtros
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button type="button" className="text-gray-500">
              Limpiar todos
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-t border-gray-200 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 text-sm sm:px-6 md:gap-x-6 md:gap-y-8 lg:px-8">
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <FilterSelect filters={filters.clothing} label="Ropa" />
            <FilterSelect filters={filters.accesories} label="Accesorios" />
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <FilterSelect filters={filters.color} label="Color" />
            <FilterSelect filters={filters.size} label="Medida" />
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <FilterSelect filters={filters.category} label="Categoria" />
            <FilterSelect filters={filters.gender} label="Genero" />
          </div>
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <FilterSelect filters={filters.styles} label="Estilos" />
            <FilterSelect filters={filters.gender} label="Genero" />
          </div>
        </div>
      </Disclosure.Panel>
      <div className="col-start-1 row-start-1 py-4">
        <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Ordenar
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {option.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  );
};

export default Filter;

const FilterSelect = ({ filters, label }: { filters: any; label: string }) => {
  return (
    <fieldset>
      <legend className="block font-medium">{label}</legend>
      <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
        {filters.map((option, optionIdx) => (
          <div
            key={option.value}
            className="flex items-center text-base sm:text-sm"
          >
            <input
              id={`${label}-${optionIdx}`}
              name={`${label}[]`}
              defaultValue={option.value}
              type="checkbox"
              className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
              defaultChecked={option.checked}
            />
            <label
              htmlFor={`${label}-${optionIdx}`}
              className="ml-3 min-w-0 flex-1 text-gray-600"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
