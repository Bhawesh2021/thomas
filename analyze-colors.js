import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function analyzeImage(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    console.log(`\n${path.basename(imagePath)}:`);
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
    
    // Resize to get dominant color
    const resized = await image.resize(50, 50).raw().toBuffer();
    
    // Calculate average color
    let r=0, g=0, b=0;
    for(let i=0; i<resized.length; i+=3) {
      r += resized[i];
      g += resized[i+1];
      b += resized[i+2];
    }
    const count = resized.length / 3;
    const avgR = Math.round(r/count);
    const avgG = Math.round(g/count);
    const avgB = Math.round(b/count);
    
    console.log(`Average color - R:${avgR}, G:${avgG}, B:${avgB}`);
    console.log(`Average Hex: #${avgR.toString(16).padStart(2,'0')}${avgG.toString(16).padStart(2,'0')}${avgB.toString(16).padStart(2,'0')}`);
    
    // Get most common color by sampling
    const colorCounts = {};
    for(let i=0; i<resized.length; i+=3) {
      const key = `${resized[i]},${resized[i+1]},${resized[i+2]}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }
    
    const sortedColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]);
    const topColor = sortedColors[0][0].split(',').map(Number);
    console.log(`Most common color - R:${topColor[0]}, G:${topColor[1]}, B:${topColor[2]}`);
    console.log(`Most common Hex: #${topColor[0].toString(16).padStart(2,'0')}${topColor[1].toString(16).padStart(2,'0')}${topColor[2].toString(16).padStart(2,'0')}`);
    
  } catch (err) {
    console.error(`Error analyzing ${imagePath}:`, err.message);
  }
}

async function main() {
  await analyzeImage('src/1.jpeg');
  await analyzeImage('src/2.jpeg');
}

main();
