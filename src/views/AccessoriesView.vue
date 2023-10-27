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
      { name: 'year', displayName: 'YEAR' }
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
  <TableMode></TableMode>
</template>

<style></style>
