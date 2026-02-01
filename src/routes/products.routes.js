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

// Public routes
router.get('/', productsController.getAllProducts);
router.get('/:id', validate(productIdValidator), productsController.getProductById);

// Admin routes
router.post(
  '/',
  authenticateAdmin,
  upload.array('images', 10), // Allow up to 10 images
  (req, res, next) => {
    if (req.files && req.files.length > 0) {
      // First image becomes the main image
      req.body.image = `/images/${req.files[0].filename}`;

      // All images become gallery images
      const imageUrls = req.files.map(file => `/images/${file.filename}`);
      req.body.images = JSON.stringify(imageUrls);
    }
    next();
  },
  validate(createProductValidator),
  productsController.createProduct
);

router.put(
  '/:id',
  authenticateAdmin,
  upload.array('images', 10), // Allow up to 10 images
  (req, res, next) => {
    if (req.files && req.files.length > 0) {
      // First image becomes the main image
      req.body.image = `/images/${req.files[0].filename}`;

      // All images become gallery images
      const imageUrls = req.files.map(file => `/images/${file.filename}`);
      req.body.images = JSON.stringify(imageUrls);
    }
    next();
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
