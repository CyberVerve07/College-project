// Debug script to check placeholder image mapping
import { PlaceHolderImagesMap } from './src/lib/placeholder-images';
import { initialDestinations } from './src/lib/destinations-data';

console.log('=== Placeholder Images Map ===');
console.log('Total images:', PlaceHolderImagesMap.size);

const destinationIds = ['dest-dharamshala', 'dest-manali', 'dest-shimla', 'dest-spiti', 'dest-kangra', 'dest-birbilling'];

destinationIds.forEach(id => {
    const img = PlaceHolderImagesMap.get(id);
    console.log(`${id}:`, img ? '✓ FOUND' : '✗ MISSING');
    if (img) {
        console.log(`  URL: ${img.imageUrl.substring(0, 50)}...`);
    }
});

console.log('\n=== Initial Destinations (before filter) ===');
console.log('Should be 6 destinations');

console.log('\n=== Filtered Destinations ===');
console.log('Total after filter:', initialDestinations.length);
initialDestinations.forEach((dest, index) => {
    console.log(`${index + 1}. ${dest.name} - Image: ${dest.imageUrl ? '✓' : '✗'}`);
});
