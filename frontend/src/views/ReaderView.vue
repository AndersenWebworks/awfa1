<template>
  <div class="min-h-screen bg-reader-bg dark:bg-reader-bg-dark safe-area">
    <!-- Reader Header (sticky, always visible when story loaded) -->
    <ReaderHeader v-if="isStoryLoaded" :show-progress="true" />

    <div class="container-mobile" :class="{ 'pt-4': isStoryLoaded }">
      <!-- Story Library (when no story is loaded) -->
      <StoryLibrary v-if="!isStoryLoaded" />

      <!-- Story Display -->
      <div v-else class="reader-content">
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
import ReaderHeader from '../components/ReaderHeader.vue'

const storyStore = useStoryStore()
const { campaign, currentNode, isStoryLoaded } = storeToRefs(storyStore)
const { chooseOption, resetStory } = storyStore
</script>
