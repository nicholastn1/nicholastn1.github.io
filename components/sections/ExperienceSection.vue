<script setup lang="ts">
// Experience section - Professional work history
// TODO: Load data from YAML file
</script>

<template>
  <section id="experiencia" class="py-20">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div>
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          Experiência
        </h2>
      </div>

      <!-- Content -->
      <div>
        <p class="mb-8 text-lg text-text-secondary dark:text-text-muted">
          Desenvolvedor com mais de 5 anos de experiência, especializado em
          <strong class="text-text-primary dark:text-white">Ruby on Rails</strong>
          e desenvolvimento Full Stack.
        </p>

        <!-- Experience cards will be loaded from YAML -->
        <div class="space-y-6">
          <p class="text-text-muted">
            Carregando experiências...
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
