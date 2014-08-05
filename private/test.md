---
layout: default
title: Test
published: true
---

<ul>
  {% directory path: img exclude: private %}
    <li>
      <img src="{{ file.url }}"
           alt="{{ file.name }}"
           datetime="{{ file.date | date_to_xmlschema }}" />
    </li>
  {% enddirectory %}
</ul>
