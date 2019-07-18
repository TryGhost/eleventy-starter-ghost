---
pagination:
  data: collections.tags
  size: 1
  alias: tag
  addAllPagesToCollections: true
layout: 'layouts/tag.njk'
permalink: '{{ tag.url }}'
---

{{ tag.description | safe if tag.description else tag.count.posts + " posts" }}
