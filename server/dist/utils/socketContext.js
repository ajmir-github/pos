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
exports.joinRouters = joinRouters;
exports.createRouter = createRouter;
exports.registerRouter = registerRouter;
exports.createContext = createContext;
const zod_1 = require("zod");
function joinRouters(...routers) {
    return routers.reduce((mainRouter, currentRouter) => {
        return Object.assign(Object.assign({}, mainRouter), currentRouter);
    }, {});
}
function createRouter(router) {
    return router;
}
function registerRouter(socket, router) {
    Object.entries(router).map(([path, handler]) => {
        socket.on(path, handler(socket));
    });
}
function createContext(contextBuilder) {
    // get context
    const getContext = (socket) => __awaiter(this, void 0, void 0, function* () {
        if (typeof contextBuilder === "function") {
            return yield contextBuilder(socket);
        }
        else {
            return contextBuilder;
        }
    });
    // use
    function use(middleware) {
        return createContext((socket) => __awaiter(this, void 0, void 0, function* () {
            const baseContext = yield getContext(socket);
            const extendedContext = yield middleware(baseContext, socket);
            return Object.assign(Object.assign({}, baseContext), extendedContext);
        }));
    }
    function resolve(resolver) {
        return (socket) => (callback) => __awaiter(this, void 0, void 0, function* () {
            // check callback func
            if (typeof callback !== "function")
                return socket.emit("error", {
                    message: "Callback is not a function",
                    type: "Unexpected",
                });
            // go ahead
            try {
                const context = yield getContext(socket);
                const output = yield resolver(context, socket);
                callback(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError)
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
        });
    }
    function resolveWithInput(inputValidator, resolver) {
        return (socket) => (input, callback) => __awaiter(this, void 0, void 0, function* () {
            // check callback func
            if (typeof callback !== "function")
                return socket.emit("error", {
                    message: "Callback is not a function",
                    type: "Unexpected",
                });
            // go ahead
            try {
                const context = yield getContext(socket);
                const validInput = inputValidator.parse(input);
                const output = yield resolver(validInput, context, socket);
                callback(output);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError)
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
        });
    }
    // done
    return {
        use,
        resolve,
        resolveWithInput,
    };
}
