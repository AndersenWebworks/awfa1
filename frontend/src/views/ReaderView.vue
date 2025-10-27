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

        <!-- Ending Screen -->
        <EndingScreen v-else-if="currentNode" :show-next-suggestion="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStoryStore } from '../stores/story'
import StoryLibrary from '../components/StoryLibrary.vue'
import ReaderHeader from '../components/ReaderHeader.vue'
import EndingScreen from '../components/EndingScreen.vue'

const storyStore = useStoryStore()
const { campaign, currentNode, isStoryLoaded } = storeToRefs(storyStore)
const { chooseOption, resetStory } = storyStore
</script>
