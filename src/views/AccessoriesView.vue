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
      { name: 'year', displayName: 'YEAR', isFilter: true }
    ],
    rows: [
      { type: '1accessory', color: '#c8b273', description: 'zz', price: 123, year: 2023, id: 'zz123', image: '' },
      { type: '6accessory', color: '#c8b273', description: 'zz', price: 123, year: 2023, id: 'zz123', image: '' },
      { type: '9accessory', color: '#c8b273', description: 'zz', price: 123, year: 2023, id: 'zz123', image: '' }
    ]
  }
})
</script>

<template>
  <SettingsSidebar></SettingsSidebar>
  <TableMode></TableMode>
</template>

<style></style>
