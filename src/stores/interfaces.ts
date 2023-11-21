interface ClothesInfo {
  type: string
  color: string
  description?: string
  price: number
  year: number
  season?: string
  id: string
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

export type {
    ClothesInfo,
    Header,
    CurrentTable
}
