<template>
  <div class="min-h-screen bg-reader-bg dark:bg-reader-bg-dark safe-area">
    <div class="container-mobile">
      <header class="flex justify-between items-center mb-8">
        <router-link to="/" class="btn-secondary">
          ← Home
        </router-link>

        <button
          v-if="isStoryLoaded"
          @click="resetStory"
          class="btn-secondary text-sm"
        >
          Reset Story
        </button>
      </header>

      <!-- Story Library (when no story is loaded) -->
      <StoryLibrary v-if="!isStoryLoaded" />

      <!-- Story Display (we'll enhance this later) -->
      <div v-else class="reader-content">
        <h2 class="text-2xl font-bold mb-8">{{ campaign.title }}</h2>

        <!-- Current Node Text -->
        <div class="reader-text mb-8" v-if="currentNode">
          <p class="whitespace-pre-wrap">{{ currentNode.content.text }}</p>
        </div>

        <!-- Choices -->
        <div v-if="currentNode && currentNode.choices && currentNode.choices.length > 0" class="space-y-3">
          <button
            v-for="(choice, index) in currentNode.choices"
            :key="index"
            @click="chooseOption(index)"
            class="choice-btn"
          >
            {{ choice.text }}
          </button>
        </div>

        <!-- Dead End Message -->
        <div v-else-if="currentNode" class="text-center py-8">
          <p class="text-gray-600 dark:text-gray-400">The End</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStoryStore } from '../stores/story'
import StoryLibrary from '../components/StoryLibrary.vue'

const storyStore = useStoryStore()
const { campaign, currentNode, isStoryLoaded } = storeToRefs(storyStore)
const { chooseOption, resetStory } = storyStore
</script>
