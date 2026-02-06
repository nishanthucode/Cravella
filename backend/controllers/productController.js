import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    if (category) query.category = category;

    if (search) {
      query.$text = { $search: search };
    }

    if (minPrice || maxPrice) {
      query['variants.price'] = {};
      if (minPrice) query['variants.price'].$gte = Number(minPrice);
      if (maxPrice) query['variants.price'].$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else if (sort) sortOption = sort;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Fetch related products from same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(5);

    // Add related products to response
    const productWithRelated = product.toObject();
    productWithRelated.relatedProducts = relatedProducts;

    res.json({
      success: true,
      product: productWithRelated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.json({
      success: true,
      products: relatedProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
