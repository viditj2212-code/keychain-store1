const supabase = require('../config/supabase');
const logger = require('../utils/logger');

class ProductService {
  async getProducts(filters) {
    try {
      let query = supabase
        .from('products')
        .select('*');

      // Category filter
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      // Featured filter
      if (filters.featured) {
        query = query.eq('is_featured', true);
      }

      // Search filter
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        query = query.gte('price', min);
        if (max) {
          query = query.lte('price', max);
        }
      }

      // Low Stock filter
      if (filters.lowStock) {
        query = query.lt('stock', 10);
      }

      // On Sale filter
      if (filters.onSale) {
        query = query.not('sale_price', 'is', null);
      }

      // Is New filter
      if (filters.isNew) {
        query = query.eq('is_new', true);
      }

      // Sorting
      switch (filters.sort) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false, nullsLast: true });
          break;
        case 'featured':
        default:
          query = query.order('is_featured', { ascending: false })
            .order('created_at', { ascending: false });
      }

      // Pagination
      query = query.range(filters.offset, filters.offset + filters.limit - 1);

      const { data, error } = await query;

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch products');
      }

      let products = (data || []).map(product => this.formatProduct(product));

      // Numerical sorting fallback to avoid lexicographical string-sorting issues from DB
      if (filters.sort === 'price-low') {
        products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      } else if (filters.sort === 'price-high') {
        products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      }

      return products;
    } catch (error) {
      logger.error('Get products service error:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to fetch product');
      }

      return data ? this.formatProduct(data) : null;
    } catch (error) {
      logger.error('Get product by ID service error:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productData.name,
          description: productData.description,
          price: productData.price,
          sale_price: productData.salePrice || null,
          image: productData.image,
          images: productData.images || [],
          category: productData.category,
          stock: productData.stock,
          is_featured: productData.isFeatured || false,
          is_new: productData.isNew || false,
          rating: productData.rating || null,
          reviews: productData.reviews || 0,
          features: productData.features || []
        }])
        .select()
        .single();

      if (error) {
        logger.error('Supabase error:', error);
        throw new Error('Failed to create product');
      }

      return this.formatProduct(data);
    } catch (error) {
      logger.error('Create product service error:', error);
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      const updateObj = {};

      if (updateData.name !== undefined) updateObj.name = updateData.name;
      if (updateData.description !== undefined) updateObj.description = updateData.description;
      if (updateData.price !== undefined) updateObj.price = updateData.price;
      if (updateData.salePrice !== undefined) updateObj.sale_price = updateData.salePrice;
      if (updateData.image !== undefined) updateObj.image = updateData.image;
      if (updateData.images !== undefined) updateObj.images = updateData.images;
      if (updateData.category !== undefined) updateObj.category = updateData.category;
      if (updateData.stock !== undefined) updateObj.stock = updateData.stock;
      if (updateData.isFeatured !== undefined) updateObj.is_featured = updateData.isFeatured;
      if (updateData.isNew !== undefined) updateObj.is_new = updateData.isNew;
      if (updateData.rating !== undefined) updateObj.rating = updateData.rating;
      if (updateData.reviews !== undefined) updateObj.reviews = updateData.reviews;
      if (updateData.features !== undefined) updateObj.features = updateData.features;

      updateObj.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('products')
        .update(updateObj)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to update product');
      }

      return this.formatProduct(data);
    } catch (error) {
      logger.error('Update product service error:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        logger.error('Supabase error:', error);
        throw new Error('Failed to delete product');
      }

      return true;
    } catch (error) {
      logger.error('Delete product service error:', error);
      throw error;
    }
  }

  async updateStock(id, stock) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          stock,
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
        throw new Error('Failed to update stock');
      }

      return this.formatProduct(data);
    } catch (error) {
      logger.error('Update stock service error:', error);
      throw error;
    }
  }

  formatProduct(product) {
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
      image: product.image,
      images: product.images || [],
      category: product.category,
      stock: product.stock,
      isFeatured: product.is_featured,
      isNew: product.is_new,
      rating: product.rating ? parseFloat(product.rating) : null,
      reviews: product.reviews,
      features: product.features || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
  }
}

module.exports = new ProductService();
