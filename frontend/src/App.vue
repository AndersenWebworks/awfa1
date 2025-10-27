<template>
  <div class="app-container">
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
