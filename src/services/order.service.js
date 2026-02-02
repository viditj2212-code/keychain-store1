const supabase = require('../config/supabase');
const logger = require('../utils/logger');
const { generateOrderNumber } = require('../utils/generateOrderNumber');

class OrderService {
  async validateStock(items) {
    try {
      const outOfStock = [];

      for (const item of items) {
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single();

        if (!product || product.stock < item.quantity) {
          outOfStock.push(item.name || item.id);
        }
      }

      return {
        valid: outOfStock.length === 0,
        outOfStock
      };
    } catch (error) {
      logger.error('Validate stock error:', error);
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      const orderNumber = generateOrderNumber();

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          customer_email: orderData.email,
          customer_phone: orderData.phone || null,
          customer_name: `${orderData.firstName} ${orderData.lastName}`,
          shipping_address: {
            firstName: orderData.firstName,
            lastName: orderData.lastName,
            address: orderData.address,
            city: orderData.city,
            state: orderData.state,
            zipCode: orderData.zipCode,
            country: orderData.country || 'United States'
          },
          items: orderData.items,
          subtotal: orderData.items.reduce((sum, item) => 
            sum + (item.salePrice || item.price) * item.quantity, 0
          ),
          tax: orderData.items.reduce((sum, item) => 
            sum + (item.salePrice || item.price) * item.quantity, 0
          ) * 0.08,
          shipping: orderData.items.reduce((sum, item) => 
            sum + (item.salePrice || item.price) * item.quantity, 0
          ) > 50 ? 0 : 5.99,
          total: this.calculateTotal(orderData.items),
          status: 'pending',
          payment_status: 'pending',
          user_id: orderData.userId || null
        }])
        .select()
        .single();

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to create order');
      }

      return this.formatOrder(data);
    } catch (error) {
      logger.error('Create order service error:', error);
      throw error;
    }
  }

  async updateProductStock(items) {
    try {
      for (const item of items) {
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single();

        if (product) {
          await supabase
            .from('products')
            .update({ 
              stock: product.stock - item.quantity,
              updated_at: new Date().toISOString()
            })
            .eq('id', item.id);
        }
      }
    } catch (error) {
      logger.error('Update product stock error:', error);
      // Don't throw - order is already created
    }
  }

  async getOrdersByUser(userId, options) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(options.offset, options.offset + options.limit - 1);

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch orders');
      }

      return data.map(order => this.formatOrder(order));
    } catch (error) {
      logger.error('Get orders by user error:', error);
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch order');
      }

      return this.formatOrder(data);
    } catch (error) {
      logger.error('Get order by ID error:', error);
      throw error;
    }
  }

  async getAllOrders(filters) {
    try {
      let query = supabase
        .from('orders')
        .select('*');

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.search) {
        query = query.or(`order_number.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%,customer_name.ilike.%${filters.search}%`);
      }

      query = query
        .order('created_at', { ascending: false })
        .range(filters.offset, filters.offset + filters.limit - 1);

      const { data, error } = await query;

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch orders');
      }

      return data.map(order => this.formatOrder(order));
    } catch (error) {
      logger.error('Get all orders error:', error);
      throw error;
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to update order status');
      }

      return this.formatOrder(data);
    } catch (error) {
      logger.error('Update order status error:', error);
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      // First mark the order as cancelled/refunded for auditability
      await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          payment_status: 'refunded',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to delete order');
      }

      return true;
    } catch (error) {
      logger.error('Delete order error:', error);
      throw error;
    }
  }

  calculateTotal(items) {
    const subtotal = items.reduce((sum, item) => 
      sum + (item.salePrice || item.price) * item.quantity, 0
    );
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  }

  formatOrder(order) {
    if (!order) return null;

    return {
      id: order.id,
      orderNumber: order.order_number,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      customerName: order.customer_name,
      shippingAddress: order.shipping_address,
      items: order.items,
      subtotal: parseFloat(order.subtotal),
      tax: parseFloat(order.tax),
      shipping: parseFloat(order.shipping),
      total: parseFloat(order.total),
      status: order.status,
      paymentStatus: order.payment_status,
      userId: order.user_id,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    };
  }
}

module.exports = new OrderService();
