import prisma from '@/lib/prisma';
import { FilterProps } from '@/types';

export async function GET(request: Request) {
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  const filters: FilterProps = {
    section: urlParams.get('section') || undefined,
    category: urlParams.get('category') || undefined,
    gender: urlParams.get('gender') || undefined,
    size: urlParams.get('size') || undefined,
    color: urlParams.get('color') || undefined,
    material: urlParams.get('material') || undefined,
    style: urlParams.get('style') || undefined,
    brand: urlParams.get('brand') || undefined,
    price: urlParams.get('price')
      ? parseInt(urlParams.get('price')!)
      : undefined,
    state: urlParams.get('state') || undefined,
  };

  const items = await prisma.items.findMany({
    where: {
      section: filters.section !== null ? filters.section : undefined,
      category: filters.category !== null ? filters.category : undefined,
      gender: filters.gender !== null ? filters.gender : undefined,
      size: filters.size !== null ? filters.size : undefined,
      color: filters.color !== null ? filters.color : undefined,
      material: filters.material !== null ? filters.material : undefined,
      style: filters.style !== null ? filters.style : undefined,
      brand: filters.brand !== null ? filters.brand : undefined,
      price: filters.price !== undefined ? filters.price : undefined,
      state: filters.state !== null ? filters.state : undefined,
    },
  });

  return new Response(JSON.stringify(items));
}
