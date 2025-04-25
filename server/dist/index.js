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
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const controllers_1 = require("./controllers");
const getLocalIP_1 = __importDefault(require("./utils/getLocalIP"));
const database_1 = require("./database");
// express
const app = (0, express_1.default)();
app.use((0, cors_1.default)(constants_1.corsOptions));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const colors = yield database_1.database.color.findMany();
    res.json(colors);
}));
// socket
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: constants_1.corsOptions,
});
io.on("connection", controllers_1.socketHandler);
// listen
// const host = "192.168.14.209";
if (constants_1.DevMode) {
    const host = (0, getLocalIP_1.default)(); // localhost and local IP Address
    httpServer.listen({
        port: constants_1.Port,
        host,
    }, () => {
        console.log(`Server is running at:`);
        console.log(`→ http://localhost:${constants_1.Port}`);
        console.log(`→ http://${host}:${constants_1.Port}`);
    });
}
else {
    httpServer.listen(constants_1.Port, () => console.log("Server is running!"));
}
