const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

// All admin routes require admin authentication
router.use(authenticateAdmin);

// Dashboard statistics
router.get('/dashboard/stats', adminController.getDashboardStats);

// Sales analytics
router.get('/analytics', adminController.getAnalytics);
router.get('/analytics/sales', adminController.getSalesAnalytics);

// Top products
router.get('/analytics/top-products', adminController.getTopProducts);

// Recent activities
router.get('/activities/recent', adminController.getRecentActivities);

module.exports = router;
