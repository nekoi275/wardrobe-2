import { createRouter, createWebHistory } from 'vue-router'
import ClothesView from '../views/ClothesView.vue'
import AccessoriesView from '../views/AccessoriesView.vue'
import OldView from '../views/OldView.vue'
import MoodboardView from '../views/MoodboardView.vue'
import { useTableStore } from '@/stores/table'
import { useApiStore } from '@/stores/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clothes',
      name: 'clothes',
      component: ClothesView,
      beforeEnter: () => {
        const api = useApiStore()
        const store = useTableStore()

        api
          .getAll('clothes')
          .then((response: any) => {
            store.clothes = [...response]
            store.current.rows = store.clothes.filter((item) => !item.isOld)
          })
          .catch((error) => console.error(error))
      }
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: AccessoriesView,
      beforeEnter: () => {
        const api = useApiStore()
        const store = useTableStore()

        api
          .getAll('accessories')
          .then((response: any) => {
            store.accessories = [...response]
            store.current.rows = store.accessories.filter((item) => !item.isOld)
          })
          .catch((error) => console.error(error))
      }
    },
    {
      path: '/old',
      name: 'old',
      component: OldView,
      beforeEnter: () => {
        const api = useApiStore()
        const store = useTableStore()
        store.current.rows = []
        api
          .getAll('accessories')
          .then((response: any) => {
            store.accessories = [...response]
            store.current.rows.push(...store.accessories.filter((item) => item.isOld))
          })
          .catch((error) => console.error(error))

        api
          .getAll('clothes')
          .then((response: any) => {
            store.clothes = [...response]
            store.current.rows.push(...store.clothes.filter((item) => item.isOld))
          })
          .catch((error) => console.error(error))
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
