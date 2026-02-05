import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name slug images variants'
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId, quantity = 1 } = req.body;

    if (!productId || !variantId) {
      return res.status(400).json({
        success: false,
        message: 'Product and variant required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({
        success: false,
        message: 'Variant not found'
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        variantId,
        quantity,
        price: variant.price
      });
    }

    cart.calculateTotal();
    await cart.save();

    await cart.populate({
      path: 'items.product',
      select: 'name slug images variants'
    });

    res.json({
      success: true,
      cart,
      message: 'Added to cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, variantId, quantity } = req.body;

    if (!productId || !variantId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product, variant and quantity required'
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      cart.calculateTotal();
      await cart.save();

      await cart.populate({
        path: 'items.product',
        select: 'name slug images variants'
      });

      res.json({
        success: true,
        cart
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, variantId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      item => !(item.product.toString() === productId &&
        item.variantId.toString() === variantId)
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.calculateTotal();
    await cart.save();

    await cart.populate({
      path: 'items.product',
      select: 'name slug images variants'
    });

    res.json({
      success: true,
      cart,
      message: 'Item removed from cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
