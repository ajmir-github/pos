"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicImageDirectory = exports.corsOptions = exports.ProdMode = exports.DevMode = exports.EnvMode = exports.SecertKey = exports.Port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.Port = process.env.PORT || 4000;
exports.SecertKey = process.env.SECRET_KEY || "SECRET_KEY";
exports.EnvMode = process.env.ENV_MODE;
exports.DevMode = exports.EnvMode === "development";
exports.ProdMode = exports.EnvMode === "production";
exports.corsOptions = {
    origin: "*",
    methods: "*",
};
exports.PublicImageDirectory = path_1.default.join(__dirname, "../", "public", "images");
