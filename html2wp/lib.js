const cheerio = require('cheerio');
const WPAPI = require('wpapi');

/**
 * Fetches the HTML from the given web URL
 *
 * @param {string} url The url to fetch the data from
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const http = require('http');
    const https = require('https');

    let client = url.indexOf('https') === 0 ? https : http;

    client.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => data += chunk);

      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Fetches posts from the given source URL and the given selectors
 *
 * Selectors must have the following shape:
 *
 * {
 *   parent: '...',
 *   title: '...',
 *   content: '...'
 * }
 *
 * @param {string} sourceUrl The URL to fetch the HTML from
 * @param {object} selectors The object containing the selectors (see description)
 */
async function fetchPosts(sourceUrl, selectors) {
  const html = await fetchData(sourceUrl);
  console.log('HTML:', html);

  const $ = cheerio.load(html);

  const titles = $(selectors.parent)
    .find(selectors.title)
    .map((i, el) => $(el).text())
    .get();
  console.log('Titles:', titles);

  const contents = $(selectors.parent)
    .find(selectors.content)
    .map((i, el) => $(el).html())
    .get();
  console.log('Contents:', contents);

  if (titles.length !== contents.length) {
    throw new Error('Count of titles does match the count of contents!');
  }

  const posts = [];
  for (let i = 0; i < contents.length; i++) {
    posts.push({
      title: titles[i],
      content: contents[i]
    });
  }

  return posts;
}
exports.fetchPosts = fetchPosts;

/**
 * Imports the given posts using the given configuration of a WordPress site
 *
 * @param {array} posts List of posts to import
 * @param {object} config Configuration of WAPI client
 */
function importPosts(posts, config) {
  const client = new WPAPI(config);

  return Promise.all(posts.map(post => client.posts().create({
    ...post,
    categories: config.categories,
    author: config.author
  })));
}
exports.importPosts = importPosts;
