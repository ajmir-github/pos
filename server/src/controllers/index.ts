import { SocketType } from "../types";
import { createAppRouter, registerAppRouter } from "../utils/socketServer";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";
import { tabRouter } from "./tabRouter";

export const appRouter = createAppRouter(authRouter, userRouter, tabRouter);

export async function socketHandler(socket: SocketType) {
  socket.data = {
    auth: null,
  };

  // register all the routes
  registerAppRouter(socket, appRouter);
}
