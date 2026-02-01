const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });
const supabase = require('../config/supabase');

async function migrateImageUrls() {
  console.log('Starting migration...');

  // fetch all products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, image, images');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products.`);

  for (const product of products) {
    let needsUpdate = false;
    let newImage = product.image;
    let newImages = product.images;

    // Fix main image
    if (newImage && newImage.includes('http://localhost:5000/images/')) {
      newImage = newImage.replace('http://localhost:5000/images/', '/images/');
      needsUpdate = true;
    }

    // Fix gallery images
    if (newImages && Array.isArray(newImages)) {
      const updatedGallery = newImages.map(img => {
        if (img.includes('http://localhost:5000/images/')) {
          needsUpdate = true;
          return img.replace('http://localhost:5000/images/', '/images/');
        }
        return img;
      });
      newImages = updatedGallery;
    }

    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: newImage, images: newImages })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Failed to update product ${product.id}:`, updateError);
      } else {
        console.log(`Updated product ${product.id}`);
      }
    }
  }

  console.log('Migration complete.');
}

migrateImageUrls().catch(console.error);
