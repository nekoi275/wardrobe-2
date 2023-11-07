import { createRouter, createWebHistory } from 'vue-router'
import ClothesView from '../views/ClothesView.vue'
import AccessoriesView from '../views/AccessoriesView.vue'
import OldView from '../views/OldView.vue'
import MoodboardView from '../views/MoodboardView.vue'
import { useTableStore } from '@/stores/table'
import { useApiStore } from '@/stores/api'
import { useSidebarStore } from '@/stores/sidebar'

function getData(apiStore: any, tableName: String, callback: (response: any) => void) {
  apiStore
    .getAll(tableName)
    .then(callback)
    .catch((error: any) => console.error(error))
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clothes',
      name: 'clothes',
      component: ClothesView,
      beforeEnter: () => {
        const api = useApiStore()
        const tableStore = useTableStore()
        const sidebarStore = useSidebarStore()
        tableStore.updateHeaders([
          { name: 'type', displayName: 'TYPE', isFilter: true },
          { name: 'color', displayName: 'COLOR', isFilter: true },
          { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
          { name: 'price', displayName: 'PRICE', isFilter: false },
          { name: 'year', displayName: 'YEAR', isFilter: true },
          { name: 'season', displayName: 'SEASON', isFilter: true }
        ])
        if (tableStore.clothes.length == 0) {
          getData(api, 'clothes', (response: any) => {
            tableStore.clothes = [...response]
            tableStore.current.rows = [...tableStore.clothes.filter((item) => !item.isOld)]
            sidebarStore.getFilters(tableStore.current)
          })
        } else {
          tableStore.current.rows = [...tableStore.clothes.filter((item) => !item.isOld)]
          sidebarStore.getFilters(tableStore.current)
        }
      }
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: AccessoriesView,
      beforeEnter: () => {
        const api = useApiStore()
        const tableStore = useTableStore()
        const sidebarStore = useSidebarStore()
        tableStore.updateHeaders([
          { name: 'type', displayName: 'TYPE', isFilter: true },
          { name: 'color', displayName: 'COLOR', isFilter: true },
          { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
          { name: 'price', displayName: 'PRICE', isFilter: false },
          { name: 'year', displayName: 'YEAR', isFilter: true },
          { name: '', displayName: '', isFilter: false }
        ])
        if (tableStore.accessories.length == 0) {
          getData(api, 'accessories', (response: any) => {
            tableStore.accessories = [...response]
            tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
            sidebarStore.getFilters(tableStore.current)
          })
        } else {
          tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
          sidebarStore.getFilters(tableStore.current)
        }
      }
    },
    {
      path: '/old',
      name: 'old',
      component: OldView,
      beforeEnter: () => {
        const api = useApiStore()
        const tableStore = useTableStore()
        const sidebarStore = useSidebarStore()
        tableStore.updateHeaders([
          { name: 'type', displayName: 'TYPE', isFilter: true },
          { name: 'color', displayName: 'COLOR', isFilter: true },
          { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
          { name: 'price', displayName: 'PRICE', isFilter: false },
          { name: 'year', displayName: 'YEAR', isFilter: true },
          { name: 'season', displayName: 'SEASON', isFilter: true }
        ])
        tableStore.current.rows = []
        if (tableStore.clothes.length == 0) {
          getData(api, 'clothes', (response: any) => {
            tableStore.clothes = [...response]
            tableStore.current.rows.push(...tableStore.clothes.filter((item) => item.isOld))
            sidebarStore.getFilters(tableStore.current)
          })
        } else {
          tableStore.current.rows.push(...tableStore.clothes.filter((item) => item.isOld))
          sidebarStore.getFilters(tableStore.current)
        }
        if (tableStore.accessories.length == 0) {
          getData(api, 'accessories', (response: any) => {
            tableStore.accessories = [...response]
            tableStore.current.rows.push(...tableStore.accessories.filter((item) => item.isOld))
            sidebarStore.getFilters(tableStore.current)
          })
        } else {
          tableStore.current.rows.push(...tableStore.accessories.filter((item) => item.isOld))
          sidebarStore.getFilters(tableStore.current)
        }
      }
    },
    {
      path: '/moodboard',
      name: 'moodboard',
      component: MoodboardView
    }
  ]
})

export default router
