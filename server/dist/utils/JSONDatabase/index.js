"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Mutate = exports.JSONFile = void 0;
const JSFile_1 = __importDefault(require("./JSFile"));
exports.JSONFile = JSFile_1.default;
const Mutate_1 = __importDefault(require("./Mutate"));
exports.Mutate = Mutate_1.default;
const Query_1 = __importDefault(require("./Query"));
exports.Query = Query_1.default;
