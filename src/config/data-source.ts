import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "webz",
  synchronize: false,
  logging: true,
  entities: ["dist/entity/*.js"], // Ensure this matches the compiled entity files
  migrations: ["dist/migration/*.js"], // Ensure this matches the compiled migration files
  subscribers: [],
});
