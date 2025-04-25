"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppRouter = createAppRouter;
exports.createRouter = createRouter;
exports.registerAppRouter = registerAppRouter;
exports.createContext = createContext;
function createAppRouter(...routers) {
    return routers.reduce((mainRouter, currentRouter) => {
        return Object.assign(Object.assign({}, mainRouter), currentRouter);
    }, {});
}
function createRouter(router) {
    return router;
}
function registerAppRouter(socket, router) {
    Object.entries(router).map(([path, handler]) => {
        socket.on(path, handler(socket));
    });
}
function createContext(contextBuilder) {
    // use
    function use(middleware) {
        return createContext((socket) => __awaiter(this, void 0, void 0, function* () {
            const baseContext = yield contextBuilder(socket);
            const extendedContext = yield middleware(baseContext, socket);
            return Object.assign(Object.assign({}, baseContext), extendedContext);
        }));
    }
    function resolve(resolver) {
        return (socket) => (callback) => __awaiter(this, void 0, void 0, function* () {
            const sendError = (message, type = "Unexpected") => socket.emit("error", {
                message,
                type,
            });
            // check callback func
            if (typeof callback !== "function")
                return sendError("Callback is not a function");
            // go ahead
            try {
                const context = yield contextBuilder(socket);
                const output = yield resolver(context, socket);
                callback(output);
            }
            catch (error) {
                return sendError(error.message);
            }
        });
    }
    function resolveWithInput(resolver) {
        return (socket) => (input, callback) => __awaiter(this, void 0, void 0, function* () {
            const sendError = (message, type = "Unexpected") => socket.emit("error", {
                message,
                type,
            });
            // check callback func
            if (typeof callback !== "function")
                return sendError("Callback is not a function");
            // go ahead
            try {
                const context = yield contextBuilder(socket);
                const output = yield resolver(input, context, socket);
                callback(output);
            }
            catch (error) {
                return sendError(error.message);
            }
        });
    }
    // done
    return {
        use,
        resolve,
        resolveWithInput,
    };
}
