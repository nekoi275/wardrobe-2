<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useTableStore } from '@/stores/table'
import { onBeforeMount } from 'vue'

const store = useTableStore()

// lifecycle hooks
onBeforeMount(() => {
  store.current = {
    headers: [
      { name: 'type', displayName: 'TYPE', isFilter: true },
      { name: 'color', displayName: 'COLOR', isFilter: true },
      { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
      { name: 'price', displayName: 'PRICE', isFilter: false },
      { name: 'year', displayName: 'YEAR', isFilter: true },
      { name: 'season', displayName: 'SEASON', isFilter: true }
    ],
    rows: [
      { type: 'clothes', color: '#81e6ef', description: 'zz', price: 123, year: 2023, season: 'winter', id: 'zz123', image: '' },
      { type: 'clothes', color: '#654ee8', description: 'zz', price: 123, year: 2023, season: 'winter', id: 'zz123', image: '' },
      { type: 'clothes', color: '#b6edde', description: 'zz', price: 123, year: 2023, season: 'winter', id: 'zz123', image: '' }
    ]
  }
})
</script>

<template>
  <SettingsSidebar></SettingsSidebar>
  <TableMode></TableMode>
</template>

<style></style>
