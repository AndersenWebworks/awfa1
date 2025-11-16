<template>
  <div class="app-container">
    <AppNav v-if="shouldShowNav" />
    <router-view />
    <AppFooter v-if="shouldShowNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStoryStore } from './stores/story'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const storyStore = useStoryStore()
const { isStoryLoaded } = storeToRefs(storyStore)

// Hide nav/footer when actively reading a story
const shouldShowNav = computed(() => {
  // If in reader route AND story is loaded → hide nav (immersive reading)
  if (route.path.startsWith('/reader') && isStoryLoaded.value) {
    return false
  }
  // Otherwise show nav (library browsing, editor, home)
  return true
})
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
