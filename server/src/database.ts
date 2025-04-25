import { PrismaClient } from "../database";
export type * from "../database";

export const database = new PrismaClient();
