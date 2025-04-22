import { createContext } from "./utils/socketContext";
import { User } from "./database";
import jwt from "jsonwebtoken";
import { env } from "./constants";

export const baseContext = createContext((socket) => {
  return {
    getVerifiedToken() {
      const token = socket.handshake.auth.token;
      if (!token) return null;
      return jwt.verify(token, env.SECRET_KEY) as { id: number };
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
