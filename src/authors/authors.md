---
pagination:
  data: collections.authors
  size: 1
  alias: 'author'
  addAllPagesToCollections: true
layout: 'layouts/author.njk'
permalink: '{{ author.url }}'
---

{{ author.bio | safe if author.bio else "Bio not found" }}
