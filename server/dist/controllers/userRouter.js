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
exports.userRouter = void 0;
const database_1 = require("../database");
const context_1 = require("../context");
const socketServer_1 = require("../utils/socketServer");
const getUsers = context_1.baseContext.resolve(() => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.database.user.findMany();
    return {
        success: true,
        data: users,
    };
}));
exports.userRouter = (0, socketServer_1.createRouter)({
    getUsers,
});
