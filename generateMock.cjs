const fs = require('fs');

const categories = [
  "nature", "technology", "architecture", "cars", "food", 
  "travel", "animals", "people", "space", "minimalism", "abstract"
];

const images = [];
let idx = 1;

for (const cat of categories) {
  for (let i = 0; i < 15; i++) {
    const seed = `${cat}-${i + 1}`;
    
    // Using picsum.photos with deterministic seeds
    const url = `https://picsum.photos/seed/${seed}/1200/800`;
    const thumb = `https://picsum.photos/seed/${seed}/600/400`;
    
    // Generate a pleasant random hex color
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 40%, 60%)`; // we'll use a hex conversion or just leave it as hsl? The app uses hex.
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    images.push({
      id: `mock-${cat}-${i}`,
      url: url,
      thumb: thumb,
      width: 1200,
      height: 800,
      color: randomHex,
      blur_hash: "L56*B[D*00xu?wM_RjRj00%M~qxu", // standard fallback blur hash
      description: `${cat.charAt(0).toUpperCase() + cat.slice(1)} photography ${i+1}`,
      alt_description: `High-quality ${cat} image ${i+1}`,
      author: {
        name: `Creator ${idx}`,
        username: `creator_${idx}`,
        avatar: `https://picsum.photos/seed/avatar-${seed}/32/32`,
        portfolio_url: null
      },
      likes: Math.floor(Math.random() * 5000) + 50,
      created_at: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
      tags: [cat]
    });
    
    idx++;
  }
}

const fileContent = `import { ImageDetails } from "@/types";

export const mockImages: ImageDetails[] = ${JSON.stringify(images, null, 2)};
`;

fs.writeFileSync('src/constants/mockData.ts', fileContent);
console.log('Successfully generated mockData.ts with ' + images.length + ' images.');
