import { ObjectId } from "mongodb";

interface Document<Id = ObjectId> {
  _id: Id;
  deletedAt?: Date;
}
interface DocumentWithTracker<Id = ObjectId> extends Document<Id> {
  createdBy: Id;
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

export interface User<Id = ObjectId> extends Document<Id> {
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  deletedAt?: Date;
}

export interface Color<Id = ObjectId> extends Document<Id> {
  name: string;
  class: string;
}

export interface Category<Id = ObjectId> extends Document<Id> {
  name: string;
  order?: number;
}

export interface ModifierOption<Id = ObjectId> extends Document<Id> {
  name: string;
  price: number;
}

export interface Modifier<Id = ObjectId> extends Document<Id> {
  name: string;
  multiple: boolean;
  required: boolean;
  options: Id[];
}

export interface Item<Id = ObjectId> extends Document<Id> {
  name: string;
  price: number;
  color: Id;
  category: Id;
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

export interface Table<Id = ObjectId> extends DocumentWithTracker<Id> {
  number: number;
  status: TableStatus;
  discount?: {
    type: DiscountType;
    value: number;
  };
  total: number;
  tabs: Id[];
}

export interface Tab<Id = ObjectId> extends DocumentWithTracker<Id> {
  number: number;
  description?: string;
  total: number;
  discount?: {
    type: DiscountType;
    value: number;
  };
  orders: Id[];
}

enum OrderStatus {
  drafted = "drafted",
  sent = "sent",
  cancelled = "cancelled",
}

export interface Order<Id = ObjectId> extends DocumentWithTracker<Id> {
  status: OrderStatus;
  tab: Id;
  sentBy?: Id;
  cancelledBy?: Id;
  items: Id[];
}

export interface OrderItem<Id = ObjectId> extends DocumentWithTracker<Id> {
  quantity: number;
  price: number;
  total: number;
  order: Id;
  item: Id;
  modifiers: Id[];
}

export enum PaymentMethod {
  cash = "cash",
  card = "card",
  mixed = "mixed",
}
export interface Payment<Id = ObjectId> extends DocumentWithTracker<Id> {
  tab: Id;
  method: PaymentMethod;
  amountCash: number;
  amountCard: number;
  total: number;
}

export interface Printer<Id = ObjectId> extends Document<Id> {
  name: string;
  identitifier: string;
  categories: Id[];
  users: Id[];
  tabs: Id[];
  tables: Id[];
  isActive: boolean;
  onFallback: Id;
}
