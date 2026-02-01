const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logger = require('../utils/logger');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

class AuthService {
  async register(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: 'user'
          }
        }
      });

      if (error) {
        logger.error('Supabase auth error:', error);
        throw new Error('Failed to register user');
      }

      return {
        id: data.user.id,
        email: data.user.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user'
      };
    } catch (error) {
      logger.error('Register service error:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return null;
      }

      const token = this.generateToken(data.user);

      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          role: data.user.user_metadata.role || 'user'
        },
        token,
        expiresIn: JWT_EXPIRES_IN
      };
    } catch (error) {
      logger.error('Login service error:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        return null;
      }

      return {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata.first_name,
        lastName: data.user.user_metadata.last_name,
        role: data.user.user_metadata.role || 'user',
        createdAt: data.user.created_at
      };
    } catch (error) {
      logger.error('Get user by ID error:', error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        logger.error('Supabase error:', error);
      }

      return data;
    } catch (error) {
      logger.error('Get user by email error:', error);
      return null;
    }
  }

  async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase.auth.admin.updateUserById(
        userId,
        {
          user_metadata: {
            first_name: updates.firstName,
            last_name: updates.lastName
          }
        }
      );

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to update profile');
      }

      return {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata.first_name,
        lastName: data.user.user_metadata.last_name,
        role: data.user.user_metadata.role || 'user'
      };
    } catch (error) {
      logger.error('Update profile error:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`
      });

      if (error) {
        logger.error('Supabase error:', error);
      }

      // Always return success for security
      return true;
    } catch (error) {
      logger.error('Send password reset error:', error);
      return true;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        logger.error('Supabase error:', error);
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Reset password error:', error);
      return false;
    }
  }

  async logout(userId) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        logger.error('Logout error:', error);
      }

      return true;
    } catch (error) {
      logger.error('Logout service error:', error);
      throw error;
    }
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.user_metadata.role || 'user'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }
}

module.exports = new AuthService();
