const puppeteer = require('puppeteer');

const scrapeUserSavedRecipes = async (username, password) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });
    
    // Navigate to Instagram
    await page.goto('https://www.instagram.com/accounts/login/', {
      waitUntil: 'networkidle2'
    });
    
    // Login
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    // Navigate to saved posts
    await page.goto(`https://www.instagram.com/${username}/saved/`, {
      waitUntil: 'networkidle2'
    });
    
    // Scroll to load more posts
    let previousHeight = 0;
    for (let i = 0; i < 5; i++) {
      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) break;
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000);
      previousHeight = newHeight;
    }
    
    // Extract posts
    const posts = await page.evaluate(() => {
      const items = document.querySelectorAll('article img[alt*=""]');
      const results = [];
      
      items.forEach((img) => {
        const link = img.closest('a');
        if (link) {
          results.push({
            imageUrl: img.src,
            caption: img.alt || '',
            postUrl: link.href
          });
        }
      });
      
      return results;
    });
    
    await browser.close();
    return posts;
  } catch (err) {
    if (browser) await browser.close();
    throw new Error(`Instagram scraping failed: ${err.message}`);
  }
};

module.exports = {
  scrapeUserSavedRecipes
};
