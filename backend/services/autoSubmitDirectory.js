const puppeteer = require('puppeteer');
const Project = require('../models/projectModel');

const siteConfig = {
    Sulekha: 'https://www.sulekha.com/list-your-business',
    JustDial: 'https://www.justdial.com/Free-Listing?source=77&cta_from=W_Newcms_bflrhs',
    IndiaMart: 'https://seller.indiamart.com/signup/',
    Grotal: 'https://www.grotal.com/submit-biz',
    TradeIndia: 'https://my.tradeindia.com/',
    YellowPages: 'https://www.yellowpages.in/post-your-requirement'
  };
  

const autoSubmitDirectory = async (projectId, siteName) => {
  const project = await Project.findById(projectId);
  if (!project || !siteConfig[siteName]) {
    return { success: false, message: 'Invalid project or unsupported site' };
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(siteConfig[siteName]);

    // ⚠️ Adjust selectors per site
    await page.type('#businessName', project.title || '');
    await page.type('#websiteUrl', project.url || '');
    await page.type('#email', 'your-email@example.com');
    await page.select('#category', project.category || 'General');

    await page.click('#submitBtn');
    await page.waitForNavigation();
    await browser.close();

    return { success: true, message: `Submitted to ${siteName}` };
  } catch (err) {
    return { success: false, message: 'Automation failed: ' + err.message };
  }
};

module.exports = autoSubmitDirectory;
