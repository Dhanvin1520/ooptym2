const puppeteer = require('puppeteer');

const analyzePageSpeed = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  const start = Date.now();
  await page.goto(url, { waitUntil: 'load' });
  const end = Date.now();
  const loadTime = end - start;

  const performance = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance.timing)));
  await browser.close();

  return {
    success: true,
    metrics: {
      loadTime: `${loadTime} ms`,
      ttfb: performance.responseStart - performance.requestStart + ' ms',
      domContentLoaded: performance.domContentLoadedEventEnd - performance.navigationStart + ' ms',
      totalTime: performance.loadEventEnd - performance.navigationStart + ' ms'
    },
    suggestions: loadTime > 2000
      ? ['Consider optimizing images, reducing render-blocking JS, and enabling compression.']
      : ['Page speed is acceptable.']
  };
};

module.exports = { analyzePageSpeed };
