const { config } = require('./config');
const { fetchPosts, importPosts } = require('./lib');

console.log('Using:', config);
console.log('Fetching..');
fetchPosts(config.source, config.selectors)
  .then(posts => {
    console.log('Posts:', posts);
    console.log('Importing..');
    return importPosts(posts || [], config);
  })
  .then((result) => {
    console.log(`Successfully imported ${result.length} posts.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
