<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import ModalForm from '@/components/ModalForm.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'
import { useImageModalStore } from '@/stores/imageModal'
import { useApiStore } from '@/stores/api'
import { useModalFormStore } from '@/stores/modalForm'

const imageModalStore = useImageModalStore()
const tableStore = useTableStore()
const sidebarStore = useSidebarStore()
const api = useApiStore()
const modalFormStore = useModalFormStore()

function applyFilters() {
  const filteredValues = sidebarStore.applyFilters(tableStore.current.rows)
  tableStore.filtered = filteredValues
}
function openImage() {
  imageModalStore.imageUrl = api.getImage()
  imageModalStore.isOpen = true
}
</script>

<template>
  <TableMode @openImage="openImage"></TableMode>
  <SettingsSidebar @selected="applyFilters()" @deselected="applyFilters()"></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm></ModalForm>
  <button @click="modalFormStore.isOpen = true">Add</button>
</template>

<style scoped>
button {
  margin-left: 70px;
}
</style>
