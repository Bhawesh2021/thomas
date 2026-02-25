const Jimp = require('jimp');

async function analyzeImage(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    const width = image.width;
    const height = image.height;
    
    let r = 0, g = 0, b = 0, count = 0;
    
    // Sample pixels
    for (let y = 0; y < height; y += 10) {
      for (let x = 0; x < width; x += 10) {
        const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        // Skip transparent pixels
        if (pixel.a > 128) {
          r += pixel.r;
          g += pixel.g;
          b += pixel.b;
          count++;
        }
      }
    }
    
    if (count > 0) {
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      
      console.log(`\n${imagePath}:`);
      console.log(`Average color - R:${r}, G:${g}, B:${b}`);
      console.log(`Hex: #${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
    }
  } catch (err) {
    console.error(`Error analyzing ${imagePath}:`, err.message);
  }
}

async function main() {
  await analyzeImage('src/1.jpeg');
  await analyzeImage('src/2.jpeg');
}

main();
