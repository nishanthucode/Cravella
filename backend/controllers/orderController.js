import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const generateOrderNumber = () => {
  return 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
};

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || 
        !shippingAddress.line1 || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.pincode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Complete shipping address required' 
      });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Validate stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      const variant = product.variants.id(item.variantId);
      
      if (variant.stock < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${product.name} - ${variant.name}` 
        });
      }
    }

    const orderItems = cart.items.map(item => {
      const variant = item.product.variants.id(item.variantId);
      return {
        product: item.product._id,
        variantId: item.variantId,
        variantName: variant.name,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price
      };
    });

    const order = await Order.create({
      user: req.user._id,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      total: cart.total,
      shippingAddress,
      paymentStatus: 'paid'
    });

    // Update stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      const variant = product.variants.id(item.variantId);
      variant.stock -= item.quantity;
      await product.save();
    }

    // Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      order,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images')
      .sort('-createdAt');

    res.json({ 
      success: true, 
      orders 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    }).populate('items.product', 'name images');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    res.json({ 
      success: true, 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
