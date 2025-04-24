import dotenv from "dotenv";
import path from "path";
import z from "zod";
import { CorsOptions } from "cors";

dotenv.config();

export const env = z
  .object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string(),
    SECRET_KEY: z.string().min(6).default("SECRET_KEY"),
    ENV_MODE: z.enum(["development", "production"]).default("development"),
  })
  .parse(process.env);

export const corsOptions: CorsOptions = {
  origin: "*",
  methods: "*",
};

export const PublicImageDirectory = path.join(
  __dirname,
  "../",
  "public",
  "images"
);
