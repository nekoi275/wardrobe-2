import { createRouter, createWebHistory } from 'vue-router'
import ClothesView from '../views/ClothesView.vue'
import AccessoriesView from '../views/AccessoriesView.vue'
import OldView from '../views/OldView.vue'
import MoodboardView from '../views/MoodboardView.vue'
import LoginView from '../views/LoginView.vue'
import { useTableStore } from '@/stores/table'
import { useApiStore } from '@/stores/api'
import { useSidebarStore } from '@/stores/sidebar'

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
  if (!api.isLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  }
  if (to.name === 'clothes') {
    tableStore.updateHeaders(tableStore.headers.clothes)
    if (tableStore.clothes.length == 0) {
      api.getClothes((response: any) => {
        tableStore.clothes = [...response]
        tableStore.current.rows = [...tableStore.clothes.filter((item) => !item.isOld)]
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
      })
    } else {
      tableStore.current.rows = [...tableStore.clothes.filter((item) => !item.isOld)]
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
    }
  }
  if (to.name === 'accessories') {
    tableStore.updateHeaders(tableStore.headers.accessories)
    if (tableStore.accessories.length == 0) {
      api.getAccessories((response: any) => {
        tableStore.accessories = [...response]
        tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
      })
    } else {
      tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
    }
  }
  if (to.name === 'old') {
    tableStore.updateHeaders(tableStore.headers.old)
    tableStore.current.rows = []
    if (tableStore.clothes.length == 0) {
      api.getClothes((response: any) => {
        tableStore.clothes = [...response]
        tableStore.current.rows.push(...tableStore.clothes.filter((item) => item.isOld))
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
      })
    } else {
      tableStore.current.rows.push(...tableStore.clothes.filter((item) => item.isOld))
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
    }
    if (tableStore.accessories.length == 0) {
      api.getAccessories((response: any) => {
        tableStore.accessories = [...response]
        tableStore.current.rows.push(...tableStore.accessories.filter((item) => item.isOld))
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
      })
    } else {
      tableStore.current.rows.push(...tableStore.accessories.filter((item) => item.isOld))
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
    }
  }
})
export default router
