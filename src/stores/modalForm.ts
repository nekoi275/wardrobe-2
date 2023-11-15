import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo } from './interfaces'

export const useModalFormStore = defineStore('modalForm', () => {
  const isOpen = ref(false)
  const formData = ref({} as ClothesInfo)
  const previewImage = ref(false)

  return { isOpen, formData, previewImage }
})
