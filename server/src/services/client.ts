import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { DatabaseURL, DatabaseName } from "../constants";
import {
  Item,
  User,
  Category,
  Color,
  Modifier,
  ModifierOption,
  Order,
  OrderItem,
  Payment,
  Printer,
  Tab,
  Table,
} from "./types";

export const client = new MongoClient(DatabaseURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const database = client.db(DatabaseName);
export const collection = {
  users: database.collection<User<ObjectId>>("users"),
  items: database.collection<Item<ObjectId>>("items"),
  modifiers: database.collection<Modifier<ObjectId>>("modifiers"),
  modifierOptions:
    database.collection<ModifierOption<ObjectId>>("modifierOptions"),
  categories: database.collection<Category<ObjectId>>("categories"),
  printers: database.collection<Printer<ObjectId>>("printers"),
  tables: database.collection<Table<ObjectId>>("tables"),
  tabs: database.collection<Tab<ObjectId>>("tabs"),
  orders: database.collection<Order<ObjectId>>("orders"),
  orderItems: database.collection<OrderItem<ObjectId>>("orderItems"),
  payments: database.collection<Payment<ObjectId>>("payments"),
};
