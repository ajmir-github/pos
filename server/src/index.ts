import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
export type { ServerToClientEvents } from "./types";
import { corsOptions, Port } from "./constants";
import { appRouter, socketHandler } from "./controllers";
import { InferRouter } from "./utils/socketServer";
import getLocalIP from "./utils/getLocalIP";
export type * from "./database";

export type ClientToServerEvents = InferRouter<typeof appRouter>;

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
    port: Port,
    host,
  },
  () => {
    console.log(`Server is running at:`);
    console.log(`→ http://localhost:${Port}`);
    console.log(`→ http://${host}:${Port}`);
  }
);
