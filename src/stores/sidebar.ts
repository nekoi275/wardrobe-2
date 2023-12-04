import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo, CurrentTable } from '@/stores/interfaces'

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const cardsView = ref(true)
  const filters = ref({} as Filters)
  const availableFilters = ref([] as AvailableFilter[])

  function getFilters(currentTable: CurrentTable) {
    availableFilters.value = currentTable.headers.filter(h => h.isFilter === true).map(header => {
      const { name, displayName } = header
      const options = Array.from(new Set(currentTable.rows.map(row => row[name])))
      return {name, displayName, options} as AvailableFilter
    })
    filters.value = availableFilters.value.reduce((accumulator, value) => {
      return {...accumulator, [value.name]: []}
    }, {})
  }
  function applyFilters(tableRows: Array<ClothesInfo>) {
    return tableRows.filter(makeFilter(filters.value))
  }
  function makeFilter(filters: Filters) {
    return (item: ClothesInfo) => {
      for (const [param, values] of Object.entries(filters)) {
        if (values.length > 0 && !values.includes(item[param])) {
          return false
        }
      }
      return true
    }
  }

  return { isOpen, cardsView, filters, availableFilters, getFilters, applyFilters }
})

interface Filters {
  [propName: string]: Array<any>
}

interface AvailableFilter {
  name: string
  displayName: string
  options: Array<any>
}