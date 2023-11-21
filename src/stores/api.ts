import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import type { ClothesInfo } from './interfaces'

export const useApiStore = defineStore('api', () => {
  const baseUrl = 'https://wardrobe-manager.denias.workers.dev/'
  //const baseUrl = 'http://192.168.100.4:8787'
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
    return fetch(baseUrl, requestConfig.value).then((response) => {
      if (response.ok) {
        isLoggedIn.value = true
        router.push('/clothes')
        return `Successfully logged in`
      } else {
        console.error('getting error.Status: ' + response.status)
      }
    })
  }
  function get(callback: (response: any) => void, category?: string) {
    const url = category === 'accessories' ? `${baseUrl}?category=${category}` : baseUrl
    fetch(url, requestConfig.value)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
        }
      })
      .then(callback)
      .catch((error: any) => console.error(error))
  }
  function getOne(callback: (response: any) => void, category: string, id: string) {
    fetch(`${baseUrl}?category=${category}&id=${id}`, requestConfig.value)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
        }
      })
      .then(callback)
      .catch((error: any) => console.error(error))
  }
  function getImage() {
    return ''
  }
  function create(callback: (response: any) => void, data: ClothesInfo, category: string) {
    fetch(`${baseUrl}?category=${category}`, {
      ...requestConfig.value,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
        }
      })
      .then(callback)
      .catch((error: any) => console.error(error))
  }

  return {
    userName,
    password,
    isLoggedIn,
    login,
    get,
    getOne,
    getImage,
    create
  }
})
