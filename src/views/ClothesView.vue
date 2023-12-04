<script setup lang="ts">
import TableMode from '@/components/TableMode.vue'
import CardsMode from '@/components/CardsMode.vue'
import SettingsSidebar from '@/components/SettingsSidebar.vue'
import ImageModal from '@/components/ImageModal.vue'
import ModalForm from '@/components/ModalForm.vue'
import { useGeneralStore } from '@/stores/general'
import { useSidebarStore } from '@/stores/sidebar'

const generalStore = useGeneralStore()
const sidebarStore = useSidebarStore()
const removeHandler = generalStore.remove('clothes')
const moveToOldHandler = generalStore.remove('clothes')
</script>

<template>
  <TableMode
    v-if="!sidebarStore.cardsView"
    @openImage="generalStore.openImage"
    @openForm="generalStore.openForm"
    @remove="removeHandler"
    @moveToOld="moveToOldHandler"
    :isOld="false"
  ></TableMode>
  <SettingsSidebar
    @selected="generalStore.applyFilters()"
    @deselected="generalStore.applyFilters()"
    @colorSelected="generalStore.applyFilters()"
  ></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm @submit="generalStore.submit('clothes')"></ModalForm>
  <button @click="generalStore.openForm()">Add</button>
  <CardsMode
    v-if="sidebarStore.cardsView"
    @openForm="generalStore.openForm"
    @remove="removeHandler"
    @moveToOld="moveToOldHandler"
    :isOld="false"
  ></CardsMode>
</template>

<style scoped>
button {
  margin-left: 70px;
}
</style>
