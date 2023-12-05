import { defineStore } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'
import { useImageStore } from '@/stores/image'
import { useApiStore } from '@/stores/api'
import { useFormStore } from '@/stores/form'
import type { ClothesInfo } from '@/stores/interfaces'
export const useGeneralStore = defineStore('general', () => {
  const imageStore = useImageStore()
  const tableStore = useTableStore()
  const sidebarStore = useSidebarStore()
  const api = useApiStore()
  const formStore = useFormStore()

  function applyFilters() {
    const filteredValues = sidebarStore.applyFilters(tableStore.current.rows)
    tableStore.filtered = filteredValues
  }
  function openImage(id?: string) {
    if (id) {
      imageStore.imageUrl = api.getImageUrl(id)
      imageStore.isOpen = true
    }
  }
  function openForm(row?: ClothesInfo) {
    if (row) {
      formStore.isOpen = true
      formStore.formData = { ...row }
    } else {
      formStore.isOpen = true
      formStore.formData.year = new Date().getFullYear()
      formStore.formData.season = 'any'
      formStore.formData.price = 0
    }
  }
  function create(category: 'clothes' | 'old' | 'accessories') {
    api.createImage(formStore.imageData).then((response) => {
      if (response?.id) {
        formStore.formData.image = response.id
      }
      api.create(formStore.formData, category).then((response) => {
        tableStore[category]?.push(response)
        sidebarStore.getFilters(tableStore.current)
        applyFilters()
        formStore.isSubmitted = false
        tableStore.countTotal()
        formStore.close()
      })
    })
  }
  function edit(category: 'clothes' | 'old' | 'accessories') {
    api.editImage(formStore.imageData, formStore.formData.image)?.then((response) => {
      if (response?.id) {
        formStore.formData.image = response.id
      }
      api.edit(formStore.formData, category).then((response) => {
        const index = tableStore[category]?.findIndex((item) => item.id == response.id)!
        tableStore[category]?.splice(index, 1, response)
        sidebarStore.getFilters(tableStore.current)
        applyFilters()
        formStore.isSubmitted = false
        formStore.close()
      })
    })
  }
  function submit(category: 'clothes' | 'old' | 'accessories') {
    formStore.isSubmitted = true
    if (formStore.isValid.type && formStore.isValid.color && formStore.isValid.year) {
      if (formStore.formData.id) {
        edit(category)
      } else {
        create(category)
      }
    }
  }
  function remove(category: 'clothes' | 'old' | 'accessories') {
    return (id: string, imageId: string) => {
      api.remove(category, id).then(() => {
        api.removeImage(imageId)
        api.get(category).then((response: any) => {
          tableStore[category] = [...response]
          tableStore.current.rows = [...tableStore[category]!.filter((item) => !item.isOld)]
          sidebarStore.getFilters(tableStore.current)
          applyFilters()
          tableStore.countTotal()
        })
      })
    }
  }
  function moveToOld(category: 'clothes' | 'accessories') {
    return (row: ClothesInfo) => {
      const id = row.id!
      row.id = undefined
      api.create(row, 'old').then((response) => {
        api.remove(category, id).then(() => {
          api.get(category).then((response: any) => {
            tableStore[category] = [...response]
            tableStore.current.rows = [...tableStore[category]!]
            sidebarStore.getFilters(tableStore.current)
            applyFilters()
            tableStore.countTotal()
          })
        })
        tableStore.old?.push(response)
        formStore.close()
      })
    }
  }
  return { applyFilters, openImage, openForm, submit, remove, moveToOld }
})
