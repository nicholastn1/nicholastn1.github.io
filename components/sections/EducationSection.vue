<script setup lang="ts">
// Education section - Academic background, certifications, languages
// TODO: Load data from YAML file
</script>

<template>
  <section id="formacao" class="bg-background-dark py-20 text-white">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div>
        <h2 class="section-subtitle text-black">Formação</h2>
      </div>

      <!-- Content -->
      <div>
        <p class="mb-8 text-lg text-text-muted">
          Minha jornada acadêmica e formações complementares.
        </p>

        <!-- Education content will be loaded from YAML -->
        <div class="space-y-6">
          <p class="text-text-muted">Carregando formação...</p>
        </div>
      </div>
    </div>
  </section>
</template>
