/**
 * Utility function to convert relative image URLs to absolute URLs
 * Handles both relative paths and full URLs
 */
export function getImageUrl(imagePath) {
  // If it's a full URL (starts with http:// or https:// or //), return as is
  if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('//')) {
    return imagePath;
  }

  // If it's a relative path (starts with /images/), prepend the backend base URL
  if (imagePath.startsWith('/images/')) {
    // First priority: use explicit backend URL if set
    let backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    // Second priority: derive from API URL
    if (!backendUrl) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      // Remove /api from the end to get the base URL
      backendUrl = apiUrl.replace('/api', '').replace(/\/$/, '');
    }
    
    // Ensure no trailing slash
    backendUrl = backendUrl.replace(/\/$/, '');
    
    return `${backendUrl}${imagePath}`;
  }

  // Otherwise return as is
  return imagePath;
}
