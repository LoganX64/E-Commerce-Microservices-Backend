export interface Customer {
  name: string;
  phone: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  rate: number;
  qty: number;
}

export interface Order {
  id: number;
  customer: Customer;
  products: OrderProduct[];
  totalAmount: number;
}

export interface CreateOrderPayload {
  customer: Customer;
  products: OrderProduct[];
  totalAmount: number;
}
