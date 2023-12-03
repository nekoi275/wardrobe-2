<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import ModalForm from '@/components/ModalForm.vue'
import CardsMode from '@/components/CardsMode.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'
import { useImageStore } from '@/stores/image'
import { useApiStore } from '@/stores/api'
import { useFormStore } from '@/stores/form'
import type { ClothesInfo } from '@/stores/interfaces'

const imageStore = useImageStore()
const tableStore = useTableStore()
const sidebarStore = useSidebarStore()
const api = useApiStore()
const formStore = useFormStore()

function applyFilters() {
  const filteredValues = sidebarStore.applyFilters(tableStore.current.rows)
  tableStore.filtered = filteredValues
}
function openImage(imageUrl: string) {
  imageStore.imageUrl = imageUrl
  imageStore.isOpen = true
}
function openForm(row: ClothesInfo) {
  formStore.isOpen = true
  formStore.formData = {...row}
}
function submit() {
  api.edit(
    (response) => {
      const index = tableStore.old?.findIndex((item) => item.id == response.id)!
      tableStore.old?.splice(index, 1, response)
      sidebarStore.getFilters(tableStore.current)
      applyFilters()
      formStore.isSubmitted = false
      formStore.close()
    },
    formStore.formData,
    'old',
    formStore.formData.id!
  )
}
function remove(id: string, imageUrl: string) {
  api.removeImage(imageUrl)
  api.remove(
    () => {
      api.get((response: any) => {
        tableStore.accessories = [...response]
        tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
        sidebarStore.getFilters(tableStore.current)
        applyFilters()
        tableStore.countTotal()
      }, 'old')
    },
    'old',
    id
  )
}
</script>

<template>
  <TableMode
    v-if="!sidebarStore.cardsView"
    @openImage="openImage"
    @openForm="openForm"
    @remove="remove"
    :isOld="true"
  ></TableMode>
  <SettingsSidebar
    @selected="applyFilters()"
    @deselected="applyFilters()"
    @colorSelected="applyFilters()"
  ></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm @submit="submit"></ModalForm>
  <CardsMode
    v-if="sidebarStore.cardsView"
    @openForm="openForm"
    @remove="remove"
    :isOld="true"
  ></CardsMode>
</template>

<style></style>
