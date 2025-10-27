<template>
  <div class="min-h-screen flex flex-col items-center justify-center container-mobile bg-paper dark:bg-paper-dark">
    <div class="text-center max-w-2xl">
      <h1 class="text-4xl md:text-6xl font-serif mb-4 text-ink dark:text-ink-dark">
        AWFA1
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-ink-light dark:text-ink-dark/70 font-serif italic">
        Interaktive Fantasy-Literatur
      </p>

      <div class="flex flex-col gap-4 mt-12">
        <router-link to="/reader" class="btn-primary text-center py-4 text-lg">
          Geschichten lesen
        </router-link>

        <router-link to="/editor" class="btn-secondary text-center py-4 text-lg">
          Geschichten erschaffen
        </router-link>
      </div>

      <div class="mt-16 text-sm text-ink-light dark:text-ink-dark/70">
        <p class="mb-2">Ein Projekt von Team Syntax, Serif, Dice, Page & Edge</p>
        <p>Mobile-First • Open Source • Community-Driven</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple home view - just navigation
</script>
