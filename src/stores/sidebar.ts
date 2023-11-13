import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const view = ref({} as View)
  const filters = ref({} as Filters)
  const availableFilters = ref({} as AvailableFilters)

  function getFilters(currentTable: CurrentTable) {
    const filters = currentTable.headers?.filter((h) => h.isFilter === true)
    const options = (() => {
      const rows = currentTable.rows
      const result: { [propName: string]: any } = {}
      for (let i = 0; i < filters.length; i++) {
        result[filters[i].name] = []
        for (let j = 0; j < rows.length; j++) {
          const option = rows[j][filters[i].name]
          if (!result[filters[i].name].includes(option)) {
            result[filters[i].name].push(option)
          }
        }
      }
      return result
    })()
    availableFilters.value.filters = filters
    availableFilters.value.options = options
  }

  function applyFilters(tableRows: Array<ClothesInfo>) {
    console.log(tableRows)
    return tableRows.filter(makeFilter(filters.value))
  }
  function makeFilter(filters: Filters) {
    console.log(filters)
    return (item: ClothesInfo) => {
      for (const [param, values] of Object.entries(filters)) {
        if (values.length > 0 && !values.includes(item[param])) {
          return false
        }
      }
      return true
    }
  }

  return { isOpen, view, filters, availableFilters, getFilters, applyFilters }
})

interface View {
  tableView: boolean
  cardsView: boolean
}

interface Filters {
  [propName: string]: Array<any>
}

interface ClothesInfo {
  type: string
  color: string
  description: string
  price: number
  year: number
  season?: string | null
  _id: string
  image: string
  isOld: boolean
  [propName: string]: any
}

interface Header {
  name: string
  displayName: string
  isFilter: boolean
}

interface CurrentTable {
  headers: Header[]
  rows: ClothesInfo[]
}

interface Options {
  [propName: string]: Array<any>
}

interface AvailableFilters {
  filters: Array<any>
  options: Options
}
