---
title: "Optimizing Performance in Ruby on Rails: Lessons from 5 Years of Experience"
description: "Techniques and strategies I learned to improve Rails application performance in production, including query optimization, caching, and profiling."
date: "2026-02-03"
category: "tech"
tags:
  - ruby-on-rails
  - performance
  - backend
  - database
readingTime: 8
image: "/images/blog/rails-performance.svg"
---

# Optimizing Performance in Ruby on Rails

After over 5 years working with Ruby on Rails in different contexts - from public administration systems to high-demand e-commerce - I learned that performance is not just about fast code, but about **understanding where the real bottlenecks are**.

## The N+1 Query Problem

One of the most common (and often ignored) problems in Rails applications are N+1 queries. In my experience at inChurch, I managed to reduce response time from **+60ms to ~14ms** just by optimizing these queries.

### Identifying the Problem

```ruby
# Bad: N+1 queries
posts = Post.all
posts.each do |post|
  puts post.author.name  # One query for each post!
end
```

### The Solution

```ruby
# Good: Eager loading
posts = Post.includes(:author).all
posts.each do |post|
  puts post.author.name  # No additional queries
end
```

## Strategic Caching

Not everything needs to be recalculated on every request. At Gocase, we implemented layered caching that significantly reduced database load.

### Fragment Caching

```erb
<% cache product do %>
  <%= render product %>
<% end %>
```

### Russian Doll Caching

```erb
<% cache [product, product.category] do %>
  <div class="product">
    <% cache product.category do %>
      <%= render product.category %>
    <% end %>
    <%= product.name %>
  </div>
<% end %>
```

## Profiling is Essential

Before optimizing, **measure**. Tools like `rack-mini-profiler` and `bullet` are essential for identifying real problems.

```ruby
# Gemfile
group :development do
  gem 'rack-mini-profiler'
  gem 'bullet'
end
```

## Conclusion

Performance is an ongoing process. The techniques I shared here are just the beginning - each application has its own challenges. The important thing is:

1. **Measure before optimizing**
2. **Focus on real bottlenecks**
3. **Test changes in production**

If you have questions or want to share your own experiences, find me on [LinkedIn](https://www.linkedin.com/in/nicholastn/)!
