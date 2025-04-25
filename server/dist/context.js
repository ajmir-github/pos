"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseContext = void 0;
const socketServer_1 = require("./utils/socketServer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
exports.baseContext = (0, socketServer_1.createContext)((socket) => {
    return {
        getVerifiedToken() {
            const token = socket.handshake.auth.token;
            if (!token)
                return null;
            return jsonwebtoken_1.default.verify(token, constants_1.SecertKey);
        },
        getAuth() {
            return socket.data.auth || null;
        },
        setAuth(auth) {
            socket.data.auth = auth;
        },
        clearAuth() {
            socket.data.auth = null;
        },
    };
});
