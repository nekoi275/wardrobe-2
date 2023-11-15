import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo, Header, CurrentTable } from './interfaces'

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

interface Sorting {
  field: string
  isAscending: boolean
}
