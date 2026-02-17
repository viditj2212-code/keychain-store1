/**
 * Helper to get image URL
 * Checks if url is absolute or relative
 */
export function getImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return path
}
