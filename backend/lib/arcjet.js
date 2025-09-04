import { Arcjet } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

export const aj = new Arcjet({
  key: process.env.ARCJET_KEY || "aj_dev_...",
});
