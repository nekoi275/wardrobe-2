import { createRouter, createWebHistory } from 'vue-router'
import ClothesView from '../views/ClothesView.vue'
import AccessoriesView from '../views/AccessoriesView.vue'
import OldView from '../views/OldView.vue'
import MoodboardView from '../views/MoodboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clothes',
      name: 'clothes',
      component: ClothesView
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: AccessoriesView
    },
    {
      path: '/old',
      name: 'old',
      component: OldView
    },
    {
      path: '/moodboard',
      name: 'moodboard',
      component: MoodboardView
    }
  ]
})

export default router
