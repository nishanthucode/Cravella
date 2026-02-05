import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  images: [{
    type: String
  }],
  attributes: {
    type: Map,
    of: String
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Cakes', 'Pastries', 'Desserts', 'Beverages', 'Snacks']
  },
  images: [{
    type: String,
    required: true
  }],
  variants: [variantSchema],
  price: {
    type: Number,
    default: 0,
    index: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save hook to calculate min price
productSchema.pre('save', function (next) {
  if (this.variants && this.variants.length > 0) {
    const prices = this.variants.map(v => v.price);
    this.price = Math.min(...prices);
  }
  next();
});

// Virtual for price range
productSchema.virtual('priceRange').get(function () {
  if (!this.variants || this.variants.length === 0) {
    return { min: 0, max: 0 };
  }
  const prices = this.variants.map(v => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
