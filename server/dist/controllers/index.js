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
exports.rootRouter = void 0;
exports.socketHandler = socketHandler;
const socketContext_1 = require("../utils/socketContext");
const userRouter_1 = require("./userRouter");
const authRouter_1 = require("./authRouter");
exports.rootRouter = (0, socketContext_1.joinRouters)(authRouter_1.authRouter, userRouter_1.userRouter);
function socketHandler(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.data = {
            auth: null,
        };
        // register all the routes
        (0, socketContext_1.registerRouter)(socket, exports.rootRouter);
    });
}
