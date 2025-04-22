import { SocketType } from "../types";
import { ZodError, ZodSchema } from "zod";

type Response<Output> =
  | {
      success: true;
      data: Output;
    }
  | {
      success: false;
      error:
        | {
            message: string;
            type: "Unexpected" | "Authentication" | "Authorization";
            details?: string;
          }
        | {
            message: string;
            type: "Validation";
            errors: ZodError["errors"];
          };
    };

type AsyncFunc<T> = T | Promise<T>;
type ContextBuilder<Context> = (socket: SocketType) => AsyncFunc<Context>;
type Middleware<BaseContext, ExtendedContext> = (
  context: BaseContext,
  socket: SocketType
) => AsyncFunc<ExtendedContext>;

type Resolver<Context, Output> = (
  context: Context,
  socket: SocketType
) => AsyncFunc<Response<Output>>;
type ResolverWithInput<Context, Input, Output> = (
  input: Input,
  context: Context,
  socket: SocketType
) => AsyncFunc<Response<Output>>;

type ResolverFunc<Output> = (
  socket: SocketType
) => (callback: (output: Response<Output>) => void) => void;
type ResolverWithInputFunc<Input, Output> = (
  socket: SocketType
) => (input: Input, callback: (output: Response<Output>) => void) => void;

type Router = Record<
  string,
  ResolverFunc<any> | ResolverWithInputFunc<any, any>
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
export function joinRouters<Routers extends Router[]>(
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

export function registerRouter(socket: SocketType, router: Router) {
  Object.entries(router).map(([path, handler]) => {
    socket.on(path as any, handler(socket));
  });
}

export function createContext<BaseContext extends object>(
  contextBuilder: BaseContext | ContextBuilder<BaseContext>
) {
  // get context
  const getContext = async (socket: SocketType) => {
    if (typeof contextBuilder === "function") {
      return await contextBuilder(socket);
    } else {
      return contextBuilder;
    }
  };
  // use
  function use<ExtendedContext extends object>(
    middleware: Middleware<BaseContext, ExtendedContext>
  ) {
    return createContext<BaseContext & ExtendedContext>(async (socket) => {
      const baseContext = await getContext(socket);
      const extendedContext = await middleware(baseContext, socket);
      return {
        ...baseContext,
        ...extendedContext,
      };
    });
  }

  function resolve<Output>(
    resolver: Resolver<BaseContext, Output>
  ): ResolverFunc<Output> {
    return (socket: SocketType) =>
      async (callback: (output: Response<Output>) => void) => {
        // check callback func
        if (typeof callback !== "function")
          return socket.emit("error", {
            message: "Callback is not a function",
            type: "Unexpected",
          });
        // go ahead
        try {
          const context = await getContext(socket);
          const output = await resolver(context, socket);
          callback(output);
        } catch (error: any) {
          if (error instanceof ZodError)
            return callback({
              success: false,
              error: {
                message: "Invalid inputs!",
                type: "Validation",
                errors: error.errors,
              },
            });
          console.log(error); // only dev-mode

          callback({
            success: false,
            error: {
              message: error.message,
              type: "Unexpected",
            },
          });
        }
      };
  }

  function resolveWithInput<Input, Output>(
    inputValidator: ZodSchema<Input>,
    resolver: ResolverWithInput<BaseContext, Input, Output>
  ): ResolverWithInputFunc<Input, Output> {
    return (socket: SocketType) =>
      async (input: Input, callback: (output: Response<Output>) => void) => {
        // check callback func
        if (typeof callback !== "function")
          return socket.emit("error", {
            message: "Callback is not a function",
            type: "Unexpected",
          });
        // go ahead
        try {
          const context: BaseContext = await getContext(socket);
          const validInput = inputValidator.parse(input);
          const output: Response<Output> = await resolver(
            validInput,
            context,
            socket
          );
          callback(output);
        } catch (error: any) {
          if (error instanceof ZodError)
            return callback({
              success: false,
              error: {
                message: "Invalid inputs!",
                type: "Validation",
                errors: error.errors,
              },
            });
          console.log(error); // only dev-mode

          callback({
            success: false,
            error: {
              message: error.message,
              type: "Unexpected",
            },
          });
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
