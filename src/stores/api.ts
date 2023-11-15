import { defineStore } from 'pinia'
import { credentials } from '../../apicreds'
import img from '@/assets/default_image.jpg'

export const useApiStore = defineStore('api', () => {
  const url = credentials().url
  const apiKey = credentials().apiKey
  const requestConfig = {
    headers: {
      'x-apikey': apiKey
    }
  }

  function getAll(tableName: string) {
    return fetch(`${url}/rest/${tableName}?key=${apiKey}`, requestConfig).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  function getImage() {
    return img
  }

  return { getAll, getImage }
})
