import { PrismaClient } from "../prisma/src";
export type * from "../prisma/src";

export const database = new PrismaClient();
