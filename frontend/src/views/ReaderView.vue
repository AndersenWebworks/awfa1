<template>
  <div class="min-h-screen bg-paper dark:bg-paper-dark safe-area">
    <!-- Reader Header (sticky, always visible when story loaded) -->
    <ReaderHeader v-if="isStoryLoaded" :show-progress="true" />

    <!-- Library Mode - browsing stories -->
    <div v-if="!isStoryLoaded" class="library-mode container-mobile pt-4">
      <StoryLibrary />
    </div>

    <!-- Reading Mode - immersive story reading -->
    <div v-else class="reading-mode">
      <div class="reader-content-wrapper">
        <!-- Current Node Text -->
        <div class="reader-text" v-if="currentNode">
          <p class="whitespace-pre-wrap">{{ currentNode.content.text }}</p>
        </div>

        <!-- Choices -->
        <div v-if="currentNode && currentNode.choices && currentNode.choices.length > 0" class="choices-container">
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

<style scoped>
/* Library Mode - standard browsing UI */
.library-mode {
  /* Uses standard container-mobile padding from global CSS */
}

/* Reading Mode - immersive, full-focus */
.reading-mode {
  /* Center content with optimal reading width */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 4rem 1rem; /* Extra bottom padding for breathing room */
  min-height: calc(100vh - 60px); /* Account for ReaderHeader */
}

.reader-content-wrapper {
  width: 100%;
  max-width: 42rem; /* ~65-75 characters per line - optimal reading */
}

/* Story Text - reading optimized */
.reader-text {
  margin-bottom: 3rem;
  line-height: 1.8;
  font-size: 1.125rem; /* Slightly larger for reading */
}

@media (max-width: 640px) {
  .reader-text {
    font-size: 1rem;
    line-height: 1.75;
  }

  .reading-mode {
    padding: 1.5rem 1rem 3rem 1rem; /* Extra bottom padding on mobile */
  }
}

/* Choices - subtle but clear */
.choices-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
}
</style>
