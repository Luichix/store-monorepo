export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  cart: Cart[];
}

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
  description: string;
  imageUrl: string;
  created_at: string;
  item: string;
  public_id: string;
  stock: number;
  rating: number;
  reviewCount: number;
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

export interface Cart {
  id: string;
  itemId: string;
  items?: Item;
  quantity: number;
  userId: string;
  v?: string;
}
