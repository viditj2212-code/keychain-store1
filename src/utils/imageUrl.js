/**
 * Utility function to convert relative image URLs to absolute URLs
 * Handles both Supabase absolute URLs and legacy relative paths
 */
export function getImageUrl(imagePath) {
  // If it's a full URL (Supabase Storage URLs), return as is
  if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('//')) {
    return imagePath;
  }

  // Legacy support: If it's a relative path (starts with /images/), prepend the backend base URL
  // This handles any old products that might still have relative paths
  if (imagePath.startsWith('/images/')) {
    let backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      backendUrl = apiUrl.replace('/api', '').replace(/\/$/, '');
    }

    backendUrl = backendUrl.replace(/\/$/, '');
    return `${backendUrl}${imagePath}`;
  }

  // Otherwise return as is
  return imagePath;
}
