import client from "../db/db.js";

export const userCollection = client.db("pretypet").collection("users")
await userCollection.createIndex({ email: 1 }, { unique: true })

export const productCollection = client.db("pretypet").collection("products")