<template>
  <footer class="app-footer text-center py-6 text-xs text-gray-500 dark:text-gray-600">
    <div class="container mx-auto px-4">
      {{ versionString }}
    </div>
  </footer>
</template>

<script setup>
import { getVersionString } from '../config/version'

const versionString = getVersionString()
</script>

<style scoped>
.app-footer {
  /* Subtle, non-intrusive */
  user-select: none;
}
</style>
