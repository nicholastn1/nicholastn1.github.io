---
title: "Otimizando Performance em Ruby on Rails: Lições de 5 Anos de Experiência"
description: "Técnicas e estratégias que aprendi para melhorar a performance de aplicações Rails em produção, incluindo otimização de queries, caching e profiling."
date: "2026-02-03"
category: "tech"
tags:
  - ruby-on-rails
  - performance
  - backend
  - database
readingTime: 8
image: "/images/blog/rails-performance.jpg"
---

# Otimizando Performance em Ruby on Rails

Após mais de 5 anos trabalhando com Ruby on Rails em diferentes contextos - desde sistemas de gestão pública até e-commerces de alta demanda - aprendi que performance não é apenas sobre código rápido, mas sobre **entender onde estão os gargalos reais**.

## O Problema das Queries N+1

Um dos problemas mais comuns (e muitas vezes ignorados) em aplicações Rails são as queries N+1. Na minha experiência na inChurch, consegui reduzir o tempo de resposta de **+60ms para ~14ms** apenas otimizando essas queries.

### Identificando o Problema

```ruby
# Ruim: N+1 queries
posts = Post.all
posts.each do |post|
  puts post.author.name  # Uma query para cada post!
end
```

### A Solução

```ruby
# Bom: Eager loading
posts = Post.includes(:author).all
posts.each do |post|
  puts post.author.name  # Nenhuma query adicional
end
```

## Caching Estratégico

Nem tudo precisa ser recalculado a cada request. Na Gocase, implementamos caching em camadas que reduziu significativamente a carga no banco de dados.

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

## Profiling é Essencial

Antes de otimizar, **meça**. Ferramentas como `rack-mini-profiler` e `bullet` são essenciais para identificar problemas reais.

```ruby
# Gemfile
group :development do
  gem 'rack-mini-profiler'
  gem 'bullet'
end
```

## Conclusão

Performance é um processo contínuo. As técnicas que compartilhei aqui são apenas o começo - cada aplicação tem seus próprios desafios. O importante é:

1. **Medir antes de otimizar**
2. **Focar nos gargalos reais**
3. **Testar as mudanças em produção**

Se você tem dúvidas ou quer compartilhar suas próprias experiências, me encontre no [LinkedIn](https://www.linkedin.com/in/nicholastn/)!
