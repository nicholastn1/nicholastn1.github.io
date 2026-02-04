<script setup lang="ts">
// Projects section - Portfolio projects showcase
// TODO: Load data from YAML file
</script>

<template>
  <section id="projetos" class="py-20">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div>
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          Projetos
        </h2>
      </div>

      <!-- Content -->
      <div>
        <!-- Projects will be loaded from YAML -->
        <div class="space-y-6">
          <p class="text-text-muted">Carregando projetos...</p>
        </div>
      </div>
    </div>
  </section>
</template>
