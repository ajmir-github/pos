import { Db, MongoClient } from "mongodb";
import {
  UserCollection,
  TableCollection,
  TabCollection,
  OrderCollection,
  OrderItemCollection,
  PaymentCollection,
  ItemCollection,
  ModifierCollection,
  ModifierOptionCollection,
  CategoryCollection,
  ColorCollection,
  PrinterCollection,
} from "./types";

let db: Db;

export async function initDb(uri: string, dbName: string = "Dev") {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log("--- MongoDB connected:", dbName);
}

export function getDb(): Db {
  if (!db) throw new Error("+++ Database not initialized");
  return db;
}

export function getCollections() {
  const db = getDb();

  return {
    users: db.collection<UserCollection>("users"),
    items: db.collection<ItemCollection>("items"),
    modifiers: db.collection<ModifierCollection>("modifiers"),
    modifierOptions: db.collection<ModifierOptionCollection>("modifierOptions"),
    colors: db.collection<ColorCollection>("colors"),
    categories: db.collection<CategoryCollection>("categories"),
    printers: db.collection<PrinterCollection>("printers"),
    tables: db.collection<TableCollection>("tables"),
    tabs: db.collection<TabCollection>("tabs"),
    orders: db.collection<OrderCollection>("orders"),
    orderItems: db.collection<OrderItemCollection>("orderItems"),
    payments: db.collection<PaymentCollection>("payments"),
  };
}
