import { Socket } from "socket.io";

// Events calls
export type EventCall = () => void;
export type EventCallWithArg<Arg = any> = (arg: Arg) => void;
export type EventCallWithAck<Ack = any> = (
  callback: (ack: Ack) => void
) => void;
export type EventCallWithArgAndAck<Arg = any, Ack = any> = (
  arg: Arg,
  callback: (ack: Ack) => void
) => void;
export type AnyEventCall =
  | EventCall
  | EventCallWithAck
  | EventCallWithArg
  | EventCallWithArgAndAck;
export type AnyEventCallObject = Record<string, AnyEventCall>;

type AsyncFunc<T> = T | Promise<T>;

type ContextBuilder<SocketType extends Socket, Context extends object> = (
  socket: SocketType
) => AsyncFunc<Context>;
type Middleware<
  SocketType extends Socket,
  BaseContext extends object,
  ExtendedContext extends object
> = (context: BaseContext, socket: SocketType) => AsyncFunc<ExtendedContext>;

type Resolver<SocketType extends Socket, Context extends object, Output> = (
  context: Context,
  socket: SocketType
) => AsyncFunc<Output>;
type ResolverWithInput<
  SocketType extends Socket,
  Context extends object,
  Input,
  Output
> = (input: Input, context: Context, socket: SocketType) => AsyncFunc<Output>;

type ResolverFunc<SocketType extends Socket, Output> = (
  socket: SocketType
) => EventCallWithAck<Output>;
type ResolverWithInputFunc<SocketType extends Socket, Input, Output> = (
  socket: SocketType
) => EventCallWithArgAndAck<Input, Output>;

type Router = Record<
  string,
  ResolverFunc<Socket, any> | ResolverWithInputFunc<Socket, any, any>
>;

export type InferRouter<T extends Router> = {
  [K in keyof T]: ReturnType<T[K]>;
};

type MergeRouters<T extends Router[]> = {
  [K in keyof UnionToIntersection<T[number]>]: UnionToIntersection<
    T[number]
  >[K];
};

// Utility to convert union to intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
export function createAppRouter<Routers extends Router[]>(
  ...routers: Routers
): MergeRouters<Routers> {
  return routers.reduce((mainRouter, currentRouter) => {
    return {
      ...mainRouter,
      ...currentRouter,
    };
  }, {} as any);
}

export function createRouter<DefinedRouter extends Router>(
  router: DefinedRouter
) {
  return router;
}

export function registerAppRouter<DSocket extends Socket>(
  socket: DSocket,
  router: Router
) {
  Object.entries(router).map(([path, handler]) => {
    socket.on(path as any, handler(socket));
  });
}

export function createContext<
  SocketType extends Socket,
  BaseContext extends object
>(contextBuilder: ContextBuilder<SocketType, BaseContext>) {
  // use
  function use<ExtendedContext extends object>(
    middleware: Middleware<SocketType, BaseContext, ExtendedContext>
  ) {
    return createContext<SocketType, BaseContext & ExtendedContext>(
      async (socket) => {
        const baseContext = await contextBuilder(socket);
        const extendedContext = await middleware(baseContext, socket);
        return {
          ...baseContext,
          ...extendedContext,
        };
      }
    );
  }

  function resolve<Output>(
    resolver: Resolver<SocketType, BaseContext, Output>
  ): ResolverFunc<SocketType, Output> {
    return (socket: SocketType): EventCallWithAck<Output> =>
      async (callback) => {
        const sendError = (message: string, type: string = "Unexpected") =>
          socket.emit("error", {
            message,
            type,
          });
        // check callback func
        if (typeof callback !== "function")
          return sendError("Callback is not a function");
        // go ahead
        try {
          const context = await contextBuilder(socket);
          const output = await resolver(context, socket);
          callback(output);
        } catch (error: any) {
          return sendError(error.message);
        }
      };
  }

  function resolveWithInput<Input, Output>(
    resolver: ResolverWithInput<SocketType, BaseContext, Input, Output>
  ): ResolverWithInputFunc<SocketType, Input, Output> {
    return (socket: SocketType): EventCallWithArgAndAck<Input, Output> =>
      async (input, callback) => {
        const sendError = (message: string, type: string = "Unexpected") =>
          socket.emit("error", {
            message,
            type,
          });
        // check callback func
        if (typeof callback !== "function")
          return sendError("Callback is not a function");

        // go ahead
        try {
          const context: BaseContext = await contextBuilder(socket);
          const output: Output = await resolver(input, context, socket);
          callback(output);
        } catch (error: any) {
          return sendError(error.message);
        }
      };
  }

  // done
  return {
    use,
    resolve,
    resolveWithInput,
  };
}
