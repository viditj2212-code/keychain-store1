const supabase = require('../config/supabase');
const emailService = require('../services/email.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class ContactController {
  async submitContact(req, res, next) {
    try {
      const { name, email, subject, message } = req.body;

      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name,
          email,
          subject,
          message,
          status: 'new'
        }])
        .select()
        .single();

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to submit contact message');
      }

      // Send confirmation email
      emailService.sendContactConfirmation({ name, email, subject }).catch(err => {
        logger.error('Email send failed:', err);
      });

      logger.info(`Contact message received from: ${email}`);
      return successResponse(res, null, 'Message sent successfully', 201);
    } catch (error) {
      logger.error('Submit contact error:', error);
      next(error);
    }
  }

  async getAllMessages(req, res, next) {
    try {
      const { status, limit = 100, offset = 0 } = req.query;

      let query = supabase
        .from('contact_messages')
        .select('*');

      if (status) {
        query = query.eq('status', status);
      }

      query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + parseInt(limit) - 1);

      const { data, error } = await query;

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch messages');
      }

      return successResponse(res, data, 'Messages retrieved successfully');
    } catch (error) {
      logger.error('Get all messages error:', error);
      next(error);
    }
  }

  async updateMessageStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['new', 'read', 'replied'].includes(status)) {
        return errorResponse(res, 'Invalid status', 400);
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to update message status');
      }

      return successResponse(res, data, 'Status updated successfully');
    } catch (error) {
      logger.error('Update message status error:', error);
      next(error);
    }
  }

  async deleteMessage(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to delete message');
      }

      return successResponse(res, null, 'Message deleted successfully');
    } catch (error) {
      logger.error('Delete message error:', error);
      next(error);
    }
  }
}

module.exports = new ContactController();
