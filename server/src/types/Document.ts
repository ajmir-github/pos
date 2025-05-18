interface Document {
  id: string;
  deletedAt?: Date;
}
interface DocumentWithTracker extends Document {
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  admin = "admin",
  manager = "manager",
  cashier = "cashier",
  waiter = "waiter",
  kitchen = "kitchen",
}

export interface User extends Document {
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface Color extends Document {
  name: string;
  class: string;
}

export interface Category extends Document {
  name: string;
  order?: number;
}

export interface ModifierOption extends Document {
  name: string;
  price: number;
}

export interface Modifier extends Document {
  name: string;
  multiple: boolean;
  required: boolean;
  options: string[];
}

export interface Item extends Document {
  name: string;
  price: number;
  color: string;
  category: string;
}

export enum DiscountType {
  unset = "unset",
  fixed = "fixed",
  percentage = "percentage",
}

export enum TableStatus {
  open = "open",
  closed = "closed",
  paying = "paying",
}

export interface Table extends DocumentWithTracker {
  number: number;
  status: TableStatus;
  discount?: {
    type: DiscountType;
    value: number;
  };
  total: number;
  tabs: string[];
}

export interface Tab extends DocumentWithTracker {
  number: number;
  description?: string;
  total: number;
  discount?: {
    type: DiscountType;
    value: number;
  };
  orders: string[];
}

enum OrderStatus {
  drafted = "drafted",
  sent = "sent",
  cancelled = "cancelled",
}

export interface Order extends DocumentWithTracker {
  status: OrderStatus;
  tab: string;
  sentBy?: string;
  cancelledBy?: string;
  items: string[];
}

export interface OrderItem extends DocumentWithTracker {
  quantity: number;
  price: number;
  total: number;
  order: string;
  item: string;
  modifiers: string[];
}

export enum PaymentMethod {
  cash = "cash",
  card = "card",
  mixed = "mixed",
}
export interface Payment extends DocumentWithTracker {
  tab: string;
  method: PaymentMethod;
  amountCash: number;
  amountCard: number;
  total: number;
}

export interface Printer extends Document {
  name: string;
  identitifier: string;
  categories: string[];
  users: string[];
  tabs: string[];
  tables: string[];
  isActive: boolean;
  onFallback: string;
}
