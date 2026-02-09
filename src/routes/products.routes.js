const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const {
  createProductValidator,
  updateProductValidator,
  productIdValidator
} = require('../validators/product.validator');

const upload = require('../middlewares/upload.middleware');
const { uploadMultipleImages } = require('../services/supabase-storage.service');

// Public routes
router.get('/', productsController.getAllProducts);
router.get('/:id', validate(productIdValidator), productsController.getProductById);

// Admin routes
router.post(
  '/',
  authenticateAdmin,
  upload.array('images', 10),
  async (req, res, next) => {
    try {
      if (req.files && req.files.length > 0) {
        // Upload images to Supabase Storage
        const imageUrls = await uploadMultipleImages(req.files, 'products');

        // First image becomes the main image
        req.body.image = imageUrls[0];

        // All images become gallery images
        req.body.images = JSON.stringify(imageUrls);
      }
      next();
    } catch (error) {
      console.error('Error uploading images:', error);
      return res.status(500).json({
        message: 'Failed to upload images',
        error: error.message
      });
    }
  },
  validate(createProductValidator),
  productsController.createProduct
);


router.put(
  '/:id',
  authenticateAdmin,
  upload.array('images', 10),
  async (req, res, next) => {
    try {
      if (req.files && req.files.length > 0) {
        // Upload images to Supabase Storage
        const imageUrls = await uploadMultipleImages(req.files, 'products');

        // First image becomes the main image
        req.body.image = imageUrls[0];

        // All images become gallery images
        req.body.images = JSON.stringify(imageUrls);
      }
      next();
    } catch (error) {
      console.error('Error uploading images:', error);
      return res.status(500).json({
        message: 'Failed to upload images',
        error: error.message
      });
    }
  },
  validate(productIdValidator),
  validate(updateProductValidator),
  productsController.updateProduct
);

router.delete(
  '/:id',
  authenticateAdmin,
  validate(productIdValidator),
  productsController.deleteProduct
);

router.patch(
  '/:id/stock',
  authenticateAdmin,
  productsController.updateStock
);

module.exports = router;
