import { categoryCollection } from "../collections/collection.js";
import cloudinary from "../db/cloudinary.js";

export const createCategory = async (req, res) => {
  const { name, slug, thumbnail } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  let coverThumbnail;

  if (thumbnail) {
    const uploadThumbnail = await cloudinary.uploader.upload(thumbnail, {
      folder: "category",
    });
    coverThumbnail = uploadThumbnail?.secure_url || "";
  }

  const category = {
    name,
    slug,
    coverThumbnail,
    createdAt,
    updatedAt,
  };

  try {
    await categoryCollection.insertOne(category);
    res.status(201).json({ success: true, message: "Category is created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Ctegory creation Failed" });
  }
};
