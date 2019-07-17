require('dotenv').config();

const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const ghostContentAPI = require('@tryghost/content-api');
const pluginRss = require('@11ty/eleventy-plugin-rss');

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_CONTENT_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v2'
});

// Strip Ghost domain from urls
// if you're using a custom url for this static site
const stripDomain = url => {
  return url.replace(process.env.GHOST_CONTENT_API_URL, '');
};

module.exports = function(config) {
  config.addTransform('htmlmin', htmlMinTransform);
  config.addPlugin(pluginRss);

  config.addFilter('htmlDateString', dateObj => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  // Get all pages, called 'docs' to prevent
  // conflicting the eleventy page object
  config.addCollection('docs', async function(collection) {
    collection = await api.pages
      .browse({
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    collection.map(doc => {
      doc.url = stripDomain(doc.url);
      return doc;
    });

    return collection;
  });

  // Get all posts
  config.addCollection('posts', async function(collection) {
    collection = await api.posts
      .browse({
        include: 'tags,authors',
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    collection.map(post => {
      post.url = stripDomain(post.url);

      // Convert publish date into a Date object
      post.published_at = new Date(post.published_at);
      return post;
    });

    return collection;
  });

  // Get all authors
  config.addCollection('authors', async function(collection) {
    collection = await api.authors
      .browse({
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    // Get all posts with their authors attached
    const posts = await api.posts
      .browse({
        include: 'authors',
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    // Attach posts to their respective authors
    collection.map(async author => {
      const authorsPosts = posts.filter(post => {
        post.url = stripDomain(post.url);
        return post.primary_author.id === author.id;
      });
      if (authorsPosts.length) author.posts = authorsPosts;

      author.url = stripDomain(author.url);

      return author;
    });

    return collection;
  });

  // Get all tags
  config.addCollection('tags', async function(collection) {
    collection = await api.tags
      .browse({
        include: 'count.posts',
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    // Get all posts with their tags attached
    const posts = await api.posts
      .browse({
        include: 'tags',
        limit: 'all'
      })
      .catch(err => {
        console.error(err);
      });

    // Attach posts to their respective tags
    collection.map(async tag => {
      const taggedPosts = posts.filter(post => {
        post.url = stripDomain(post.url);
        return post.primary_tag && post.primary_tag.slug === tag.slug;
      });
      if (taggedPosts.length) tag.posts = taggedPosts;

      tag.url = stripDomain(tag.url);

      return tag;
    });

    return collection;
  });

  // Eleventy configuration
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['css', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
