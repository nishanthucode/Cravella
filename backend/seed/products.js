const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
    {
        name: 'White Chocolate Fantasy Wedding Cake 2 kg',
        slug: 'white-chocolate-fantasy-wedding-cake-2kg',
        description: 'Elegant white chocolate wedding cake perfect for your special day',
        category: 'Cakes',
        images: [
            'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop'
        ],
        variants: [
            {
                name: '2 kg',
                price: 2000,
                originalPrice: 2100,
                stock: 10,
                sku: 'WCF-2KG'
            }
        ],
        priceRange: {
            min: 2000,
            max: 2100
        },
        featured: true,
        tags: ['wedding', 'white chocolate', 'premium']
    },
    {
        name: 'Divian Curious Cake',
        slug: 'divian-curious-cake',
        description: 'Rich chocolate cake with unique flavors',
        category: 'Cakes',
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop'
        ],
        variants: [
            {
                name: 'Regular',
                price: 2100,
                originalPrice: 2200,
                stock: 15,
                sku: 'DCC-REG'
            }
        ],
        priceRange: {
            min: 2100,
            max: 2200
        },
        featured: true,
        tags: ['chocolate', 'premium']
    },
    {
        name: 'Classic New York Cheesecake',
        slug: 'classic-new-york-cheesecake',
        description: 'Creamy and smooth New York style cheesecake',
        category: 'Cakes',
        images: [
            'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=800&fit=crop'
        ],
        variants: [
            {
                name: 'Regular',
                price: 1400,
                originalPrice: 1500,
                stock: 20,
                sku: 'NYC-REG'
            }
        ],
        priceRange: {
            min: 1400,
            max: 1500
        },
        featured: true,
        tags: ['cheesecake', 'classic']
    },
    {
        name: 'Fruit Overload Cake Half kg',
        slug: 'fruit-overload-cake-half-kg',
        description: 'Delicious cake loaded with fresh fruits',
        category: 'Cakes',
        images: [
            'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop'
        ],
        variants: [
            {
                name: 'Half kg',
                price: 700,
                originalPrice: 750,
                stock: 25,
                sku: 'FOC-HALF'
            }
        ],
        priceRange: {
            min: 700,
            max: 750
        },
        featured: true,
        tags: ['fruit', 'fresh']
    },
    {
        name: 'Cute Santa Pineapple Photo Cake',
        slug: 'cute-santa-pineapple-photo-cake',
        description: 'Festive photo cake with Santa design',
        category: 'Cakes',
        images: [
            'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&h=800&fit=crop'
        ],
        variants: [
            {
                name: 'Regular',
                price: 670,
                originalPrice: 720,
                stock: 30,
                sku: 'CSP-REG'
            }
        ],
        priceRange: {
            min: 670,
            max: 720
        },
        featured: true,
        tags: ['christmas', 'photo cake', 'pineapple']
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('Products seeded successfully');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
