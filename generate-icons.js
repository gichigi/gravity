const sharp = require('sharp');
const fs = require('fs');

console.log('🚀 Generating Gravity icons...');

// Icon sizes for favicons (triangle only)
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

// Social media sizes (full logo)
const socialSizes = [
  { name: 'og-image.png', width: 1200, height: 630 },
  { name: 'twitter-image.png', width: 1200, height: 600 },
];

async function generateIcons() {
  try {
    // Generate favicons from triangle icon only
    console.log('📱 Generating favicons...');
    for (const { name, size } of faviconSizes) {
      await sharp('public/gravity-icon-only.svg')
        .png()
        .resize(size, size)
        .toFile(`public/${name}`);
      console.log(`✅ Created ${name}`);
    }

    // Generate social media images from full logo
    console.log('📱 Generating social media images...');
    for (const { name, width, height } of socialSizes) {
      await sharp('public/gravity-logo-white.svg')
        .png()
        .resize(width, height)
        .toFile(`public/${name}`);
      console.log(`✅ Created ${name}`);
    }

    console.log('🎉 All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();
