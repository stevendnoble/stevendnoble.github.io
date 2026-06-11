---
layout: grid
title: Recipes
slug: recipes
author: stevendnoble-recipes
no_groups: true
compact_posts: true
sort_posts_by: title
sitemap: true
hide_description: true
---

# Recipes

Browse recipes by the way you are most likely to look for them. These sections
are tag-based, so a recipe can appear in more than one place.

## Browse By Section

{% assign recipe_tag_order = "Asian|European|Latin|Mediterranean and Middle Eastern|Soups and Stews|Quick and Easy|Comfort Food|Family Recipes|Desserts|Gluten-Free" | split:"|" %}

<div class="columns columns-break">
  {% for tag_name in recipe_tag_order %}
    {% assign tag_page = site.featured_tags | where:"slug", tag_name | first %}
    {% if tag_page %}
      <div class="column column-1-2">
        {% include_cached pro/project-card.html project=tag_page %}
      </div>
    {% endif %}
  {% endfor %}
</div>

## All Recipes
