<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import CardsMode from '@/components/CardsMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import ModalForm from '@/components/ModalForm.vue'
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
function openImage() {
  imageStore.imageUrl = api.getImage()
  imageStore.isOpen = true
}
function openForm(row?: ClothesInfo) {
  if (row) {
    formStore.isOpen = true
    formStore.formData = row
  } else {
    formStore.isOpen = true
    formStore.formData.year = new Date().getFullYear()
  }
}
function submit() {
  api.create(
    (response) => {
      api.getOne(
        () => {
          tableStore.clothes.push(response)
          tableStore.current.rows.push(response)
          applyFilters()
        },
        'clothes',
        response.id
      )

      formStore.isOpen = false
      formStore.formData = {
        id: '',
        type: '',
        color: '',
        description: '',
        price: 0,
        year: 0,
        image: '',
        season: '',
        isOld: false
      }
    },
    formStore.formData,
    'clothes'
  )
}
</script>

<template>
  <TableMode v-if="!sidebarStore.cardsView" @openImage="openImage" @openForm="openForm"></TableMode>
  <SettingsSidebar @selected="applyFilters()" @deselected="applyFilters()"></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm @submit="submit"></ModalForm>
  <button @click="openForm()">Add</button>
  <CardsMode v-if="sidebarStore.cardsView" @openForm="openForm"></CardsMode>
</template>

<style scoped>
button {
  margin-left: 70px;
}
</style>
