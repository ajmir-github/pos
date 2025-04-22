"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const controllers_1 = require("./controllers");
const getLocalIP_1 = __importDefault(require("./utils/getLocalIP"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(constants_1.corsOptions));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: constants_1.corsOptions,
});
io.on("connection", controllers_1.socketHandler);
// const host = "192.168.14.209";
const host = (0, getLocalIP_1.default)(); // localhost and local IP Address
httpServer.listen({
    port: constants_1.env.PORT,
    host,
}, () => {
    console.log(`Server is running at:`);
    console.log(`→ http://localhost:${constants_1.env.PORT}`);
    console.log(`→ http://${host}:${constants_1.env.PORT}`);
});
