import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const view = ref({} as View)
  const filters = ref({} as Filters)
  
  return { isOpen, view, filters }
})

interface View {
    tableView: boolean
    cardsView: boolean
}

interface Filters {
  [propName: string]: Array<any>
}
