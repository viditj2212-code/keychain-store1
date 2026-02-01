const supabase = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class NewsletterController {
  async subscribe(req, res, next) {
    try {
      const { email } = req.body;

      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter')
        .select('*')
        .eq('email', email)
        .single();

      if (existing) {
        if (existing.is_active) {
          return errorResponse(res, 'Email already subscribed', 409);
        } else {
          // Reactivate subscription
          await supabase
            .from('newsletter')
            .update({ is_active: true })
            .eq('email', email);

          return successResponse(res, { email }, 'Subscription reactivated successfully');
        }
      }

      // New subscription
      const { data, error } = await supabase
        .from('newsletter')
        .insert([{ email, is_active: true }])
        .select()
        .single();

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to subscribe');
      }

      logger.info(`Newsletter subscription: ${email}`);
      return successResponse(res, { email }, 'Subscribed successfully', 201);
    } catch (error) {
      logger.error('Subscribe error:', error);
      next(error);
    }
  }

  async unsubscribe(req, res, next) {
    try {
      const { email } = req.body;

      const { error } = await supabase
        .from('newsletter')
        .update({ is_active: false })
        .eq('email', email);

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to unsubscribe');
      }

      logger.info(`Newsletter unsubscription: ${email}`);
      return successResponse(res, null, 'Unsubscribed successfully');
    } catch (error) {
      logger.error('Unsubscribe error:', error);
      next(error);
    }
  }

  async getAllSubscribers(req, res, next) {
    try {
      const { active, limit = 100, offset = 0 } = req.query;

      let query = supabase
        .from('newsletter')
        .select('*');

      if (active !== undefined) {
        query = query.eq('is_active', active === 'true');
      }

      query = query
        .order('subscribed_at', { ascending: false })
        .range(offset, offset + parseInt(limit) - 1);

      const { data, error } = await query;

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch subscribers');
      }

      return successResponse(res, data, 'Subscribers retrieved successfully');
    } catch (error) {
      logger.error('Get all subscribers error:', error);
      next(error);
    }
  }

  async deleteSubscriber(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('newsletter')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to delete subscriber');
      }

      return successResponse(res, null, 'Subscriber deleted successfully');
    } catch (error) {
      logger.error('Delete subscriber error:', error);
      next(error);
    }
  }
}

module.exports = new NewsletterController();
