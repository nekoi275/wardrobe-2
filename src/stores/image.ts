import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
    const isOpen = ref(false)
    const imageUrl = ref('')
    return { isOpen, imageUrl}
})
