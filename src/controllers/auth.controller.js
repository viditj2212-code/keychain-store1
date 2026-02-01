const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const existingUser = await authService.getUserByEmail(email);
      if (existingUser) {
        return errorResponse(res, 'Email already registered', 409);
      }

      const user = await authService.register({
        email,
        password,
        firstName,
        lastName
      });

      logger.info(`User registered: ${user.id}`);
      return successResponse(res, user, 'Registration successful', 201);
    } catch (error) {
      logger.error('Register error:', error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      if (!result) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      logger.info(`User logged in: ${result.user.id}`);
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await authService.getUserById(userId);

      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }

      return successResponse(res, user, 'Profile retrieved successfully');
    } catch (error) {
      logger.error('Get profile error:', error);
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updates = req.body;

      const updatedUser = await authService.updateProfile(userId, updates);

      if (!updatedUser) {
        return errorResponse(res, 'User not found', 404);
      }

      logger.info(`Profile updated: ${userId}`);
      return successResponse(res, updatedUser, 'Profile updated successfully');
    } catch (error) {
      logger.error('Update profile error:', error);
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      await authService.sendPasswordResetEmail(email);

      return successResponse(res, null, 'Password reset email sent');
    } catch (error) {
      logger.error('Forgot password error:', error);
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      const success = await authService.resetPassword(token, newPassword);

      if (!success) {
        return errorResponse(res, 'Invalid or expired reset token', 400);
      }

      return successResponse(res, null, 'Password reset successful');
    } catch (error) {
      logger.error('Reset password error:', error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.user.id;

      await authService.logout(userId);

      logger.info(`User logged out: ${userId}`);
      return successResponse(res, null, 'Logout successful');
    } catch (error) {
      logger.error('Logout error:', error);
      next(error);
    }
  }
}

module.exports = new AuthController();
