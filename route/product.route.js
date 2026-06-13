import express from "express";
import {
  addProductToStore,
  cjGetProducts,
  cjSearchProducts,
  deleteProduct,
  getAllStoreProducts,
  getCjProductDetails,
} from "../controller/product.controller.js";

const router = express.Router();

//routes
router.get("/cj/products", cjGetProducts);
router.get("/cj/search", cjSearchProducts);
router.get("/cj/product/:productId", getCjProductDetails);
router.get("/cj/getAllStoreProducts", getAllStoreProducts)
router.post("/add", addProductToStore);
router.delete("/delete/:productId", deleteProduct);

export default router;
