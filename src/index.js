import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "../route/user.route.js";
import productRouter from "../route/product.route.js";
import categoryRouter from "../route/category.route.js";
import { cjErrorHandler } from "../middleware/cjErrorHandler.js";
import { cjRateLimiter } from "../middleware/cjRateLimiter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", cjRateLimiter, productRouter);
app.use("/api/v1/categories", categoryRouter);

app.use(cjErrorHandler);
