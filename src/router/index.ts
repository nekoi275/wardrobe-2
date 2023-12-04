import { createRouter, createWebHistory } from 'vue-router'
import ClothesView from '../views/ClothesView.vue'
import AccessoriesView from '../views/AccessoriesView.vue'
import OldView from '../views/OldView.vue'
import MoodboardView from '../views/MoodboardView.vue'
import LoginView from '../views/LoginView.vue'
import { useTableStore } from '@/stores/table'
import { useApiStore } from '@/stores/api'
import { useSidebarStore } from '@/stores/sidebar'
import { useMoodboardStore } from '@/stores/moodboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
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

router.beforeEach((to) => {
  const api = useApiStore()
  const tableStore = useTableStore()
  const sidebarStore = useSidebarStore()
  const moodboardStore = useMoodboardStore()
  if (!api.isLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  }
  if (to.name === 'clothes' || to.name === 'accessories' || to.name === 'old') {
    const tableName = to.name
    tableStore.updateHeaders(tableStore.headers[tableName])
    if (tableStore[tableName] === undefined) {
      api.get(tableName).then((response: any) => {
        tableStore[tableName] = response
        tableStore.current.rows = tableStore[tableName]!
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
        tableStore.countTotal()
      })
    } else {
      tableStore.current.rows = tableStore[tableName]!
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
      tableStore.countTotal()
    }
  }
  if (to.name === 'moodboard') {
    api.getImageIds().then((response) => {
      moodboardStore.images = response
    })
  }
})
export default router
