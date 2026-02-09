const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'product-images';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials for storage service');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Upload a single image to Supabase Storage
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} fileName - Original filename
 * @param {string} folder - Folder path within bucket (e.g., 'products')
 * @returns {Promise<string>} Public URL of uploaded image
 */
async function uploadImage(fileBuffer, fileName, folder = 'products') {
  try {
    const fileExt = path.extname(fileName);
    const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
    const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: getContentType(fileExt),
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple images to Supabase Storage
 * @param {Array} files - Array of file objects from multer
 * @param {string} folder - Folder path within bucket
 * @returns {Promise<Array<string>>} Array of public URLs
 */
async function uploadMultipleImages(files, folder = 'products') {
  try {
    const uploadPromises = files.map(file =>
      uploadImage(file.buffer, file.originalname, folder)
    );

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param {string} imageUrl - Full public URL of the image
 * @returns {Promise<boolean>} Success status
 */
async function deleteImage(imageUrl) {
  try {
    const filePath = extractFilePathFromUrl(imageUrl);

    if (!filePath) {
      console.warn('Could not extract file path from URL:', imageUrl);
      return false;
    }

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Delete multiple images from Supabase Storage
 * @param {Array<string>} imageUrls - Array of public URLs
 * @returns {Promise<boolean>} Success status
 */
async function deleteMultipleImages(imageUrls) {
  try {
    const filePaths = imageUrls
      .map(url => extractFilePathFromUrl(url))
      .filter(path => path !== null);

    if (filePaths.length === 0) {
      return true;
    }

    const { error } = await supabase.storage
      .from(bucketName)
      .remove(filePaths);

    if (error) {
      console.error('Error deleting images:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting multiple images:', error);
    return false;
  }
}

/**
 * Extract file path from Supabase public URL
 * @param {string} url - Full public URL
 * @returns {string|null} File path or null
 */
function extractFilePathFromUrl(url) {
  try {
    const bucketPath = `/storage/v1/object/public/${bucketName}/`;
    const index = url.indexOf(bucketPath);

    if (index === -1) {
      return null;
    }

    return url.substring(index + bucketPath.length);
  } catch (error) {
    return null;
  }
}

/**
 * Get content type based on file extension
 * @param {string} fileExt - File extension
 * @returns {string} MIME type
 */
function getContentType(fileExt) {
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  return contentTypes[fileExt.toLowerCase()] || 'image/jpeg';
}

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages
};
