const supabase = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class AdminController {
  async getDashboardStats(req, res, next) {
    try {
      // Total products
      const { count: totalProducts } = await supabase
        .from('products')
        .select('id', { count: 'exact' });

      // Total orders
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('id', { count: 'exact' });

      // Total revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total');

      const totalRevenue = orders?.reduce((sum, order) =>
        sum + (parseFloat(order.total) || 0), 0
      ) || 0;

      // Pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('status', 'pending');

      // Low stock products
      const { count: lowStockProducts } = await supabase
        .from('products')
        .select('id', { count: 'exact' })
        .lt('stock', 10);

      // Newsletter subscribers
      const { count: totalSubscribers } = await supabase
        .from('newsletter')
        .select('id', { count: 'exact' })
        .eq('is_active', true);

      // New messages
      const { count: newMessages } = await supabase
        .from('contact_messages')
        .select('id', { count: 'exact' })
        .eq('status', 'new');

      const stats = {
        totalProducts: totalProducts || 0,
        totalOrders: totalOrders || 0,
        totalRevenue: totalRevenue.toFixed(2),
        pendingOrders: pendingOrders || 0,
        lowStockProducts: lowStockProducts || 0,
        totalSubscribers: totalSubscribers || 0,
        newMessages: newMessages || 0
      };

      return successResponse(res, stats, 'Dashboard stats retrieved successfully');
    } catch (error) {
      logger.error('Get dashboard stats error:', error);
      next(error);
    }
  }

  async getSalesAnalytics(req, res, next) {
    try {
      const { period = '30d' } = req.query;

      let days = 30;
      if (period === '7d') days = 7;
      if (period === '90d') days = 90;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data: orders } = await supabase
        .from('orders')
        .select('created_at, total, status')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      // Group by date
      const salesByDate = {};
      orders?.forEach(order => {
        const date = order.created_at.split('T')[0];
        if (!salesByDate[date]) {
          salesByDate[date] = { date, revenue: 0, orders: 0 };
        }
        salesByDate[date].revenue += parseFloat(order.total);
        salesByDate[date].orders += 1;
      });

      const analytics = Object.values(salesByDate);

      return successResponse(res, analytics, 'Sales analytics retrieved successfully');
    } catch (error) {
      logger.error('Get sales analytics error:', error);
      next(error);
    }
  }

  async getTopProducts(req, res, next) {
    try {
      const { limit = 10 } = req.query;

      const { data: orders } = await supabase
        .from('orders')
        .select('items');

      // Count product sales
      const productSales = {};
      orders?.forEach(order => {
        order.items?.forEach(item => {
          if (!productSales[item.id]) {
            productSales[item.id] = {
              id: item.id,
              name: item.name,
              image: item.image,
              unitsSold: 0,
              revenue: 0
            };
          }
          productSales[item.id].unitsSold += item.quantity;
          productSales[item.id].revenue += (item.salePrice || item.price) * item.quantity;
        });
      });

      const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, parseInt(limit));

      return successResponse(res, topProducts, 'Top products retrieved successfully');
    } catch (error) {
      logger.error('Get top products error:', error);
      next(error);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      const { days = 30 } = req.query;
      const daysInt = parseInt(days);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysInt);

      // Get orders for the period
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Calculate metrics
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + parseFloat(order.total || 0), 0) || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Top products from orders
      const productSales = {};
      orders?.forEach(order => {
        order.items?.forEach(item => {
          if (!productSales[item.id]) {
            productSales[item.id] = {
              id: item.id,
              name: item.name,
              sales: 0,
              revenue: 0
            };
          }
          productSales[item.id].sales += item.quantity;
          productSales[item.id].revenue += (item.salePrice || item.price) * item.quantity;
        });
      });

      const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Top categories
      const categorySales = {};
      orders?.forEach(order => {
        order.items?.forEach(item => {
          const category = item.category || 'Uncategorized';
          if (!categorySales[category]) {
            categorySales[category] = {
              name: category,
              orders: 0,
              revenue: 0
            };
          }
          categorySales[category].orders += 1;
          categorySales[category].revenue += (item.salePrice || item.price) * item.quantity;
        });
      });

      const totalCategoryOrders = Object.values(categorySales).reduce((sum, cat) => sum + cat.orders, 0);
      const topCategories = Object.values(categorySales)
        .map(cat => ({
          ...cat,
          percentage: totalCategoryOrders > 0 ? cat.orders / totalCategoryOrders : 0
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Customer metrics (simplified - would need user tracking for accurate data)
      const uniqueEmails = new Set(orders?.map(o => o.customer_email) || []);
      const newCustomers = uniqueEmails.size;

      const analytics = {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        conversionRate: 0, // Would need visit tracking
        revenueChange: 0, // Would need previous period comparison
        orderChange: 0,
        aovChange: 0,
        conversionChange: 0,
        topProducts,
        topCategories,
        newCustomers,
        repeatCustomers: 0, // Would need user order history
        repeatRate: 0,
        cartAbandonmentRate: 0, // Would need cart tracking
        abandonedCarts: 0,
        totalVisits: 0, // Would need analytics integration
        totalUsers: newCustomers,
        bounceRate: 0,
        avgSessionDuration: 0
      };

      return successResponse(res, analytics, 'Analytics retrieved successfully');
    } catch (error) {
      logger.error('Get analytics error:', error);
      next(error);
    }
  }

  async getRecentActivities(req, res, next) {
    try {
      const { limit = 20 } = req.query;
      const halfLimit = Math.ceil(parseInt(limit) / 2);

      // Get recent orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, total, status, created_at')
        .order('created_at', { ascending: false })
        .limit(halfLimit);

      // Get recent messages
      const { data: recentMessages } = await supabase
        .from('contact_messages')
        .select('id, name, email, subject, status, created_at')
        .order('created_at', { ascending: false })
        .limit(halfLimit);

      // Combine and sort
      const activities = [
        ...(recentOrders || []).map(order => ({
          type: 'order',
          id: order.id,
          title: `New order from ${order.customer_name}`,
          description: `Order #${order.order_number} - $${order.total}`,
          status: order.status,
          timestamp: order.created_at
        })),
        ...(recentMessages || []).map(msg => ({
          type: 'message',
          id: msg.id,
          title: `Message from ${msg.name}`,
          description: msg.subject,
          status: msg.status,
          timestamp: msg.created_at
        }))
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, parseInt(limit));

      return successResponse(res, activities, 'Recent activities retrieved successfully');
    } catch (error) {
      logger.error('Get recent activities error:', error);
      next(error);
    }
  }
}

module.exports = new AdminController();
