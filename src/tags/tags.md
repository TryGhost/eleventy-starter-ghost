---
pagination:
  data: collections.tags
  size: 1
  alias: tag
  addAllPagesToCollections: true
layout: 'layouts/tag.njk'
permalink: '{{ tag.url }}'
---

{% if tag.description %}
{{ tag.description | safe }}
{% else %}
{{ tag.count.posts }} posts
{% endif %}
