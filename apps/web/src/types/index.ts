export interface CollectionProps {
  searchParams: FilterProps;
}

export interface FilterProps {
  section?: string;
  category?: string;
  gender?: string;
  size?: string;
  color?: string;
  material?: string;
  style?: string;
  brand?: string;
  price?: number;
  state?: string;
}

export interface Item {
  id: string;
  v: number;
  category: string;
  description: string;
  imageUrl: string;
  created_at: string;
  item: string;
  price: number;
  public_id: string;
  state: string;
  stock: number;
  rating: number;
  reviewCount: number;
}
