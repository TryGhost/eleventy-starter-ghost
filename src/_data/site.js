const ghostContentAPI = require('@tryghost/content-api');
require('dotenv').config();

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_CONTENT_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v2'
});

// Get all site information
module.exports = async function() {
  const siteData = await api.settings
    .browse({
      include: 'icon'
    })
    .catch(err => {
      console.error(err);
    });

  if (process.env.SITE_URL) siteData.url = process.env.SITE_URL;
  return siteData;
};
