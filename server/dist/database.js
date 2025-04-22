"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const prisma_1 = require("./prisma");
exports.database = new prisma_1.PrismaClient();
