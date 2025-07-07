import puppeteer from 'puppeteer';
import Project from '/Users/Dhanvin/Downloads/Thoughtiv-main 4/backend/models/projectModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/seo-tool';

export const submitToHotfrog = async (projectId: string) => {
  await mongoose.connect(MONGODB_URI);
  const project = await Project.findById(projectId);

  if (!project) throw new Error('Project not found');

  const {
    title,
    url,
    category
  } = project;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.hotfrog.com/AddYourBusiness.aspx', { waitUntil: 'networkidle2' });

    await page.type('input[name="CompanyName"]', title || '');
    await page.type('input[name="Website"]', url || '');
    await page.type('input[name="Category"]', category || '');

    console.log(`✅ Submitted project '${title}' to Hotfrog (test mode)`);
  } catch (err) {
    console.error('❌ Submission failed:', err);
  } finally {
    await browser.close();
    await mongoose.disconnect();
  }
};