---
layout: default
title: Test
published: true
Tags: Geektool, Geeklet, Shell Script
---

{% directory path: img %}
  <a href="{{ file.url }}" >{{ file.name }}</a>{% unless forloop.last %} <br> {% endunless %}
{% enddirectory %}

<ul>
  {% directory path: img exclude: private %}
    <li>
      <img src="{{ file.url }}"
           alt="{{ file.name }}"
           datetime="{{ file.date | date_to_xmlschema }}" />
    </li>
  {% enddirectory %}
</ul>