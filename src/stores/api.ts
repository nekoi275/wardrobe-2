import { defineStore } from 'pinia'
import { credentials } from '../../apicreds'

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
//https://clothes-c8bd.restdb.io/media/6552387b02ff4b550000bf55
  function getImage(imageId: string) {
    return `${url}/media/${imageId}`
  }

  return { getAll, getImage }
})
