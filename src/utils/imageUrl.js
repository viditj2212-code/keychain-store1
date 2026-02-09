/**
 * Utility function to convert relative image URLs to absolute URLs
 * Handles both relative paths and full URLs
 */
export function getImageUrl(imagePath) {
  // If it's a full URL (starts with http:// or https:// or //), return as is
  if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('//')) {
    return imagePath;
  }

  // If it's a relative path (starts with /images/), prepend the API base URL
  if (imagePath.startsWith('/images/')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    // Remove /api from the end to get the base URL
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }

  // Otherwise return as is
  return imagePath;
}
