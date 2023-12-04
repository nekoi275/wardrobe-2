import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import type { ClothesInfo } from './interfaces'

export const useApiStore = defineStore('api', () => {
  const baseUrl = 'https://wardrobe-manager.denias.workers.dev/'
  const userName = ref('')
  const password = ref('')
  const isLoggedIn = ref(false)
  const isWrongCreds = ref(false)
  const requestConfig = computed(() => {
    return {
      headers: {
        Authorization: `Basic ${btoa(`${userName.value}:${password.value}`)}`
      }
    }
  })
  function login() {
    return fetch(`${baseUrl}?category=clothes`, requestConfig.value).then((response) => {
      if (response.ok) {
        isLoggedIn.value = true
        isWrongCreds.value = false
        router.push('/clothes')
        return `Successfully logged in`
      } else {
        isWrongCreds.value = true
        console.error('getting error.Status: ' + response.status)
      }
    })
  }
  function get(category: string) {
    return fetch(`${baseUrl}?category=${category}`, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function create(data: ClothesInfo, category: string) {
    return fetch(`${baseUrl}?category=${category}`, {
      ...requestConfig.value,
      method: 'POST',
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function edit(data: ClothesInfo, category: string) {
    return fetch(`${baseUrl}?category=${category}&id=${data.id}`, {
      ...requestConfig.value,
      method: 'PUT',
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function remove(category: string, id: string) {
    return fetch(`${baseUrl}?category=${category}&id=${id}`, {
      ...requestConfig.value,
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        return response
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function getImageUrl(id: string) {
    return `${baseUrl}image?id=${id}`
  }
  function createImage(data?: Blob) {
    if (data) {
      return fetch(`${baseUrl}image`, {
        ...requestConfig.value,
        method: 'PUT',
        body: data
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
        }
      })
    } else {
      return Promise.resolve()
    }
  }
  function editImage(data?: Blob, url?: string) {
    if (data) {
      return fetch(url || `${baseUrl}image`, {
        ...requestConfig.value,
        method: 'PUT',
        body: data
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
        }
      })
    } else {
      return Promise.resolve()
    }
  }
  function removeImage(url: string) {
    fetch(url, {
      ...requestConfig.value,
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        return response
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }

  return {
    userName,
    password,
    isLoggedIn,
    isWrongCreds,
    login,
    get,
    create,
    edit,
    remove,
    getImageUrl,
    createImage,
    editImage,
    removeImage
  }
})
