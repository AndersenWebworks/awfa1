/**
 * Personal Stories Store
 *
 * Manages user-created stories stored in LocalStorage
 * Separate from curated public stories
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'awfa_personal_stories'

export const usePersonalStoriesStore = defineStore('personalStories', () => {
  const personalStories = ref([])

  // Load from localStorage on init
  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        personalStories.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load personal stories from localStorage:', error)
      personalStories.value = []
    }
  }

  // Save to localStorage
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personalStories.value))
    } catch (error) {
      console.error('Failed to save personal stories to localStorage:', error)
    }
  }

  // Add a new personal story
  function addPersonalStory(storyData) {
    // Validate story data
    if (!storyData || !storyData.id || !storyData.title) {
      throw new Error('Invalid story data: missing id or title')
    }

    // Check if story already exists (by id)
    const existingIndex = personalStories.value.findIndex(s => s.id === storyData.id)

    if (existingIndex >= 0) {
      // Update existing story
      personalStories.value[existingIndex] = {
        ...storyData,
        updatedAt: new Date().toISOString()
      }
    } else {
      // Add new story
      personalStories.value.push({
        ...storyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    saveToStorage()
  }

  // Import story from JSON file
  function importStory(jsonData) {
    try {
      const story = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData

      // Validate campaign structure
      if (!story.id || !story.title || !story.nodes) {
        throw new Error('Invalid story format: missing required fields (id, title, nodes)')
      }

      // Create story metadata
      const storyMetadata = {
        id: story.id,
        title: story.title,
        author: story.author || 'Unknown',
        description: story.description || 'Imported story',
        genre: story.genre || ['Fantasy'],
        tags: story.tags || ['imported'],
        difficulty: story.difficulty || 'Unknown',
        estimatedPlaytime: story.estimatedPlaytime || 'Unknown',
        endings: story.endings || countEndings(story),
        coverImage: null,
        data: story,
        stats: {
          nodes: story.nodes?.length || 0,
          choices: countChoices(story),
          endings: story.endings || countEndings(story),
        },
        isPersonal: true, // Flag to distinguish from public stories
      }

      addPersonalStory(storyMetadata)
      return storyMetadata
    } catch (error) {
      console.error('Failed to import story:', error)
      throw new Error(`Import failed: ${error.message}`)
    }
  }

  // Delete a personal story
  function deletePersonalStory(storyId) {
    const index = personalStories.value.findIndex(s => s.id === storyId)
    if (index >= 0) {
      personalStories.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  // Get story by ID
  function getPersonalStory(storyId) {
    return personalStories.value.find(s => s.id === storyId)
  }

  // Export story to JSON
  function exportStory(storyId) {
    const story = getPersonalStory(storyId)
    if (!story) {
      throw new Error(`Story not found: ${storyId}`)
    }
    return JSON.stringify(story.data, null, 2)
  }

  // Helper: Count endings in a story
  function countEndings(story) {
    if (!story.nodes) return 0
    return story.nodes.filter(node =>
      !node.choices || node.choices.length === 0
    ).length
  }

  // Helper: Count total choices in a story
  function countChoices(story) {
    if (!story.nodes) return 0
    return story.nodes.reduce((total, node) =>
      total + (node.choices?.length || 0), 0
    )
  }

  // Computed: All personal stories
  const allPersonalStories = computed(() => personalStories.value)

  // Computed: Count
  const personalStoriesCount = computed(() => personalStories.value.length)

  // Initialize on store creation
  loadFromStorage()

  return {
    personalStories: allPersonalStories,
    personalStoriesCount,
    addPersonalStory,
    importStory,
    deletePersonalStory,
    getPersonalStory,
    exportStory,
    loadFromStorage,
  }
})
