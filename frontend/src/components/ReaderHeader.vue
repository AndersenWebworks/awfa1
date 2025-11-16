<template>
  <header class="reader-header bg-paper dark:bg-paper-dark border-b border-divider sticky top-0 z-10">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="btn-touch flex items-center gap-2 text-ink-light dark:text-ink-dark hover:text-sepia transition-colors"
          aria-label="Zurück zur Bibliothek"
        >
          <span class="text-xl">←</span>
          <span class="hidden sm:inline font-medium">Bibliothek</span>
        </button>

        <!-- Story Title -->
        <h1 class="flex-1 text-center font-serif text-ink dark:text-ink-dark truncate">
          {{ storyTitle }}
        </h1>

        <!-- Progress (optional) -->
        <div
          v-if="showProgress && totalNodes > 0"
          class="text-sm text-ink-light dark:text-ink-dark/70 whitespace-nowrap"
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
  return storyStore.campaign?.title || 'Geschichte'
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
  // Go back to library (reader without story loaded)
  storyStore.resetStory()
  router.push('/reader')
}
</script>

<style scoped>
.reader-header {
  /* Prevent layout shift */
  min-height: 60px;
}
</style>
