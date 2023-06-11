import { FilterProps } from '@/types';

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

  const url = new URL('http://localhost:3000/api/collection');

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

export async function fetchItem(itemId: string) {
  const res = await fetch(`http://localhost:3000/api/collection/${itemId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export async function fetchCart({
  id,
  authorization,
}: {
  id: string;
  authorization: string;
}) {
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// interface CartItemProps {
//   userId: string;
//   itemId: string;
//   quantity: string;
// }

// export async function fetchCart(cartItem: CartItemProps) {
//   // Set the required headers for the API request

//   const headers: HeadersInit = {
//     authorization: '',
//   };

//   const body = cartItem;

//   // Set the required headers for the API request
//   const response = await fetch('http://localhost:3000/api/cart ', {
//     headers: headers,
//     method: 'POST',
//   });

//   // Parse the response as JSON
//   const result = await response.json();

//   return result;
// }

/**
 * 
 * export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

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

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  // Set the required headers for the API request
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

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
