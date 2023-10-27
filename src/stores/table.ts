import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTableStore = defineStore('tables', () => {
  const headers = ref([] as Header[]);
  const clothes = ref([] as ClothesInfo[]);
  const accessories = ref([] as ClothesInfo[]);
  const old = ref([] as ClothesInfo[]);
  const current = ({} as CurrentTable);

  return { headers, clothes, accessories, old, current }
})

interface ClothesInfo {
  type: string
  color: string
  description: string
  price: number
  year: number
  season: string,
  id: string,
  image: string
}

interface Header {
  name: string
  displayName: string
}

interface CurrentTable {
  headers: Header[]
  rows: ClothesInfo[]
}