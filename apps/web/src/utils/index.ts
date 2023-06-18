import { FilterProps } from '@/types';

const NEXT_URL = process.env.NEXT_PUBLIC_API_URL;

/* ---------------------------- fetch collection ---------------------------- */

export async function confirmOrder({
  userId,
  authorization,
}: {
  userId: string;
  authorization: string;
}) {
  const res = await fetch(`${NEXT_URL}/checkout`, {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function fetchCollection(filters: FilterProps) {
  const {
    section,
    category,
    gender,
    size,
    color,
    material,
    style,
    brand,
    price,
    state,
  } = filters;

  const url = new URL(`${NEXT_URL}/api/collection`);

  // Agregar los parámetros de filtro a la URL
  if (section) url.searchParams.append('section', section);
  if (category) url.searchParams.append('category', category);
  if (gender) url.searchParams.append('gender', gender);
  if (size) url.searchParams.append('size', size);
  if (color) url.searchParams.append('color', color);
  if (material) url.searchParams.append('material', material);
  if (style) url.searchParams.append('style', style);
  if (brand) url.searchParams.append('brand', brand);
  if (price) url.searchParams.append('price', price.toString());
  if (state) url.searchParams.append('state', state);

  const response = await fetch(url.toString());
  // Procesar la respuesta y devolver los datos
  const data = await response.json();
  return data;
}

/* ------------------------------- fetch item ------------------------------- */

export async function fetchItem(itemId: string) {
  const res = await fetch(`${NEXT_URL}/api/collection/${itemId}`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/* ------------------------------- fetch cart ------------------------------- */
export async function fetchCart({
  id,
  authorization,
}: {
  id: string;
  authorization: string;
}) {
  const res = await fetch(`${NEXT_URL}/api/user/${id}`, {
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
  });
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
/**
 * 


export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, model, year } = car;

  url.searchParams.append(
    'customer',
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ''
  );
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

 */
