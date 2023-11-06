<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useTableStore } from '@/stores/table'
import { onBeforeMount } from 'vue'
import { useApiStore } from '@/stores/api'

const api = useApiStore()
const store = useTableStore()

function updateData() {
  store.current.headers = [
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true },
    { name: '', displayName: '', isFilter: false }
  ]
  store.current.rows = store.accessories.filter((item) => !item.isOld)
}

function getData() {
  api
    .getAll('accessories')
    .then((response: any) => {
      store.accessories = [...response]
      updateData()
    })
    .catch((error) => console.error(error))
}

onBeforeMount(() => {
  getData()
})
</script>

<template>
  <TableMode></TableMode>
  <SettingsSidebar></SettingsSidebar>
</template>

<style></style>
