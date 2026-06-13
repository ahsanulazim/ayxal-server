import express from "express";
import { createCategory } from "../controller/category.controller.js";
const router = express.Router();

router.post("/create", createCategory);

export default router;
