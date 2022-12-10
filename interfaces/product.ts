import { ProductImage } from "./product-image";

export interface Product {
  id: number;
  name: string;
  price: number;
  size: number;
  description: string;
  images: ProductImage[];
  isInactive: boolean;
}
