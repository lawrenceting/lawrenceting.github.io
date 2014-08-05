---
layout: default
title: Test
published: true
---

{% directory path: http://lawrenceting.github.io/img %}
  <a href="{{ file.url }}" >{{ file.name }}</a>{% unless forloop.last %}, {% endunless %}
{% enddirectory %}