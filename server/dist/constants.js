"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicImageDirectory = exports.corsOptions = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = __importDefault(require("zod"));
dotenv_1.default.config();
exports.env = zod_1.default
    .object({
    PORT: zod_1.default.string().length(4).default("3000"),
    DATABASE_URL: zod_1.default.string(),
    SECRET_KEY: zod_1.default.string().min(6).default("SECRET_KEY"),
    ENV_MODE: zod_1.default.enum(["development", "production"]).default("development"),
})
    .parse(process.env);
exports.corsOptions = {
    origin: "*",
    methods: "*",
};
exports.PublicImageDirectory = path_1.default.join(__dirname, "../", "public", "images");
