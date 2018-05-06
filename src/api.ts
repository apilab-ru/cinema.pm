export interface Employee {
  id: string;
  name: string;
}

export interface Stock {
  name: string;
  id: string;
  deposit: number;
  price?: number;
}

export interface DataStock extends OrderGood {
  name: string;
}

export interface OrderGood {
  deposit?: number;
  model_id?: string;
  price?: number;
  count?: number;
}

export interface OrderRest {
  begin: string; // Date
  client_id: string;
  comment: string;
  created: string; // Date
  delivery_address_from: string;
  delivery_address_to: string;
  end: string; // Date
  give_stock_id: string;
  giver_id: string;
  goods: OrderGood[];
  id: string;
  status: string;
  take_stock_id: string;
  taker_id: string;
  total_amount: string;
  total_deposit: string;
}

export interface Order {
  begin?: string; // Date
  client_id?: string;
  comment?: string;
  created?: string; // Date
  delivery_address_from?: string;
  delivery_address_to?: string;
  end?: string; // Date
  give_stock_id?: string;
  giver_id?: string;
  goods: OrderGood[];
  id?: string;
  status?: string;
  take_stock_id?: string;
  taker_id?: string;
  total_amount?: number;
  total_deposit?: number;
}

export interface CreateOrder {
  id?: string;
  name?: string;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  begin?: string; // Date
  end?: string; // Date
  delivery_address_to?: string;
  delivery_address_from?: string;
  total_delivery?: number;
  total_amount?: number;
  total_deposit?: number;
  goods: OrderGood[];
  giver_id?: string;
  taker_id?: string;
  give_stock_id?: string;
  take_stock_id?: string;
  comment?: string;
  total_price?: number;
}

export interface OrderData extends Order {
  stocks: DataStock[];
  taker: Employee;
  giver: Employee;
  client: Client;
}

export interface OrderResponse extends BaseResponse {
  order: Order;
}

export interface BaseResponse {
  error?: boolean;
  error_text?: string;
}

export interface ListOrderDetails extends BaseResponse {
  orders: Order[];
}

export interface Place {
  id: string;
  name: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface User {
  name: string;
  id: string;
  login: string;
  role: UserRole;
  password?: string;
}

export interface GetOrderResponse extends BaseResponse {
  order: Order;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
}

