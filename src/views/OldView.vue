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
const removeHandler = generalStore.remove('old')
</script>

<template>
<TableMode
    v-if="!sidebarStore.cardsView"
    @openImage="generalStore.openImage"
    @openForm="generalStore.openForm"
    @remove="removeHandler"
    :isOld="true"
  ></TableMode>
  <SettingsSidebar
    @selected="generalStore.applyFilters()"
    @deselected="generalStore.applyFilters()"
    @colorSelected="generalStore.applyFilters()"
  ></SettingsSidebar>
  <ImageModal></ImageModal>
  <ModalForm @submit="generalStore.submit('old')"></ModalForm>
  <CardsMode
    v-if="sidebarStore.cardsView"
    @openForm="generalStore.openForm"
    @remove="removeHandler"
    :isOld="true"
  ></CardsMode>
</template>
