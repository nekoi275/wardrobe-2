import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageModalStore = defineStore('imageModal', () => {
    const isOpen = ref(false)
    const imageUrl = ref('')
    return { isOpen, imageUrl}
})
