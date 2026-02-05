import express from 'express';
import { 
  getAllProducts, 
  getProductBySlug, 
  getRelatedProducts,
  getCategories 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:slug', getProductBySlug);
router.get('/:slug/related', getRelatedProducts);

export default router;
