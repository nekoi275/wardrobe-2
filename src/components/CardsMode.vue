<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import ClothesCard from '@/components/ClothesCard.vue'

const tableStore = useTableStore()
</script>

<template>
  <div>
    <div class="cards-container">
      <ClothesCard v-for="row in tableStore.filtered" :key="row.id" :row="row" @openForm="$emit('openForm', row)"></ClothesCard>
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
</style>
