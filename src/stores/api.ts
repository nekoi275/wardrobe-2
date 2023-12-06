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
        Authorization: `Basic ${btoa(
          `${userName.value || localStorage.getItem('wardrobe-user')}:${
            password.value || localStorage.getItem('wardrobe-pass')
          }`
        )}`
      }
    }
  })
  function login() {
    return fetch(baseUrl, requestConfig.value).then((response) => {
      if (response.status !== 401) {
        isLoggedIn.value = true
        isWrongCreds.value = false
        localStorage.setItem('wardrobe-user', userName.value)
        localStorage.setItem('wardrobe-pass', password.value)
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
    return new URL(`${baseUrl}image?id=${id}&t=${new Date().getTime()}`, import.meta.url).href
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
  function editImage(data?: Blob, id?: string) {
    if (data) {
      const url = id ? `${baseUrl}image?id=${id}` : `${baseUrl}image`
      return fetch(url, {
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
  function removeImage(id: string) {
    fetch(getImageUrl(id), {
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
  function getImageIds() {
    return fetch(`${baseUrl}?category=moodboard&id=1`, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function updateImageIds(imageIds: Array<string>) {
    return fetch(`${baseUrl}?category=moodboard&id=1`, {
      ...requestConfig.value,
      method: 'PUT',
      body: JSON.stringify(imageIds)
    }).then((response) => {
      if (response.ok) {
        return response.json()
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
    removeImage,
    getImageIds,
    updateImageIds
  }
})
