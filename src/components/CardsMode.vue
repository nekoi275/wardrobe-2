<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import ClothesCard from '@/components/ClothesCard.vue'
import { useApiStore } from '@/stores/api'

const tableStore = useTableStore()
const api = useApiStore()
defineProps<{
  isOld: boolean
}>()
</script>

<template>
  <div>
    <div class="cards-container">
      <ClothesCard
        v-for="row in tableStore.filtered"
        :key="row.id"
        :row="row"
        :imageUrl="api.getImageUrl(row.image)"
        @openForm="$emit('openForm', row)"
        @remove="$emit('remove', row.id, row.image)"
        @moveToOld="$emit('moveToOld', row)"
        :isOld="isOld"
      ></ClothesCard>
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
@media (max-width: 800px) {
  .cards-container {
    padding-left: 40px;
  }
}
</style>
