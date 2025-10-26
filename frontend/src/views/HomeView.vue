<template>
  <div class="min-h-screen flex flex-col items-center justify-center container-mobile">
    <div class="text-center max-w-2xl">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
        Interactive Fantasy RPG Engine
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
        Kindle meets D&D - Mobile First
      </p>

      <div class="flex flex-col gap-4 mt-12">
        <router-link to="/reader" class="btn-primary text-center py-4 text-lg">
          📖 Play a Story (Reader)
        </router-link>

        <router-link to="/editor" class="btn-secondary text-center py-4 text-lg">
          ✏️ Create a Story (Editor)
        </router-link>
      </div>

      <div class="mt-16 text-sm text-gray-500 dark:text-gray-500">
        <p class="mb-2">Built with ❤️ by Team Syntax, Serif, Dice, Page & Edge</p>
        <p>Mobile-First • Open Source • Community-Driven</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple home view - just navigation
</script>
