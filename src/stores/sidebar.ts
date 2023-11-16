import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo, CurrentTable } from './interfaces'

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const cardsView = ref(false)
  const filters = ref({} as Filters)
  const availableFilters = ref({} as AvailableFilters)

  function getFilters(currentTable: CurrentTable) {
    const filters = currentTable.headers.filter(h => h.isFilter === true)
    availableFilters.value.filters = filters
    const filterNames = filters.map(f => {return f.name})
    const options = (() => {
      const rows = currentTable.rows
      const result: { [propName: string]: any } = {}
      for (let i = 0; i < filterNames.length; i++) {
        result[filterNames[i]] = []
        for (let j = 0; j < rows.length; j++) {
          const option = rows[j][filterNames[i]]
          if (option && !result[filterNames[i]].includes(option)) {
            result[filterNames[i]].push(option)
          }
        }
      }
      return result
    })()
    availableFilters.value.options = options
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

interface Options {
  [propName: string]: Array<any>
}

interface AvailableFilters {
  filters: Array<any>
  options: Options
}
