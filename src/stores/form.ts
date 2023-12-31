import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo } from './interfaces'

export const useFormStore = defineStore('form', () => {
  const isOpen = ref(false)
  const formData = ref({} as ClothesInfo)
  const isSubmitted = ref(false)
  const previewImage = ref('')
  const imagePalette = ref([])
  const imageData = ref()
  const isValid = computed(() => {
    return {
      type: formData.value.type != undefined && formData.value.type != '',
      year: formData.value.year != undefined && formData.value.year != 0,
      color: formData.value.color != undefined && formData.value.color != ''
    }
  })

  function close() {
    isOpen.value = false
    formData.value = {
      type: '',
      color: '',
      description: '',
      season: 'any',
      price: 0,
      year: new Date().getFullYear(),
      image: ''
    }
    previewImage.value = ''
    imagePalette.value = []
    isSubmitted.value = false
    imageData.value = null
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput.value = ''
  }

  return { isOpen, formData, isValid, previewImage, isSubmitted, imagePalette, imageData, close }
})
