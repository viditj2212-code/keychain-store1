const orderService = require('../services/order.service');
const emailService = require('../services/email.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class OrdersController {
  async createOrder(req, res, next) {
    try {
      const orderData = req.body;
      
      // Validate stock availability
      const stockCheck = await orderService.validateStock(orderData.items);
      if (!stockCheck.valid) {
        return errorResponse(
          res, 
          `Insufficient stock for: ${stockCheck.outOfStock.join(', ')}`, 
          400
        );
      }

      // Create order
      const newOrder = await orderService.createOrder(orderData);
      
      // Update product stock
      await orderService.updateProductStock(orderData.items);
      
      // Send confirmation email (async, don't wait)
      emailService.sendOrderConfirmation(newOrder).catch(err => {
        logger.error('Email send failed:', err);
      });

      logger.info(`Order created: ${newOrder.id}`);
      return successResponse(res, newOrder, 'Order placed successfully', 201);
    } catch (error) {
      logger.error('Create order error:', error);
      next(error);
    }
  }

  async getMyOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const { limit = 50, offset = 0 } = req.query;

      const orders = await orderService.getOrdersByUser(userId, {
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return successResponse(res, orders, 'Orders retrieved successfully');
    } catch (error) {
      logger.error('Get my orders error:', error);
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const order = await orderService.getOrderById(id);

      if (!order) {
        return errorResponse(res, 'Order not found', 404);
      }

      return successResponse(res, order, 'Order retrieved successfully');
    } catch (error) {
      logger.error('Get order by ID error:', error);
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const { status, limit = 100, offset = 0, search } = req.query;

      const filters = {
        status,
        limit: parseInt(limit),
        offset: parseInt(offset),
        search
      };

      const orders = await orderService.getAllOrders(filters);

      return successResponse(res, orders, 'Orders retrieved successfully');
    } catch (error) {
      logger.error('Get all orders error:', error);
      next(error);
    }
  }

  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedOrder = await orderService.updateOrderStatus(id, status);

      if (!updatedOrder) {
        return errorResponse(res, 'Order not found', 404);
      }

      // Send status update email
      emailService.sendOrderStatusUpdate(updatedOrder).catch(err => {
        logger.error('Email send failed:', err);
      });

      logger.info(`Order status updated: ${id} -> ${status}`);
      return successResponse(res, updatedOrder, 'Order status updated successfully');
    } catch (error) {
      logger.error('Update order status error:', error);
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await orderService.deleteOrder(id);

      if (!deleted) {
        return errorResponse(res, 'Order not found', 404);
      }

      logger.info(`Order deleted: ${id}`);
      return successResponse(res, null, 'Order deleted successfully');
    } catch (error) {
      logger.error('Delete order error:', error);
      next(error);
    }
  }
}

module.exports = new OrdersController();
