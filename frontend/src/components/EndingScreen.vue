<template>
  <div class="ending-screen text-center py-12">
    <!-- Ending Message -->
    <div class="mb-8">
      <div class="text-6xl mb-4">🎭</div>
      <h2 class="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        Das Ende
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Du hast das Ende dieser Geschichte erreicht
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3 max-w-md mx-auto">
      <button
        @click="restartStory"
        class="btn-primary w-full"
      >
        🔄 Story neu starten
      </button>

      <button
        @click="goToLibrary"
        class="btn-secondary w-full"
      >
        📚 Zurück zur Library
      </button>

      <!-- Optional: Next Story Suggestion -->
      <div v-if="suggestedStory" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Nächste Story:
        </p>
        <button
          @click="playNextStory"
          class="btn-secondary w-full"
        >
          ▶️ {{ suggestedStory.title }}
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
