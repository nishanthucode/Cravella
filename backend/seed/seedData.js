import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const seedProducts = [
  {
    name: 'White Chocolate Fantasy Wedding Cake 2 kg',
    slug: 'white-chocolate-fantasy-wedding-cake-2kg',
    description: 'Elegant white chocolate wedding cake perfect for your special day',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop'],
    featured: true,
    variants: [
      { name: '2 kg', price: 2000, originalPrice: 2100, stock: 10, sku: 'WCF-2KG', attributes: { weight: '2 kg' }, images: ['https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop'] }
    ]
  },
  {
    name: 'Divian Curious Cake',
    slug: 'divian-curious-cake',
    description: 'Rich chocolate cake with unique flavors',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop'],
    featured: true,
    variants: [
      { name: 'Regular', price: 2100, originalPrice: 2200, stock: 15, sku: 'DCC-REG', attributes: { size: 'Regular' }, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop'] }
    ]
  },
  {
    name: 'Classic New York Cheesecake',
    slug: 'classic-new-york-cheesecake',
    description: 'Creamy and smooth New York style cheesecake',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=800&fit=crop'],
    featured: true,
    variants: [
      { name: 'Regular', price: 1400, originalPrice: 1500, stock: 20, sku: 'NYC-REG', attributes: { size: 'Regular' }, images: ['https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=800&fit=crop'] }
    ]
  },
  {
    name: 'Fruit Overload Cake Half kg',
    slug: 'fruit-overload-cake-half-kg',
    description: 'Delicious cake loaded with fresh fruits',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop'],
    featured: true,
    variants: [
      { name: 'Half kg', price: 700, originalPrice: 750, stock: 25, sku: 'FOC-HALF', attributes: { weight: 'Half kg' }, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop'] }
    ]
  },
  {
    name: 'Cute Santa Pineapple Photo Cake',
    slug: 'cute-santa-pineapple-photo-cake',
    description: 'Festive photo cake with Santa design',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&h=800&fit=crop'],
    featured: true,
    variants: [
      { name: 'Regular', price: 670, originalPrice: 720, stock: 30, sku: 'CSP-REG', attributes: { size: 'Regular' }, images: ['https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&h=800&fit=crop'] }
    ]
  },
  {
    name: 'Strawberry Cake',
    slug: 'strawberry-cake',
    description: 'Fresh strawberry cake with cream frosting',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'],
    featured: true,
    variants: [
      { name: '500g', price: 550, stock: 15, sku: 'STC-500', attributes: { weight: '500g' }, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'] },
      { name: '1kg', price: 1000, stock: 12, sku: 'STC-1K', attributes: { weight: '1kg' }, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'] },
      { name: '2kg', price: 1900, stock: 6, sku: 'STC-2K', attributes: { weight: '2kg' }, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'] }
    ]
  },
  {
    name: 'Butterscotch Cake',
    slug: 'butterscotch-cake',
    description: 'Delicious butterscotch flavored cake with crunchy toppings',
    category: 'Cakes',
    images: ['https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop&q=80'],
    featured: false,
    variants: [
      { name: '500g', price: 420, stock: 18, sku: 'BSC-500', attributes: { weight: '500g' }, images: ['https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop&q=80'] },
      { name: '1kg', price: 800, stock: 14, sku: 'BSC-1K', attributes: { weight: '1kg' }, images: ['https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop&q=80'] }
    ]
  },
  {
    name: 'Chocolate Éclair',
    slug: 'chocolate-eclair',
    description: 'Classic French pastry filled with cream and chocolate glaze',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'],
    featured: true,
    variants: [
      { name: 'Single', price: 80, stock: 50, sku: 'CE-S', attributes: { size: 'Single' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] },
      { name: 'Pack of 4', price: 300, stock: 30, sku: 'CE-P4', attributes: { size: 'Pack of 4' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] },
      { name: 'Pack of 6', price: 420, stock: 20, sku: 'CE-P6', attributes: { size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] }
    ]
  },
  {
    name: 'Croissant',
    slug: 'croissant',
    description: 'Buttery, flaky French croissant baked fresh daily',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'],
    featured: true,
    variants: [
      { name: 'Plain', price: 60, stock: 40, sku: 'CR-PL', attributes: { flavor: 'Plain' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] },
      { name: 'Chocolate', price: 80, stock: 35, sku: 'CR-CH', attributes: { flavor: 'Chocolate' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] },
      { name: 'Almond', price: 90, stock: 30, sku: 'CR-AL', attributes: { flavor: 'Almond' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] }
    ]
  },
  {
    name: 'Danish Pastry',
    slug: 'danish-pastry',
    description: 'Sweet layered pastry with fruit and cream cheese filling',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500'],
    featured: false,
    variants: [
      { name: 'Apple', price: 70, stock: 25, sku: 'DP-AP', attributes: { flavor: 'Apple' }, images: ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500'] },
      { name: 'Blueberry', price: 75, stock: 20, sku: 'DP-BL', attributes: { flavor: 'Blueberry' }, images: ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500'] },
      { name: 'Cheese', price: 80, stock: 22, sku: 'DP-CH', attributes: { flavor: 'Cheese' }, images: ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=500'] }
    ]
  },
  {
    name: 'Puff Pastry',
    slug: 'puff-pastry',
    description: 'Crispy puff pastry with various fillings',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&h=800&fit=crop&q=80'],
    featured: false,
    variants: [
      { name: 'Vegetable', price: 50, stock: 35, sku: 'PP-VG', attributes: { type: 'Vegetable' }, images: ['https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&h=800&fit=crop&q=80'] },
      { name: 'Chicken', price: 70, stock: 30, sku: 'PP-CK', attributes: { type: 'Chicken' }, images: ['https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&h=800&fit=crop&q=80'] },
      { name: 'Paneer', price: 65, stock: 28, sku: 'PP-PN', attributes: { type: 'Paneer' }, images: ['https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&h=800&fit=crop&q=80'] }
    ]
  },
  {
    name: 'Chocolate Mousse',
    slug: 'chocolate-mousse',
    description: 'Silky smooth chocolate mousse dessert',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1541599468348-e96984315921?w=500'],
    featured: true,
    variants: [
      { name: 'Small (100g)', price: 120, stock: 30, sku: 'CM-SM', attributes: { size: 'Small' }, images: ['https://images.unsplash.com/photo-1541599468348-e96984315921?w=500'] },
      { name: 'Medium (200g)', price: 220, stock: 25, sku: 'CM-MD', attributes: { size: 'Medium' }, images: ['https://images.unsplash.com/photo-1541599468348-e96984315921?w=500'] },
      { name: 'Large (300g)', price: 300, stock: 15, sku: 'CM-LG', attributes: { size: 'Large' }, images: ['https://images.unsplash.com/photo-1541599468348-e96984315921?w=500'] }
    ]
  },
  {
    name: 'Tiramisu',
    slug: 'tiramisu',
    description: 'Italian coffee-flavored dessert with mascarpone',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'],
    featured: true,
    variants: [
      { name: 'Small Cup', price: 150, stock: 20, sku: 'TM-SM', attributes: { size: 'Small' }, images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'] },
      { name: 'Large Cup', price: 280, stock: 15, sku: 'TM-LG', attributes: { size: 'Large' }, images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'] }
    ]
  },
  {
    name: 'Cheesecake',
    slug: 'cheesecake',
    description: 'Creamy New York style cheesecake',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&h=800&fit=crop&q=80'],
    featured: true,
    variants: [
      { name: 'Plain Slice', price: 180, stock: 25, sku: 'CK-PL', attributes: { flavor: 'Plain' }, images: ['https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&h=800&fit=crop&q=80'] },
      { name: 'Blueberry Slice', price: 200, stock: 20, sku: 'CK-BL', attributes: { flavor: 'Blueberry' }, images: ['https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&h=800&fit=crop&q=80'] },
      { name: 'Strawberry Slice', price: 200, stock: 18, sku: 'CK-ST', attributes: { flavor: 'Strawberry' }, images: ['https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&h=800&fit=crop&q=80'] }
    ]
  },
  {
    name: 'Brownie',
    slug: 'brownie',
    description: 'Fudgy chocolate brownies with walnuts',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500'],
    featured: false,
    variants: [
      { name: 'Single', price: 60, stock: 40, sku: 'BR-SG', attributes: { size: 'Single' }, images: ['https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500'] },
      { name: 'Pack of 4', price: 220, stock: 25, sku: 'BR-P4', attributes: { size: 'Pack of 4' }, images: ['https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500'] },
      { name: 'Pack of 6', price: 300, stock: 15, sku: 'BR-P6', attributes: { size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500'] }
    ]
  },
  {
    name: 'Cold Coffee',
    slug: 'cold-coffee',
    description: 'Refreshing iced coffee with cream',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500'],
    featured: true,
    variants: [
      { name: 'Regular (250ml)', price: 100, stock: 50, sku: 'CC-RG', attributes: { size: 'Regular' }, images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500'] },
      { name: 'Large (400ml)', price: 150, stock: 40, sku: 'CC-LG', attributes: { size: 'Large' }, images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500'] }
    ]
  },
  {
    name: 'Fresh Juice',
    slug: 'fresh-juice',
    description: 'Freshly squeezed fruit juice',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500'],
    featured: true,
    variants: [
      { name: 'Orange (300ml)', price: 80, stock: 45, sku: 'FJ-OR', attributes: { flavor: 'Orange' }, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500'] },
      { name: 'Apple (300ml)', price: 90, stock: 40, sku: 'FJ-AP', attributes: { flavor: 'Apple' }, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500'] },
      { name: 'Watermelon (300ml)', price: 70, stock: 35, sku: 'FJ-WM', attributes: { flavor: 'Watermelon' }, images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500'] }
    ]
  },
  {
    name: 'Milkshake',
    slug: 'milkshake',
    description: 'Thick and creamy milkshake',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500'],
    featured: true,
    variants: [
      { name: 'Chocolate (300ml)', price: 120, stock: 30, sku: 'MS-CH', attributes: { flavor: 'Chocolate' }, images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500'] },
      { name: 'Vanilla (300ml)', price: 110, stock: 35, sku: 'MS-VN', attributes: { flavor: 'Vanilla' }, images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500'] },
      { name: 'Strawberry (300ml)', price: 120, stock: 32, sku: 'MS-ST', attributes: { flavor: 'Strawberry' }, images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500'] }
    ]
  },
  {
    name: 'Smoothie Bowl',
    slug: 'smoothie-bowl',
    description: 'Healthy fruit smoothie bowl with toppings',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500'],
    featured: false,
    variants: [
      { name: 'Berry Blast', price: 200, stock: 20, sku: 'SB-BB', attributes: { flavor: 'Berry' }, images: ['https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500'] },
      { name: 'Tropical', price: 210, stock: 18, sku: 'SB-TR', attributes: { flavor: 'Tropical' }, images: ['https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500'] }
    ]
  },
  {
    name: 'Cookies',
    slug: 'cookies',
    description: 'Freshly baked cookies',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'],
    featured: true,
    variants: [
      { name: 'Chocolate Chip (100g)', price: 80, stock: 50, sku: 'CK-CC', attributes: { flavor: 'Chocolate Chip' }, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'] },
      { name: 'Oatmeal (100g)', price: 70, stock: 45, sku: 'CK-OT', attributes: { flavor: 'Oatmeal' }, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'] },
      { name: 'Sugar (100g)', price: 60, stock: 40, sku: 'CK-SG', attributes: { flavor: 'Sugar' }, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'] }
    ]
  },
  {
    name: 'Cupcakes',
    slug: 'cupcakes',
    description: 'Mini cupcakes with frosting',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1426869884541-df7117556757?w=500'],
    featured: true,
    variants: [
      { name: 'Vanilla (Pack of 6)', price: 240, stock: 25, sku: 'CP-VN6', attributes: { flavor: 'Vanilla', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1426869884541-df7117556757?w=500'] },
      { name: 'Chocolate (Pack of 6)', price: 260, stock: 22, sku: 'CP-CH6', attributes: { flavor: 'Chocolate', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1426869884541-df7117556757?w=500'] },
      { name: 'Red Velvet (Pack of 6)', price: 280, stock: 18, sku: 'CP-RV6', attributes: { flavor: 'Red Velvet', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1426869884541-df7117556757?w=500'] }
    ]
  },
  {
    name: 'Donut',
    slug: 'donut',
    description: 'Soft and fluffy donuts with glaze',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'],
    featured: true,
    variants: [
      { name: 'Glazed', price: 50, stock: 40, sku: 'DN-GL', attributes: { flavor: 'Glazed' }, images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'] },
      { name: 'Chocolate', price: 60, stock: 35, sku: 'DN-CH', attributes: { flavor: 'Chocolate' }, images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'] },
      { name: 'Strawberry', price: 60, stock: 30, sku: 'DN-ST', attributes: { flavor: 'Strawberry' }, images: ['https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500'] }
    ]
  },
  {
    name: 'Muffins',
    slug: 'muffins',
    description: 'Moist and delicious muffins',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500'],
    featured: false,
    variants: [
      { name: 'Blueberry', price: 70, stock: 30, sku: 'MF-BL', attributes: { flavor: 'Blueberry' }, images: ['https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500'] },
      { name: 'Chocolate', price: 75, stock: 28, sku: 'MF-CH', attributes: { flavor: 'Chocolate' }, images: ['https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500'] },
      { name: 'Banana', price: 65, stock: 32, sku: 'MF-BN', attributes: { flavor: 'Banana' }, images: ['https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500'] }
    ]
  },
  {
    name: 'Macaron',
    slug: 'macaron',
    description: 'French almond meringue cookies',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500'],
    featured: true,
    variants: [
      { name: 'Rose (Pack of 6)', price: 300, stock: 20, sku: 'MC-RS6', attributes: { flavor: 'Rose', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500'] },
      { name: 'Pistachio (Pack of 6)', price: 320, stock: 18, sku: 'MC-PS6', attributes: { flavor: 'Pistachio', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500'] },
      { name: 'Chocolate (Pack of 6)', price: 300, stock: 22, sku: 'MC-CH6', attributes: { flavor: 'Chocolate', size: 'Pack of 6' }, images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500'] }
    ]
  },
  {
    name: 'Ice Cream',
    slug: 'ice-cream',
    description: 'Premium ice cream in various flavors',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500'],
    featured: true,
    variants: [
      { name: 'Vanilla (500ml)', price: 200, stock: 30, sku: 'IC-VN', attributes: { flavor: 'Vanilla', size: '500ml' }, images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500'] },
      { name: 'Chocolate (500ml)', price: 220, stock: 28, sku: 'IC-CH', attributes: { flavor: 'Chocolate', size: '500ml' }, images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500'] },
      { name: 'Strawberry (500ml)', price: 220, stock: 25, sku: 'IC-ST', attributes: { flavor: 'Strawberry', size: '500ml' }, images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500'] },
      { name: 'Mango (500ml)', price: 240, stock: 22, sku: 'IC-MG', attributes: { flavor: 'Mango', size: '500ml' }, images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500'] }
    ]
  },
  {
    name: 'Fruit Tart',
    slug: 'fruit-tart',
    description: 'Buttery tart shell filled with custard and fresh fruits',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'],
    featured: true,
    variants: [
      { name: 'Small (4 inch)', price: 150, stock: 20, sku: 'FT-SM', attributes: { size: 'Small' }, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'] },
      { name: 'Medium (6 inch)', price: 280, stock: 15, sku: 'FT-MD', attributes: { size: 'Medium' }, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'] },
      { name: 'Large (8 inch)', price: 450, stock: 10, sku: 'FT-LG', attributes: { size: 'Large' }, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'] }
    ]
  },
  {
    name: 'Bagel',
    slug: 'bagel',
    description: 'Fresh baked bagels perfect for breakfast',
    category: 'Snacks',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'],
    featured: false,
    variants: [
      { name: 'Plain', price: 40, stock: 50, sku: 'BG-PL', attributes: { flavor: 'Plain' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] },
      { name: 'Sesame', price: 45, stock: 45, sku: 'BG-SS', attributes: { flavor: 'Sesame' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] },
      { name: 'Everything', price: 50, stock: 40, sku: 'BG-EV', attributes: { flavor: 'Everything' }, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500'] }
    ]
  },
  {
    name: 'Cinnamon Roll',
    slug: 'cinnamon-roll',
    description: 'Sweet cinnamon rolls with cream cheese frosting',
    category: 'Pastries',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'],
    featured: true,
    variants: [
      { name: 'Regular', price: 90, stock: 30, sku: 'CR-RG', attributes: { size: 'Regular' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] },
      { name: 'Large', price: 120, stock: 25, sku: 'CR-LG', attributes: { size: 'Large' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] },
      { name: 'Pack of 4', price: 320, stock: 15, sku: 'CR-P4', attributes: { size: 'Pack of 4' }, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'] }
    ]
  },
  {
    name: 'Waffle',
    slug: 'waffle',
    description: 'Crispy Belgian waffles with toppings',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=500'],
    featured: true,
    variants: [
      { name: 'Classic', price: 120, stock: 25, sku: 'WF-CL', attributes: { flavor: 'Classic' }, images: ['https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=500'] },
      { name: 'Chocolate', price: 150, stock: 20, sku: 'WF-CH', attributes: { flavor: 'Chocolate' }, images: ['https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=500'] },
      { name: 'Fruit & Cream', price: 180, stock: 18, sku: 'WF-FC', attributes: { flavor: 'Fruit & Cream' }, images: ['https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=500'] }
    ]
  },
  {
    name: 'Tea Collection',
    slug: 'tea-collection',
    description: 'Premium tea selection',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'],
    featured: false,
    variants: [
      { name: 'Green Tea', price: 60, stock: 40, sku: 'TC-GT', attributes: { flavor: 'Green Tea' }, images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'] },
      { name: 'Black Tea', price: 50, stock: 45, sku: 'TC-BT', attributes: { flavor: 'Black Tea' }, images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'] },
      { name: 'Herbal Tea', price: 70, stock: 35, sku: 'TC-HT', attributes: { flavor: 'Herbal Tea' }, images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500'] }
    ]
  },
  {
    name: 'Pancakes',
    slug: 'pancakes',
    description: 'Fluffy pancakes with maple syrup',
    category: 'Desserts',
    images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'],
    featured: false,
    variants: [
      { name: 'Classic (3 pcs)', price: 150, stock: 30, sku: 'PC-CL3', attributes: { flavor: 'Classic', quantity: '3 pcs' }, images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'] },
      { name: 'Blueberry (3 pcs)', price: 180, stock: 25, sku: 'PC-BL3', attributes: { flavor: 'Blueberry', quantity: '3 pcs' }, images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'] },
      { name: 'Chocolate Chip (3 pcs)', price: 180, stock: 22, sku: 'PC-CC3', attributes: { flavor: 'Chocolate Chip', quantity: '3 pcs' }, images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500'] }
    ]
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create products with related products
    const createdProducts = await Product.create(seedProducts);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Add related products (random selection)
    for (let product of createdProducts) {
      const relatedProducts = createdProducts
        .filter(p => p._id.toString() !== product._id.toString() && p.category === product.category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(p => p._id);

      product.relatedProducts = relatedProducts;
      await product.save();
    }

    // Create dummy user
    await User.create({
      name: 'Test User',
      email: 'test@cravella.com',
      password: 'password123',
      role: 'user'
    });

    console.log('✅ Created test user: test@cravella.com / password123');
    console.log('🎉 Seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
