import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReaderView from '../views/ReaderView.vue'
import EditorView from '../views/EditorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reader',
      name: 'reader',
      component: ReaderView,
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
    },
  ],
})

// Navigation Guard: Redirect direct access to sub-routes to home
// This helps first-time users understand the app structure
let isFirstNavigation = true

router.beforeEach((to, from) => {
  // Only redirect on first navigation (direct URL access)
  // AND if going to /reader or /editor
  // NOT if navigating FROM another route (internal navigation)
  if (isFirstNavigation && (to.path === '/reader' || to.path === '/editor') && from.name === undefined) {
    isFirstNavigation = false
    return { path: '/' }
  }

  // After first navigation, allow all routes
  isFirstNavigation = false
})

export default router
