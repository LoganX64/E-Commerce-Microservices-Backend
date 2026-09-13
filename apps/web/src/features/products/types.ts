export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CreateProductPayload {
  code: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
