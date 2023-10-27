import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTableStore = defineStore('tables', () => {
  const headers = ref([] as Header[])
  const clothes = ref([] as ClothesInfo[])
  const accessories = ref([] as ClothesInfo[])
  const old = ref([] as ClothesInfo[])
  const current = ref({} as CurrentTable)
  const sorting = ref({} as Sorting)

  function sort() {
    return current.value.rows.sort((item1: ClothesInfo, item2: ClothesInfo) => {
      const field = sorting.value.field
      let result = 0
      if (item1[field] > item2[field]) {
        result = 1
      }
      if (item1[field] < item2[field]) {
        result = -1
      }
      if (!sorting.value.isAscending) {
        result = -result
      }
      return result
    })
  }

  return { headers, clothes, accessories, old, current, sorting, sort }
})

interface ClothesInfo {
  type: string
  color: string
  description: string
  price: number
  year: number
  season?: string | null
  id: string
  image: string
  [propName: string]: any
}

interface Header {
  name: string
  displayName: string
}

interface CurrentTable {
  headers: Header[]
  rows: ClothesInfo[]
}

interface Sorting {
  field: string
  isAscending: boolean
}
