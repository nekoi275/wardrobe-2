import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTableStore = defineStore('tables', () => {
  const clothes = ref([] as ClothesInfo[])
  const accessories = ref([] as ClothesInfo[])
  const current = ref({} as CurrentTable)
  const sorting = ref({} as Sorting)
  const filtered = ref([] as ClothesInfo[])
  const totalAmount = ref(0)

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
  function updateHeaders(headers: Header[]) {
    current.value.headers = headers
  }
  function calculateTotalAmount() {
    totalAmount.value = current.value.rows.length
  }

  return { clothes, accessories, current, sorting, filtered, totalAmount, sort, updateHeaders, calculateTotalAmount }
})

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

interface Sorting {
  field: string
  isAscending: boolean
}
