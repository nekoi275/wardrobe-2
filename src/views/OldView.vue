<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import { useTableStore } from '@/stores/table'
import { onBeforeMount } from 'vue'

const store = useTableStore()

onBeforeMount(() => {
  store.updateHeaders([
    { name: 'type', displayName: 'TYPE', isFilter: true },
    { name: 'color', displayName: 'COLOR', isFilter: true },
    { name: 'description', displayName: 'DESCRIPTION', isFilter: false },
    { name: 'price', displayName: 'PRICE', isFilter: false },
    { name: 'year', displayName: 'YEAR', isFilter: true },
    { name: 'season', displayName: 'SEASON', isFilter: true }
  ])
})
</script>

<template>
  <SettingsSidebar></SettingsSidebar>
  <TableMode></TableMode>
</template>

<style></style>
