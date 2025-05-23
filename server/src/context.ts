import { createContext } from "./utils/socketServer";
import jwt from "jsonwebtoken";
import { SecertKey } from "./constants";
import { User } from "./services";

export const baseContext = createContext((socket) => {
  return {
    getVerifiedToken() {
      const token = socket.handshake.auth.token;
      if (!token) return null;
      return jwt.verify(token, SecertKey) as { id: number };
    },
    getAuth() {
      return socket.data.auth || null;
    },
    setAuth(auth: User) {
      socket.data.auth = auth;
    },
    clearAuth() {
      socket.data.auth = null;
    },
  };
});
