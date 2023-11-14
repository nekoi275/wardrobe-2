<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'
import { useImageModalStore } from '@/stores/imageModal'
import { useApiStore } from '@/stores/api'

const imageModalStore = useImageModalStore()
const tableStore = useTableStore()
const sidebarStore = useSidebarStore()
const api = useApiStore()

function applyFilters() {
  const filteredValues = sidebarStore.applyFilters(tableStore.current.rows)
  tableStore.filtered = filteredValues
}
function openImage(imageId: string) {
  imageModalStore.imageUrl = api.getImage(imageId)
  imageModalStore.isOpen = true
}
</script>

<template>
  <TableMode @openImage="openImage"></TableMode>
  <SettingsSidebar @selected="applyFilters()" @deselected="applyFilters()"></SettingsSidebar>
  <ImageModal></ImageModal>
</template>

<style></style>
