import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo, Header, CurrentTable } from './interfaces'

export const useTableStore = defineStore('tables', () => {
  const clothes = ref(undefined as ClothesInfo[] | undefined)
  const accessories = ref(undefined as ClothesInfo[] | undefined)
  const old = ref(undefined as ClothesInfo[] | undefined)
  const current = ref({} as CurrentTable)
  const sorting = ref({} as Sorting)
  const filtered = ref([] as ClothesInfo[])
  const totalAmount = ref(0)
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
    ],
    old: [
      { name: 'type', displayName: 'TYPE', isFilter: true },
      { name: 'color', displayName: 'COLOR', isFilter: true },
      { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
      { name: 'price', displayName: 'PRICE', isFilter: false },
      { name: 'year', displayName: 'YEAR', isFilter: true },
      { name: 'season', displayName: 'SEASON', isFilter: true }
    ]
  }
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
  function countTotal() {
    totalAmount.value = current.value.rows.length
  }

  return { clothes, accessories, old, current, sorting, filtered, totalAmount, headers, sort, updateHeaders, countTotal }
})

interface Sorting {
  field: string
  isAscending: boolean
}
