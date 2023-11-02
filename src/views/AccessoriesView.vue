<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useTableStore } from '@/stores/table'
import { useApiStore } from '@/stores/api'
import { onBeforeMount } from 'vue'

const store = useTableStore()
const api = useApiStore()

// lifecycle hooks
onBeforeMount(() => {
  store.current.headers = [
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true }
  ]
  api
    .getAll('accessories')
    .then((response: any) => {
      console.log(response)
      store.current.rows = [...response]
    })
    .catch((error) => console.error(error))
})
</script>

<template>
  <TableMode></TableMode>
  <SettingsSidebar></SettingsSidebar>
</template>

<style></style>
