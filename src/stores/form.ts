import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ClothesInfo } from './interfaces'

export const useFormStore = defineStore('form', () => {
  const isOpen = ref(false)
  const formData = ref({} as ClothesInfo)
  const isSubmitted = ref(false)
  const previewImage = ref('')
  const imagePalette = ref([])
  const isValid = computed(() => {
    return (
      formData.value.type != '' &&
      formData.value.year != 0 &&
      formData.value.color != ''
    )
  })

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
      image: ''
    }
    previewImage.value = ''
    imagePalette.value = []
  }


  return { isOpen, formData, isValid, previewImage, isSubmitted, imagePalette, close }
})
