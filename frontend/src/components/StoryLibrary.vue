<template>
  <div class="story-library">
    <div class="mb-6">
      <h2 class="text-2xl font-serif mb-2 text-ink dark:text-ink-dark">Bibliothek</h2>
      <p class="text-ink-light dark:text-ink-dark/70">
        Wählen Sie eine Geschichte aus unserer Sammlung
      </p>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b border-divider">
      <div class="flex gap-4">
        <button
          @click="activeTab = 'all'"
          :class="[
            'pb-3 px-2 font-medium transition-colors btn-touch',
            activeTab === 'all'
              ? 'border-b-2 border-sepia text-sepia'
              : 'text-ink-light hover:text-ink'
          ]"
        >
          Alle Geschichten ({{ allStories.length }})
        </button>
        <button
          @click="activeTab = 'personal'"
          :class="[
            'pb-3 px-2 font-medium transition-colors btn-touch',
            activeTab === 'personal'
              ? 'border-b-2 border-sepia text-sepia'
              : 'text-ink-light hover:text-ink'
          ]"
        >
          Meine Geschichten ({{ personalStoriesStore.personalStoriesCount }})
        </button>
      </div>
    </div>

    <!-- Story Cards -->
    <div class="space-y-4">
      <div
        v-for="story in stories"
        :key="story.id"
        class="story-card bg-paper dark:bg-paper-dark rounded p-5 border border-divider hover:border-sepia/50 hover:shadow-sm transition-all"
      >
        <!-- Story Header -->
        <div class="mb-3 border-b border-divider/50 pb-3">
          <h3 class="text-xl font-serif text-ink dark:text-ink-dark mb-1">{{ story.title }}</h3>
          <p class="text-sm text-ink-light dark:text-ink-dark/70 italic">
            {{ story.author }}
          </p>
        </div>

        <!-- Story Description -->
        <p class="text-ink dark:text-ink-dark mb-4 line-clamp-2 text-sm leading-relaxed">
          {{ story.description }}
        </p>

        <!-- Genre Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="genre in story.genre"
            :key="genre"
            class="px-2 py-1 text-xs text-sepia border border-sepia/30 rounded-sm"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Story Stats -->
        <div class="flex flex-wrap gap-4 mb-4 text-xs text-ink-light dark:text-ink-dark/70">
          <span>{{ story.estimatedPlaytime }}</span>
          <span>{{ story.endings }} Enden</span>
          <span>{{ story.stats.nodes }} Abschnitte</span>
        </div>

        <!-- Action Buttons -->
        <div v-if="story.isPersonal" class="flex gap-2">
          <button
            @click="playStory(story)"
            class="btn-primary flex-1"
          >
            Lesen
          </button>
          <button
            @click="editStory(story)"
            class="btn-secondary flex-1"
          >
            Überarbeiten
          </button>
          <button
            @click="deleteStory(story)"
            class="btn-secondary px-3"
            title="Geschichte entfernen"
          >
            ×
          </button>
        </div>
        <div v-else class="flex gap-2">
          <button
            @click="playStory(story)"
            class="btn-primary flex-1"
          >
            Lesen
          </button>
          <button
            @click="copyAsTemplate(story)"
            class="btn-secondary flex-1"
            title="Als Vorlage in Ihre Bibliothek übernehmen"
          >
            Als Vorlage
          </button>
        </div>
      </div>
    </div>

    <!-- Import Custom Story Section -->
    <div class="mt-8 p-4 bg-shadow/30 dark:bg-paper-dark rounded border border-divider">
      <h3 class="font-serif text-ink dark:text-ink-dark mb-2">Eigene Geschichte hinzufügen</h3>
      <p class="text-sm text-ink-light dark:text-ink-dark/70 mb-3">
        Fügen Sie eine Geschichte aus einer Datei hinzu
      </p>
      <label class="btn-secondary cursor-pointer inline-block">
        Datei auswählen
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

  if (confirm(`Geschichte "${story.title}" wirklich löschen?`)) {
    personalStoriesStore.deletePersonalStory(story.id)
  }
}

// Copy public story as template to personal library
function copyAsTemplate(story) {
  if (story.isPersonal) return // Only for public stories

  try {
    // Create a copy with new ID
    const templateCopy = {
      ...story.data,
      id: 'personal_' + Date.now(), // New unique ID
      title: story.data.title + ' (Kopie)',
      author: 'You', // User is now the author
    }

    // Import to personal stories
    const importedStory = personalStoriesStore.importStory(templateCopy)

    // Show success message
    alert(`Geschichte "${story.title}" als Vorlage kopiert!\n\nSie finden sie nun in "Meine Geschichten" und können sie bearbeiten.`)

    // Switch to personal tab to show copied story
    activeTab.value = 'personal'
  } catch (error) {
    alert('Fehler beim Kopieren: ' + error.message)
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
      alert(`Geschichte "${importedStory.title}" erfolgreich importiert!`)

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
