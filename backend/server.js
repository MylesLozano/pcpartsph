// server.js
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Import the route files
import partRoutes from "./routes/partRoutes.js";

import { sql } from "./config/db.js";

dotenv.config();

if (!process.env.PORT) {
  throw new Error(
    "Environment variable PORT is not defined. Check your .env file."
  );
}

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));

// --- Your Route Definitions ---
app.use("/api/parts", partRoutes);

// --- Serving the React App (as is) ---
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

// --- Database Initialization and Server Start ---
async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS parts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          price DECIMAL(10, 2) NOT NULL,
          type VARCHAR(50) NOT NULL,
          retailer VARCHAR(100),
          specifications JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
