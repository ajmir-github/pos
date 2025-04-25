import dotenv from "dotenv";
import path from "path";
import { CorsOptions } from "cors";

dotenv.config();

export const Port = process.env.PORT || 4000;
export const SecertKey = process.env.SECRET_KEY || "SECRET_KEY";
export const EnvMode = process.env.ENV_MODE || "development";

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
