import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

router.get("/:id", asyncHandler(async (req, res) => {
    const productId = req.params.id;

    console.log("Product ID:", productId);

    if (!productId) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = await Product.findById(productId);

    if (product) {
        return res.json(product);
    }

    res.status(404).json({
        message: "Product not found"
    });
}));


export default router;
