<template>
  <div class="story-library">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">📚 Story Library</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Wähle eine Geschichte zum Spielen
      </p>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b-2 border-gray-200 dark:border-gray-700">
      <div class="flex gap-4">
        <button
          @click="activeTab = 'all'"
          :class="[
            'pb-3 px-2 font-medium transition-colors btn-touch',
            activeTab === 'all'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          ]"
        >
          Alle Stories ({{ allStories.length }})
        </button>
        <button
          @click="activeTab = 'personal'"
          :class="[
            'pb-3 px-2 font-medium transition-colors btn-touch',
            activeTab === 'personal'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          ]"
        >
          Meine Stories ({{ personalStoriesStore.personalStoriesCount }})
        </button>
      </div>
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

        <!-- Action Buttons -->
        <div v-if="story.isPersonal" class="flex gap-2">
          <button
            @click="playStory(story)"
            class="btn-primary flex-1"
          >
            ▶️ Spielen
          </button>
          <button
            @click="editStory(story)"
            class="btn-secondary flex-1"
          >
            ✏️ Bearbeiten
          </button>
          <button
            @click="deleteStory(story)"
            class="btn-secondary px-3"
            title="Story löschen"
          >
            🗑️
          </button>
        </div>
        <button
          v-else
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStoryStore } from '../stores/story'
import { useEditorStore } from '../stores/editor'
import { usePersonalStoriesStore } from '../stores/personalStories'
import { getAllStories } from '../data/stories'

const router = useRouter()
const storyStore = useStoryStore()
const editorStore = useEditorStore()
const personalStoriesStore = usePersonalStoriesStore()

// Tab state
const activeTab = ref('all')

// Get all public stories
const publicStories = ref(getAllStories())

// Combined stories based on active tab
const allStories = computed(() => {
  return [...publicStories.value, ...personalStoriesStore.personalStories]
})

const stories = computed(() => {
  if (activeTab.value === 'all') {
    return allStories.value
  } else if (activeTab.value === 'personal') {
    return personalStoriesStore.personalStories
  }
  return allStories.value
})

// Play a story from the library
function playStory(story) {
  // Load the story data into the store
  storyStore.loadCampaign(story.data)

  // Navigate to reader
  router.push('/reader')
}

// Edit a personal story
function editStory(story) {
  if (!story.isPersonal) return

  // Load story into editor
  editorStore.loadCampaign(story.data)

  // Navigate to editor
  router.push('/editor')
}

// Delete a personal story
function deleteStory(story) {
  if (!story.isPersonal) return

  if (confirm(`Story "${story.title}" wirklich löschen?`)) {
    personalStoriesStore.deletePersonalStory(story.id)
  }
}

// Handle custom JSON import
function handleFileImport(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const campaignData = JSON.parse(e.target.result)

      // Import to personal stories
      const importedStory = personalStoriesStore.importStory(campaignData)

      // Show success message
      alert(`Story "${importedStory.title}" erfolgreich importiert!`)

      // Switch to personal tab to show imported story
      activeTab.value = 'personal'
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
