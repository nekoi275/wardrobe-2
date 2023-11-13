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

interface Header {
  name: string
  displayName: string
  isFilter: boolean
}

const headers: { [name: string]: Array<Header> } = {
  clothes: [
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true },
    { name: 'season', displayName: 'SEASON', isFilter: true }
  ],
  accessories: [
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true },
    { name: '', displayName: '', isFilter: false }
  ],
  old: [
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true },
    { name: '', displayName: '', isFilter: false }
  ]
}

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

router.beforeEach((to) => {
  const api = useApiStore()
  const tableStore = useTableStore()
  const sidebarStore = useSidebarStore()
  if (to.name === 'clothes' || to.name === 'accessories') {
    const tableName = to.name
    tableStore.updateHeaders(headers[tableName])
    if (tableStore[tableName].length == 0) {
      getData(api, tableName, (response: any) => {
        tableStore[tableName] = [...response]
        tableStore.current.rows = [...tableStore[tableName].filter((item) => !item.isOld)]
        sidebarStore.getFilters(tableStore.current)
        tableStore.filtered = tableStore.current.rows
      })
    } else {
      tableStore.current.rows = [...tableStore[tableName].filter((item) => !item.isOld)]
      sidebarStore.getFilters(tableStore.current)
      tableStore.filtered = tableStore.current.rows
    }
  }
  if (to.name === 'old') {
    tableStore.updateHeaders(headers.old)
    tableStore.current.rows = []
    if (tableStore.clothes.length == 0) {
      getData(api, 'clothes', (response: any) => {
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
      getData(api, 'accessories', (response: any) => {
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
