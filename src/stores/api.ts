import { defineStore } from 'pinia'
import { credentials } from '../../apicreds'

export const useApiStore = defineStore('api', () => {
  const url = credentials().url
  const apiKey = credentials().apiKey
  const mediaKey = credentials().mediaKey
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

  return { getAll }
})
