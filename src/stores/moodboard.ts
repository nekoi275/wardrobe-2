import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMoodboardStore = defineStore('moodboard', () => {
  const images = ref()
  const imageData = ref()
  return { images, imageData }
})
