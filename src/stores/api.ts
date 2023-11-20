import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'

export const useApiStore = defineStore('api', () => {
  const url = 'https://wardrobe-manager.denias.workers.dev/'
  const userName = ref('')
  const password = ref('')
  const isLoggedIn = ref(false)
  const requestConfig = computed(() => {
    return {
      headers: {
        Authorization: `Basic ${btoa(`${userName.value}:${password.value}`)}`
      }
    }
  })

  function login() {
    return fetch(url, requestConfig.value).then((response) => {
      if (response.ok) {
        isLoggedIn.value = true
        router.push('/clothes')
        return `Successfully logged in`
      } else {
        console.error('getting error.Status: ' + response.status)
      }
    })
  }

  function getClothes(callback: (response: any) => void) {
    fetch(url, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    }).then(callback)
    .catch((error: any) => console.error(error))
  }
  function getAccessories(callback: (response: any) => void) {
    fetch(`${url}?category=accessories`, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    }).then(callback)
    .catch((error: any) => console.error(error))
  }
  function getImage() {
    return ''
  }

  return { userName, password, isLoggedIn, requestConfig, getClothes, getAccessories, getImage, login }
})
