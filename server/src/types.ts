import {
  EventCall,
  EventCallWithArg,
  EventCallWithArgAndAck,
} from "./utils/socketServer";
import { Category, Color, Item, Tab, User, Order, Payment } from "./database";
import { Socket } from "socket.io";

type Sync<Data> = EventCallWithArgAndAck<
  | {
      operation: "Created" | "updated";
      data: Data;
    }
  | {
      operation: "deleted";
      data: { id: number };
    },
  boolean
>;

export type ServerToClientEvents = {
  ping: EventCall;
  error: EventCallWithArg<{
    type: "Unexpected" | "Authetication" | "Authorization";
    message: string;
    details?: string;
  }>;
  auth: EventCallWithArg<User | null>;
  tab: Sync<Tab>;
  item: Sync<Item>;
  category: Sync<Category>;
  color: Sync<Color>;
  order: Sync<Order>;
  payment: Sync<Payment>;
};

export interface SocketData {
  auth: User | null;
}

export type SocketType = Socket<any, ServerToClientEvents, any, SocketData>;
