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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const database_1 = require("../database");
const context_1 = require("../context");
const socketServer_1 = require("../utils/socketServer");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
// get auth and cache it
const getAuth = context_1.baseContext.resolve((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.getVerifiedToken();
    if (!token)
        return {
            error: {
                type: "Authentication",
                message: "You are not signed in!",
            },
        };
    const user = yield database_1.database.user.findFirst({
        where: { id: token.id },
    });
    if (!user)
        return {
            error: {
                type: "Authentication",
                message: "This user does not exist anymore!",
            },
        };
    // cache and send it back
    ctx.setAuth(user);
    return {
        data: user,
    };
}));
// sign in
const signInValidation = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
});
const signIn = context_1.baseContext.resolveWithInput((inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = signInValidation.safeParse(inputs);
    if (!validation.success)
        return {
            error: validation.error.errors,
        };
    const user = yield database_1.database.user.findFirst({
        where: { username: validation.data.username },
    });
    if (!user)
        return {
            error: new zod_1.ZodError([
                {
                    path: ["username"],
                    code: "custom",
                    message: "Username not found!",
                },
            ]).errors,
        };
    const matched = bcryptjs_1.default.compareSync(validation.data.password, user.password);
    if (!matched)
        return {
            error: new zod_1.ZodError([
                {
                    path: ["password"],
                    code: "custom",
                    message: "Password not matched!",
                },
            ]).errors,
        };
    const token = jsonwebtoken_1.default.sign({ id: user.id }, constants_1.SecertKey);
    return {
        data: { token, user },
    };
}));
// sign out
const signOut = context_1.baseContext.resolve((context) => {
    return context.clearAuth();
});
exports.authRouter = (0, socketServer_1.createRouter)({
    getAuth,
    signIn,
    signOut,
});
