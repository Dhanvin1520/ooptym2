const puppeteer = require('puppeteer');

const checkKeywordRank = async (domain, keywords = []) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const keyword of keywords) {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`, {
      waitUntil: 'domcontentloaded',
    });

    const links = await page.$$eval('div.g a', (anchors) =>
      anchors.map((a) => a.href)
    );

    const rank = links.findIndex((link) => link.includes(domain));
    results.push({
      keyword,
      found: rank >= 0,
      position: rank >= 0 ? rank + 1 : 'Not in top 10',
    });

    await page.waitForTimeout(2000); // Prevent rate limit
  }

  await browser.close();
  return { success: true, results };
};

module.exports = { checkKeywordRank };
