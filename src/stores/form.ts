import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo } from './interfaces'

export const useFormStore = defineStore('form', () => {
  const isOpen = ref(false)
  const formData = ref({
    id: '',
    type: '',
    color: '',
    description: '',
    season: 'any',
    price: 0,
    year: 0,
    image: '',
    isOld: false
  } as ClothesInfo)
  const previewImage = ref(false)

  function close() {
    isOpen.value = false
    formData.value = {
      id: '',
      type: '',
      color: '',
      description: '',
      season: 'any',
      price: 0,
      year: new Date().getFullYear(),
      image: '',
      isOld: false
    }
  }

  return { isOpen, formData, previewImage, close }
})
