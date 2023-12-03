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
  function openImage(imageUrl: string) {
    imageStore.imageUrl = imageUrl
    imageStore.isOpen = true
  }
  function openForm(row?: ClothesInfo) {
    if (row) {
      formStore.isOpen = true
      formStore.formData = { ...row }
    } else {
      formStore.isOpen = true
      formStore.formData.year = new Date().getFullYear()
      formStore.formData.season = 'any'
    }
  }
  function submit(category: 'clothes' | 'old' | 'accessories') {
    formStore.isSubmitted = true
    if (formStore.isValid) {
      if (formStore.formData.id) {
        api.edit(
          (response) => {
            const index = tableStore[category]?.findIndex((item) => item.id == response.id)!
            tableStore[category]?.splice(index, 1, response)
            sidebarStore.getFilters(tableStore.current)
            applyFilters()
            formStore.isSubmitted = false
            formStore.close()
          },
          formStore.formData,
          category,
          formStore.formData.id
        )
      } else {
        api.createImage(formStore.imageData).then((response) => {
          if (response?.id) {
            formStore.formData.image = api.getImage(response.id)
          }
          api.create(
            (response) => {
              tableStore[category]?.push(response)
              sidebarStore.getFilters(tableStore.current)
              applyFilters()
              formStore.isSubmitted = false
              tableStore.countTotal()
              formStore.close()
            },
            formStore.formData,
            category
          )
        })
      }
    }
  }
  function remove(category: 'clothes' | 'old' | 'accessories') {
    return (id: string, imageUrl: string) => {
      api.remove(
        () => {
          api.removeImage(imageUrl)
          api.get((response: any) => {
            tableStore[category] = [...response]
            tableStore.current.rows = [...tableStore[category]!.filter((item) => !item.isOld)]
            sidebarStore.getFilters(tableStore.current)
            applyFilters()
            tableStore.countTotal()
          }, category)
        },
        category,
        id
      )
    }
  }
  function moveToOld(category: 'clothes' | 'accessories') {
    return (row: ClothesInfo) => {
      api.create(
        (response) => {
          api.remove(
            () => {
              api.get((response: any) => {
                tableStore[category] = [...response]
                tableStore.current.rows = [...tableStore[category]!]
                sidebarStore.getFilters(tableStore.current)
                applyFilters()
                tableStore.countTotal()
              }, category)
            },
            category,
            row.id!
          )
          tableStore.old?.push(response)
          formStore.close()
        },
        row,
        'old'
      )
    }
  }
  return { applyFilters, openImage, openForm, submit, remove, moveToOld }
})
