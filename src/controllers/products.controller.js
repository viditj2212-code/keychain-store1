const productService = require('../services/product.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const {
        category,
        priceRange,
        sort,
        featured,
        limit,
        offset,
        search,
        lowStock,
        onSale,
        isNew
      } = req.query;

      const filters = {
        category: category && category !== 'All' ? category : null,
        priceRange,
        sort: sort || 'featured',
        featured: featured === 'true',
        limit: parseInt(limit) || 100,
        offset: parseInt(offset) || 0,
        search,
        lowStock: lowStock === 'true',
        onSale: onSale === 'true',
        isNew: isNew === 'true'
      };

      const products = await productService.getProducts(filters);

      return successResponse(res, products, 'Products retrieved successfully');
    } catch (error) {
      logger.error('Get all products error:', error);
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      if (!product) {
        return errorResponse(res, 'Product not found', 404);
      }

      return successResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
      logger.error('Get product by ID error:', error);
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const productData = req.body;

      const newProduct = await productService.createProduct(productData);

      logger.info(`Product created: ${newProduct.id}`);
      return successResponse(res, newProduct, 'Product created successfully', 201);
    } catch (error) {
      logger.error('Create product error:', error);
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedProduct = await productService.updateProduct(id, updateData);

      if (!updatedProduct) {
        return errorResponse(res, 'Product not found', 404);
      }

      logger.info(`Product updated: ${id}`);
      return successResponse(res, updatedProduct, 'Product updated successfully');
    } catch (error) {
      logger.error('Update product error:', error);
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await productService.deleteProduct(id);

      if (!deleted) {
        return errorResponse(res, 'Product not found', 404);
      }

      logger.info(`Product deleted: ${id}`);
      return successResponse(res, null, 'Product deleted successfully');
    } catch (error) {
      logger.error('Delete product error:', error);
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;

      if (typeof stock !== 'number' || stock < 0) {
        return errorResponse(res, 'Invalid stock value', 400);
      }

      const updatedProduct = await productService.updateStock(id, stock);

      if (!updatedProduct) {
        return errorResponse(res, 'Product not found', 404);
      }

      logger.info(`Stock updated for product: ${id}`);
      return successResponse(res, updatedProduct, 'Stock updated successfully');
    } catch (error) {
      logger.error('Update stock error:', error);
      next(error);
    }
  }
}

module.exports = new ProductsController();
