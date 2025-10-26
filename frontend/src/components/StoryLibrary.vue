<template>
  <div class="story-library">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">📚 Story Library</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Wähle eine Geschichte zum Spielen
      </p>
    </div>

    <!-- Story Cards -->
    <div class="space-y-4">
      <div
        v-for="story in stories"
        :key="story.id"
        class="story-card bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all"
      >
        <!-- Story Header -->
        <div class="mb-3">
          <h3 class="text-xl font-bold mb-1">{{ story.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            von {{ story.author }}
          </p>
        </div>

        <!-- Story Description -->
        <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {{ story.description }}
        </p>

        <!-- Genre Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="genre in story.genre"
            :key="genre"
            class="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Story Stats -->
        <div class="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span>⏱️ {{ story.estimatedPlaytime }}</span>
          <span>🎭 {{ story.endings }} Enden</span>
          <span>📍 {{ story.stats.nodes }} Szenen</span>
        </div>

        <!-- Play Button -->
        <button
          @click="playStory(story)"
          class="btn-primary w-full"
        >
          ▶️ Story spielen
        </button>
      </div>
    </div>

    <!-- Import Custom Story Section -->
    <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
      <h3 class="font-bold mb-2">📁 Eigene Story importieren</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Hast du eine JSON-Story? Importiere sie hier!
      </p>
      <label class="btn-secondary cursor-pointer inline-block">
        📤 JSON hochladen
        <input
          type="file"
          @change="handleFileImport"
          accept=".json"
          class="hidden"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryStore } from '../stores/story'
import { getAllStories } from '../data/stories'

const router = useRouter()
const storyStore = useStoryStore()
const stories = ref(getAllStories())

// Play a story from the library
function playStory(story) {
  // Load the story data into the store
  storyStore.loadCampaign(story.data)

  // Navigate to reader
  router.push('/reader')
}

// Handle custom JSON import
function handleFileImport(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const campaignData = JSON.parse(e.target.result)
      storyStore.loadCampaign(campaignData)
      router.push('/reader')
    } catch (error) {
      alert('Fehler beim Importieren: ' + error.message)
    }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
