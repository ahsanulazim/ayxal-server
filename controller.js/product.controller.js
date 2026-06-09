import { productCollection } from "../collections/collection.js";
import cjApi from "../services/cjApiService.js";

export const cjGetProducts = async (req, res, next) => {
  try {
    const response = await cjApi.post("/product/list", {
      pageNum: 1,
      pageSize: 20,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching CJ products:", error);
    next(error);
  }
};

//cj product search
export const cjSearchProducts = async (req, res, next) => {
  try {
    const { keyword, pageNum = 1, pageSize = 20 } = req.query;
    const response = await cjApi.post("/product/listV2", { keyword, pageNum, pageSize });
    if (response.data.code !== 200) throw new Error(response.data.message);

    res.json({ success: true, products: response.data.data });
  } catch (error) {
    next(error);
  }
};

//cj product details
export const getCjProductDetails = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const response = await cjApi.get(`/product/query?pid=${productId}`);

    if (response.data.code !== 200) throw new Error(response.data.message);

    res.json({ success: true, product: response.data.data });
  } catch (error) {
    next(error);
  }
};

// ➕ Add Product to Store
export const addProductToStore = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const response = await cjApi.get(`/product/query?pid=${productId}`);

    if (response.data.code !== 200) throw new Error(response.data.message);

    const product = response.data.data;

    await productCollection.updateOne(
      { productId: product.productId },
      { $set: product },
      { upsert: true }
    );

    // Sync with CJ "Add to My Product"
    const cjResponse = await cjApi.post("/myCJProduct/add", { productId });
    if (cjResponse.data.code !== 200) throw new Error(cjResponse.data.message);

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ❌ Delete Product from Store
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await productCollection.deleteOne({ productId });

    if (result.deletedCount === 0) throw new Error("Product not found");

    // Sync with CJ "Delete Product"
    const cjResponse = await cjApi.post("/myCJProduct/delete", { productId });
    if (cjResponse.data.code !== 200) throw new Error(cjResponse.data.message);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};