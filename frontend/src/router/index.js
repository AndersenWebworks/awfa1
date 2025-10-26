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

export default router
