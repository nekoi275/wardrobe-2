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
    price: 0,
    year: 0,
    image: '',
    isOld: false
  } as ClothesInfo)
  const previewImage = ref(false)

  return { isOpen, formData, previewImage }
})
