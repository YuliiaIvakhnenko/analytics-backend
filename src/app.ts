import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import depositInvestmentRoutes from "./routes/depositInvestmentRoutes";
import investmentRoutes from "./routes/investmentRoutes";
import priceHistoryRoutes from "./routes/priceHistoryRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import securityRoutes from "./routes/securityRoutes";
import depositProductRoutes from "./routes/depositeProductRoutes";

import { requireAuth, requireRole } from "./middlewares/auth";

// Swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.get("/", (req: Request, res: Response) => {
  res.send(" API is running");
});

// --- Swagger setup ---
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analytics API",
      version: "1.0.0",
      description: "Документація до API",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // шляхи до файлів з маршрутами для Swagger
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// --- Роутери ---
app.use("/api/auth", authRoutes);

app.use("/api/users", requireAuth, requireRole("admin"), userRoutes);
app.use("/api/clients", requireAuth, clientRoutes);
app.use("/api/securities", requireAuth, securityRoutes);
app.use("/api/price-history", requireAuth, priceHistoryRoutes);
app.use("/api/investments", requireAuth, investmentRoutes);
app.use("/api/deposit-products", requireAuth, depositProductRoutes);
app.use("/api/deposit-investments", requireAuth, depositInvestmentRoutes);
app.use("/api/recommendations", requireAuth, requireRole("analyst", "admin"), recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
