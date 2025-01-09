---
layout: mypost
title: Links
lang: en
---

## Friend Links

Welcome to exchange links! Please contact me with the following information:

- Site Name
- Site URL

Contact me via email or leave a comment below to exchange links. 

## Links

{% for link in site.links %}
- [{{ link.title }}]({{ link.url }})
{% endfor %}

