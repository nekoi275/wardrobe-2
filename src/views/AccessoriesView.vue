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
    formStore.formData.season = 'any'
  }
}
function submit() {
  formStore.isSubmitted = true
  if (formStore.isValid) {
    if (formStore.formData.id) {
      api.edit(
        (response) => {
          api.getOne(
            () => {
              tableStore.accessories.map((item) => (item.id !== response.id ? item : response))
              tableStore.current.rows.map((item) => (item.id !== response.id ? item : response))
              sidebarStore.getFilters(tableStore.current)
              applyFilters()
              formStore.isSubmitted = false
            },
            'accessories',
            response.id
          )
          formStore.close()
        },
        formStore.formData,
        'accessories',
        formStore.formData.id
      )
    } else {
      api.create(
        (response) => {
          api.getOne(
            () => {
              tableStore.accessories.push(response)
              tableStore.current.rows.push(response)
              sidebarStore.getFilters(tableStore.current)
              applyFilters()
              formStore.isSubmitted = false
              tableStore.countTotal()
            },
            'accessories',
            response.id
          )
          formStore.close()
        },
        formStore.formData,
        'accessories'
      )
    }
  }
}
function remove(id: string) {
  api.remove(
    () => {
      api.get((response: any) => {
        tableStore.accessories = [...response]
        tableStore.current.rows = [...tableStore.accessories.filter((item) => !item.isOld)]
        sidebarStore.getFilters(tableStore.current)
        applyFilters()
        tableStore.countTotal()
      }, 'accessories')
    },
    'accessories',
    id
  )
}
function moveToOld(row: ClothesInfo) {
  api.create(
    (response) => {
      api.remove(
        () => {
          api.get((response: any) => {
            tableStore.accessories = [...response]
            tableStore.current.rows = [...tableStore.accessories]
            sidebarStore.getFilters(tableStore.current)
            applyFilters()
            tableStore.countTotal()
          }, 'accessories')
        },
        'accessories',
        row.id
      )
      tableStore.old.push(response)
      formStore.close()
    },
    row,
    'old'
  )
}
</script>

<template>
  <TableMode
    v-if="!sidebarStore.cardsView"
    @openImage="openImage"
    @openForm="openForm"
    @remove="remove"
    @moveToOld="moveToOld"
    :isOld="false"
  ></TableMode>
  <SettingsSidebar @selected="applyFilters()" @deselected="applyFilters()"></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm @submit="submit"></ModalForm>
  <button @click="openForm()">Add</button>
  <CardsMode
    v-if="sidebarStore.cardsView"
    @openForm="openForm"
    @remove="remove"
    @moveToOld="moveToOld"
    :isOld="false"
  ></CardsMode>
</template>

<style scoped>
button {
  margin-left: 70px;
}
</style>
