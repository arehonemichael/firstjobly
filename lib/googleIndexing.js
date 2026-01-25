const { google } = require('googleapis');
const path = require('path');

// Path to your JSON key
const KEYFILEPATH = path.join(__dirname, 'service-account.json'); 
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// Authenticate
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const indexing = google.indexing({ version: 'v3', auth });

async function publishUrl(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED', // Use URL_DELETED if removing a job
      },
    });
    console.log('Indexing API response:', res.data);
  } catch (error) {
    console.error('Error publishing URL:', error);
  }
}

// Example usage
(async () => {
  const jobUrl = 'https://firstjobly.co.za/jobs/trainee-manufacturing-stores-at-coca-cola-beverages-south-africa';
  await publishUrl(jobUrl);
})();
