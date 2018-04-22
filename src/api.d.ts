export interface Employee {
  id: number;
  name: string;
}

export interface Stock {
  name: string;
  id: number;
}

export interface DataStock extends OrderGood {
  name: string;
}

export interface OrderGood {
  deposit: number;
  model_id: number;
  price: number;
  count: number;
}

export interface Order {
  begin: string; // Date
  client_id: number;
  comment: string;
  created: string; // Date
  delivery_address_from: string;
  delivery_address_to: string;
  end: string; // Date
  give_stock_id: number;
  giver_id: number;
  goods: OrderGood[];
  id: number;
  status: string;
  take_stock_id: number;
  taker_id: number;
  total_amount: number;
  total_deposit: number;
}

export interface OrderData extends Order {
  stocks: DataStock[];
  taker: Employee;
  giver: Employee;
}

export interface OrderResponse {
  error: boolean;
  order: Order;
}
