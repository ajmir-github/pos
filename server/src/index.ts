import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
export type { ServerToClientEvents } from "./types";
import { corsOptions, Port, DevMode } from "./constants";
import { appRouter, socketHandler } from "./controllers";
import { InferRouter } from "./utils/socketServer";
import getLocalIP from "./utils/getLocalIP";
import { database } from "./database";
export type * from "./database";

export type ClientToServerEvents = InferRouter<typeof appRouter>;

// express
const app = express();
app.use(cors(corsOptions));
app.get("/", async (req: Request, res: Response) => {
  if (req.query) console.log(req.query);
  const colors = await database.color.findMany();
  res.json(colors);
});

// socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", socketHandler);

// listen
// const host = "192.168.14.209";
if (DevMode) {
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
} else {
  httpServer.listen(Port, () => console.log("Server is running!"));
}
