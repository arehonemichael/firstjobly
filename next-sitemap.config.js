/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://firstjobly.co.za',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: './public',
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/login'],
  additionalPaths: async (config) => {
    // Fetch your dynamic job slugs from database or API
    const jobs = [
      'software-engineer',
      'designer',
      'marketing-manager'
    ]; // replace with real API fetch
    return jobs.map((slug) => ({
      loc: `${config.siteUrl}/jobs/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
