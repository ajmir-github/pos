import { PrismaClient } from "./prisma";
export type * from "./prisma";

export const database = new PrismaClient();
