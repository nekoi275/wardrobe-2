import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMoodboardStore = defineStore('moodboard', () => {
  const images = ref([])
  return { images }
})
