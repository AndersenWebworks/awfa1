<template>
  <nav class="app-nav bg-paper dark:bg-paper-dark border-b border-divider sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo / Home -->
        <router-link
          to="/"
          class="flex items-center gap-2 text-ink dark:text-ink-dark hover:text-sepia transition-colors font-serif"
        >
          <span class="text-xl font-bold">AWFA1</span>
        </router-link>

        <!-- Main Navigation -->
        <div class="flex items-center gap-4">
          <router-link
            to="/reader"
            :class="[
              'nav-link',
              isActive('/reader') ? 'active' : ''
            ]"
          >
            Bibliothek
          </router-link>

          <router-link
            to="/editor"
            :class="[
              'nav-link',
              isActive('/editor') ? 'active' : ''
            ]"
          >
            Editor
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Check if route is active
function isActive(path) {
  return route.path.startsWith(path)
}
</script>

<style scoped>
.app-nav {
  min-height: 60px;
}

.nav-link {
  @apply px-3 py-2 rounded
         text-ink-light dark:text-ink-dark/70
         hover:text-sepia hover:bg-shadow/20
         transition-colors
         font-medium text-sm;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-link.active {
  @apply text-sepia bg-shadow/30 dark:bg-sepia/10;
}
</style>
