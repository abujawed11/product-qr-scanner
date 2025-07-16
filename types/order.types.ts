// types/order.types.ts

export interface Kit {
  kit_id: string;
  tilt_angle: number;
  clearance: number;
  configuration: string;
  num_panels: number;
  region: string;
  price: string;
  currency: string;
}

export interface OrderItem {
  order_item_id: string;
  kit: Kit;
  quantity: number;
  unit_price: string;
  total_price: string;
}

export interface Order {
  order_id: string;
  order_date: string;
  status: string;
  manufacturing_location: string;
  dispatch_location: string;
  expected_delivery_date?: string;
  delivery_date?: string;
  remarks?: string;
  items: OrderItem[];
  total_quantity: number;
  kit_count: number;
  client_id: string;  // ✅ updated from customer_id
}