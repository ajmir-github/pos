import { Document, WithId, ObjectId } from "mongodb";

type Doc = WithId<Document>;
type DocWithTracker = Doc & {
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export enum UserRole {
  admin = "admin",
  manager = "manager",
  cashier = "cashier",
  waiter = "waiter",
  kitchen = "kitchen",
}

export interface UserCollection extends Doc {
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface ColorCollection extends Doc {
  name: string;
  class: string;
}

export interface CategoryCollection extends Doc {
  name: string;
  level: number;
  subCategories: CategoryCollection[];
}

export interface ModifierOptionCollection extends Doc {
  name: string;
  price: number;
}

export interface ModifierCollection extends Doc {
  name: string;
  multiple: boolean;
  required: boolean;
  options: ObjectId[];
}

export interface ItemCollection extends Doc {
  name: string;
  price: number;
  color: ObjectId;
  category: ObjectId;
}

enum DiscountType {
  unset = "unset",
  fixed = "fixed",
  percentage = "percentage",
}

enum TableStatus {
  open = "open",
  closed = "closed",
  paying = "paying",
}

export interface TableCollection extends DocWithTracker {
  number: number;
  status: TableStatus;
  discount?: {
    type: DiscountType;
    value: number;
  };
  total: number;
  tabs: ObjectId[];
}

export interface TabCollection extends DocWithTracker {
  number: number;
  description?: string;
  total: number;
  discount?: {
    type: DiscountType;
    value: number;
  };
  orders: ObjectId[];
}

enum OrderStatus {
  drafted = "drafted",
  sent = "sent",
  cancelled = "cancelled",
}

export interface OrderCollection extends DocWithTracker {
  status: OrderStatus;
  tab: ObjectId;
  sentBy?: ObjectId;
  cancelledBy?: ObjectId;
  items: ObjectId[];
}

export interface OrderItemCollection extends DocWithTracker {
  quantity: number;
  price: number;
  total: number;
  order: ObjectId;
  item: ObjectId;
  modifiers: ObjectId[];
}

export enum PaymentMethod {
  cash = "cash",
  card = "card",
  mixed = "mixed",
}
export interface PaymentCollection extends DocWithTracker {
  tab: ObjectId;
  method: PaymentMethod;
  amountCash: number;
  amountCard: number;
  total: number;
}

export interface PrinterCollection extends Doc {
  name: string;
  identitifier: string;
  categories: ObjectId[];
  users: ObjectId[];
  tabs: ObjectId[];
  tables: ObjectId[];
  isActive: boolean;
  onFallback: ObjectId;
}
