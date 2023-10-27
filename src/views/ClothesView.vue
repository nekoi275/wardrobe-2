<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import { useTableStore } from '@/stores/table'
import { onMounted } from 'vue'

const store = useTableStore()

// lifecycle hooks
onMounted(() => {
  store.current = {
    headers: [
      { name: 'type', displayName: 'TYPE' },
      { name: 'color', displayName: 'COLOR' },
      { name: 'description', displayName: 'DESCRIPTION' },
      { name: 'price', displayName: 'PRICE' },
      { name: 'year', displayName: 'YEAR' },
      { name: 'season', displayName: 'SEASON' }
    ],
    rows: [
      { type: '1clothes', color: '#81e6ef', description: '1zz', price: 123, year: 2023, season: 'winter', id: 'zz123', image: '' },
      { type: '2clothes', color: '#654ee8', description: '2zz', price: 123, year: 2023, season: 'summer', id: 'zz123', image: '' },
      { type: '3clothes', color: '#b6edde', description: '3zz', price: 123, year: 2023, season: 'autumn', id: 'zz123', image: '' },
      { type: '4clothes', color: '#654ee8', description: '2zz', price: 123, year: 2023, season: 'summer', id: 'zz123', image: '' },

    ]
  }
})
</script>

<template>
  <TableMode></TableMode>
</template>

<style></style>
