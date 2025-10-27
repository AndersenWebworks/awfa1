<template>
  <div class="ending-screen text-center py-12">
    <!-- Ending Message -->
    <div class="mb-8">
      <div class="text-6xl mb-4 text-sepia">∎</div>
      <h2 class="text-3xl font-serif mb-3 text-ink dark:text-ink-dark">
        Das Ende
      </h2>
      <p class="text-ink-light dark:text-ink-dark/70">
        Sie haben das Ende dieser Geschichte erreicht
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3 max-w-md mx-auto">
      <button
        @click="restartStory"
        class="btn-primary w-full"
      >
        Geschichte neu beginnen
      </button>

      <button
        @click="goToLibrary"
        class="btn-secondary w-full"
      >
        Zurück zur Bibliothek
      </button>

      <!-- Optional: Next Story Suggestion -->
      <div v-if="suggestedStory" class="mt-6 pt-6 border-t border-divider">
        <p class="text-sm text-ink-light dark:text-ink-dark/70 mb-3">
          Nächste Geschichte:
        </p>
        <button
          @click="playNextStory"
          class="btn-secondary w-full"
        >
          {{ suggestedStory.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryStore } from '../stores/story'
import { usePersonalStoriesStore } from '../stores/personalStories'
import { getAllStories } from '../data/stories'

const router = useRouter()
const storyStore = useStoryStore()
const personalStoriesStore = usePersonalStoriesStore()

// Props
const props = defineProps({
  showNextSuggestion: {
    type: Boolean,
    default: false,
  },
})

// Suggested next story (simple logic: next in list)
const suggestedStory = computed(() => {
  if (!props.showNextSuggestion) return null

  const allStories = [...getAllStories(), ...personalStoriesStore.personalStories]
  const currentId = storyStore.campaign?.id

  if (!currentId) return null

  const currentIndex = allStories.findIndex(s => s.id === currentId)
  if (currentIndex < 0 || currentIndex >= allStories.length - 1) return null

  return allStories[currentIndex + 1]
})

// Methods
function restartStory() {
  storyStore.resetStory()
}

function goToLibrary() {
  router.push('/')
}

function playNextStory() {
  if (!suggestedStory.value) return

  storyStore.loadCampaign(suggestedStory.value.data)
  // Stay on reader, story reloads
}
</script>

<style scoped>
.ending-screen {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
