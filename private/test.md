---
layout: default
title: Test
published: true
---

{% directory path: /img %}
  <a href="{{ file.url }}" >{{ file.name }}</a>{% unless forloop.last %}, {% endunless %}
{% enddirectory %}