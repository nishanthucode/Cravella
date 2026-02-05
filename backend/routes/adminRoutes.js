import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// ==========================================
// DASHBOARD STATS
// ==========================================
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ paymentStatus: 'paid' });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Recent orders
        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// PRODUCT MANAGEMENT (Admin Only)
// ==========================================

// Create new product with image upload
router.post('/products', protect, admin, upload.array('images', 5), async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price, // variants or base price
            stock,
            variants, // JSON string
            featured
        } = req.body;

        // Handle image paths
        const imagePaths = req.files ? req.files.map(file => `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${file.filename}`) : [];

        // Parse variants if sent as JSON string
        let parsedVariants = [];
        if (variants) {
            try {
                parsedVariants = JSON.parse(variants);
            } catch (e) {
                return res.status(400).json({ message: 'Invalid variants format' });
            }
        }

        // Determine slug
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const product = new Product({
            name,
            slug,
            description,
            category,
            images: imagePaths,
            featured: featured === 'true',
            variants: parsedVariants,
            // If no variants, use single variant or logic based on requirements
            // But assuming user wants robust variants
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product
router.put('/products/:id', protect, admin, upload.array('images', 5), async (req, res) => {
    try {
        const { name, description, category, featured, variants } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.category = category || product.category;
            product.featured = featured === 'true' ? true : (featured === 'false' ? false : product.featured);

            if (variants) {
                product.variants = JSON.parse(variants);
            }

            // Append new images if any
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${file.filename}`);
                product.images = [...product.images, ...newImages];
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
router.delete('/products/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne(); // or remove() depending on Mongoose version
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ORDER MANAGEMENT
// ==========================================
router.get('/orders', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.put('/orders/:id/deliver', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.status = 'delivered';

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// USER MANAGEMENT
// ==========================================
router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
