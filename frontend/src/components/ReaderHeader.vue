<template>
  <header class="reader-header bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="btn-touch flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Zurück zur Story Library"
        >
          <span class="text-xl">←</span>
          <span class="hidden sm:inline font-medium">Library</span>
        </button>

        <!-- Story Title -->
        <h1 class="flex-1 text-center font-bold text-gray-900 dark:text-gray-100 truncate">
          {{ storyTitle }}
        </h1>

        <!-- Progress (optional) -->
        <div
          v-if="showProgress && totalNodes > 0"
          class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
        >
          {{ currentNodeIndex + 1 }}/{{ totalNodes }}
        </div>
        <div v-else class="w-16"></div> <!-- Spacer for alignment -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryStore } from '../stores/story'

const router = useRouter()
const storyStore = useStoryStore()

// Props
const props = defineProps({
  showProgress: {
    type: Boolean,
    default: false,
  },
})

// Computed properties
const storyTitle = computed(() => {
  return storyStore.campaign?.title || 'Story'
})

const totalNodes = computed(() => {
  return storyStore.campaign?.nodes?.length || 0
})

const currentNodeIndex = computed(() => {
  if (!storyStore.campaign || !storyStore.currentNodeId) return 0
  const index = storyStore.campaign.nodes.findIndex(
    node => node.id === storyStore.currentNodeId
  )
  return index >= 0 ? index : 0
})

// Methods
function goBack() {
  router.push('/')
}
</script>

<style scoped>
.reader-header {
  /* Prevent layout shift */
  min-height: 60px;
}
</style>
