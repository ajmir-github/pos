import { User } from "./database";
import { Socket } from "socket.io";

export interface ServerToClientEvents {
  ready: (auth: User | null, callback: () => void) => void;
  error: (error: {
    type: "Unexpected" | "Authetication" | "Authorization";
    message: string;
    details?: string;
  }) => void;
}

export interface ServerSideEvents {
  ping: () => void;
}

export interface SocketData {
  auth: User | null;
}

export type SocketType = Socket<
  any,
  ServerToClientEvents,
  ServerSideEvents,
  SocketData
>;
