<template>
  <div class="app-container">
    <AppNav />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
