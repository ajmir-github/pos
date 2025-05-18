import dotenv from "dotenv";
import path from "path";
import { CorsOptions } from "cors";

dotenv.config();

const {
  PORT,
  SECRET_KEY,
  ENV_MODE,
  DATABASE_URL,
  CLIENT_ORIGIN,
  DATABASE_NAME,
} = process.env;

export const Port = PORT || 4000;
export const SecertKey = SECRET_KEY || "SECRET_KEY";
export const EnvMode = ENV_MODE;
export const DevMode = EnvMode === "development";
export const DatabaseURL = DATABASE_URL as string;
export const DatabaseName = DATABASE_NAME || "Dev";
if (!DatabaseURL)
  throw new Error("Please provide databaseURL in environmental variables!");

export const corsOptions: CorsOptions = {
  origin: CLIENT_ORIGIN || "*",
  methods: "*",
};

export const ProjectDirectory = path.join(__dirname, "../");
export const PublicDirectory = path.join(ProjectDirectory, "public");
