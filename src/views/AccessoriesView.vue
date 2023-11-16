<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import ModalForm from '@/components/ModalForm.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'
import { useImageModalStore } from '@/stores/imageModal'
import { useApiStore } from '@/stores/api'
import { useFormStore } from '@/stores/form'
import type { ClothesInfo } from '@/stores/interfaces'

const imageModalStore = useImageModalStore()
const tableStore = useTableStore()
const sidebarStore = useSidebarStore()
const api = useApiStore()
const formStore = useFormStore()

function applyFilters() {
  const filteredValues = sidebarStore.applyFilters(tableStore.current.rows)
  tableStore.filtered = filteredValues
}
function openImage() {
  imageModalStore.imageUrl = api.getImage()
  imageModalStore.isOpen = true
}
function openForm(row: ClothesInfo) {
  formStore.isOpen = true
  formStore.formData = row
}
</script>

<template>
  <TableMode @openImage="openImage" @openForm="openForm"></TableMode>
  <SettingsSidebar @selected="applyFilters()" @deselected="applyFilters()"></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm></ModalForm>
  <button @click="formStore.isOpen = true">Add</button>
</template>

<style scoped>
button {
  margin-left: 70px;
}
</style>
