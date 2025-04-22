import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
export type { ServerToClientEvents } from "./types";
import { corsOptions, env } from "./constants";
import { socketHandler, rootRouter } from "./controllers";
import { InferRouter } from "./utils/socketContext";
import getLocalIP from "./utils/getLocalIP";
export type * from "./prisma";

export type ClientToServerEvents = InferRouter<typeof rootRouter>;

const app = express();
app.use(cors(corsOptions));
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", socketHandler);

// const host = "192.168.14.209";
const host = getLocalIP(); // localhost and local IP Address

httpServer.listen(
  {
    port: env.PORT,
    host,
  },
  () => {
    console.log(`Server is running at:`);
    console.log(`→ http://localhost:${env.PORT}`);
    console.log(`→ http://${host}:${env.PORT}`);
  }
);
