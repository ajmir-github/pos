import { SocketType } from "../types";
import { joinRouters, registerRouter } from "../utils/socketContext";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";

export const rootRouter = joinRouters(authRouter, userRouter);

export async function socketHandler(socket: SocketType) {
  socket.data = {
    auth: null,
  };

  // register all the routes
  registerRouter(socket, rootRouter);
}
