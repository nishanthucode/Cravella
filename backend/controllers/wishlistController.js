import User from '../models/User.js';
import Product from '../models/Product.js';

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      select: 'name slug images variants category'
    });

    res.json({ 
      success: true, 
      wishlist: user.wishlist 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID required' 
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    const user = await User.findById(req.user._id);
    const index = user.wishlist.indexOf(productId);

    let message;
    if (index > -1) {
      user.wishlist.splice(index, 1);
      message = 'Removed from wishlist';
    } else {
      user.wishlist.push(productId);
      message = 'Added to wishlist';
    }

    await user.save();

    await user.populate({
      path: 'wishlist',
      select: 'name slug images variants category'
    });

    res.json({ 
      success: true, 
      wishlist: user.wishlist,
      message 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
