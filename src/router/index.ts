import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clothes',
      name: 'clothes',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClothesView.vue')
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: () => import('../views/AccessoriesView.vue')
    },
    {
      path: '/old',
      name: 'old',
      component: () => import('../views/OldView.vue')
    },
    {
      path: '/moodboard',
      name: 'moodboard',
      component: () => import('../views/MoodboardView.vue')
    }
  ]
})

export default router
