import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const inputDir = './public/images';
const files = readdirSync(inputDir);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  
  const inputPath = join(inputDir, file);
  const outputPath = join(inputDir, basename(file, ext) + '.webp');
  
  const before = statSync(inputPath).size;
  
  await sharp(inputPath)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
    
  const after = statSync(outputPath).size;
  console.log(`✅ ${file}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
}

console.log('\nDone!');
