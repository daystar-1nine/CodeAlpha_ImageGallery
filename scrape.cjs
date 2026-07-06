const https = require('https');
const fs = require('fs');

const categories = ["nature", "technology", "architecture", "cars", "food", "travel", "animals", "people", "space", "minimalism", "abstract"];
const results = [];

async function scrapeCategory(cat) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${cat}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = new RegExp("images\\\\.unsplash\\\\.com\\\\\\/photo-([a-zA-Z0-9\\\\-]+)", "g");
        // In JSON it might be escaped
        const regex2 = new RegExp("images\\\\.unsplash\\\\.com\\/photo-([a-zA-Z0-9\\\\-]+)", "g");
        
        let matches = [...data.matchAll(regex)].map(m => m[1]);
        matches = matches.concat([...data.matchAll(regex2)].map(m => m[1]));
        
        // Filter out profile images or common assets if any
        const ids = [...new Set(matches)].filter(id => id.length > 10).slice(0, 15);
        resolve({ cat, ids });
      });
    });
  });
}

async function run() {
  for (const cat of categories) {
    const data = await scrapeCategory(cat);
    results.push(data);
    console.log(`Scraped ${data.ids.length} ids for ${cat}`);
  }
  fs.writeFileSync('scraped.json', JSON.stringify(results, null, 2));
}
run();
