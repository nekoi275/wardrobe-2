<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
//import { useTableStore } from '@/stores/table'
import { onBeforeMount } from 'vue'

//const store = useTableStore()

// lifecycle hooks
onBeforeMount(() => {})
</script>

<template>
  <SettingsSidebar></SettingsSidebar>
  <TableMode></TableMode>
</template>

<style></style>
