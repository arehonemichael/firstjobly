const { google } = require('googleapis');
const axios = require('axios');
const xml2js = require('xml2js');
const path = require('path');

// Path to your JSON service account key
const KEYFILEPATH = path.join(__dirname, 'lib/service-account.json'); 
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// Authenticate with the service account
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const indexing = google.indexing({ version: 'v3', auth });

// Function to push a single URL
async function publishUrl(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED', // use URL_DELETED if removing a job
      },
    });
    console.log(`✅ Pushed: ${url}`);
  } catch (error) {
    console.error(`❌ Error pushing ${url}:`, error.errors || error);
  }
}

// Function to fetch URLs from sitemap
async function getUrlsFromSitemap(sitemapUrl) {
  try {
    const response = await axios.get(sitemapUrl);
    const xml = response.data;
    const result = await xml2js.parseStringPromise(xml);

    // For standard sitemaps: result.urlset.url contains URLs
    const urls = result.urlset.url.map(u => u.loc[0]);
    return urls;
  } catch (error) {
    console.error('Error fetching or parsing sitemap:', error);
    return [];
  }
}

// Main function
(async () => {
  const sitemapUrl = 'https://firstjobly.co.za/sitemap.xml'; // Replace with your actual jobs sitemap
  const urls = await getUrlsFromSitemap(sitemapUrl);

  console.log(`Found ${urls.length} URLs in sitemap.`);

  for (const url of urls) {
    await publishUrl(url);
  }

  console.log('✅ All job URLs have been pushed!');
})();
