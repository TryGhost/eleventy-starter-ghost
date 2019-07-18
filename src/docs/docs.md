---
pagination:
  data: collections.docs
  size: 1
  alias: 'doc'
  addAllPagesToCollections: true
layout: 'layouts/doc.njk'
permalink: '{{ doc.url }}'
---

{{ doc.html | safe if doc.html else "Page content not found" }}
