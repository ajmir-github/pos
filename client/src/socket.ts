import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../server/src";
import { getLocalToken } from "./utils/localToken";

const ServerURL = import.meta.env.VITE_SERVER || "http://192.168.14.209:4000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  ServerURL,
  {
    reconnection: false,
    auth(cb) {
      cb({ token: getLocalToken() });
    },
  }
);

export default socket;
