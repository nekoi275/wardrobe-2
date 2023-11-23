<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import img from '@/assets/default_image.jpg'
import type { ClothesInfo } from '@/stores/interfaces'

defineProps<{
  row: ClothesInfo,
  isOld: boolean
}>()
const tableStore = useTableStore()
</script>

<template>
  <div class="card">
    <img class="card-image" :src="img" />
    <table>
      <tr v-for="header in tableStore.current.headers" :key="header.name">
        <td>{{ header.displayName }}:</td>
        <td v-if="header.name !== 'color'">{{ row[header.name] }}</td>
        <td v-else :style="{ backgroundColor: row.color }"></td>
      </tr>
    </table>
    <footer>
      <V-icon name="fa-edit" @click="$emit('openForm', row)" title="Edit entry"/>
      <V-icon name="fa-trash-alt" @click="$emit('remove', row.id)" title="Remove entry"/>
      <V-icon v-if="!isOld" name="fa-share-square" @click="$emit('moveToOld', row)" title="Move entry to old"/>
    </footer>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  margin: 20px;
  padding: 10px;
  background-color: var(--main-dark-color);
  color: var(--text-light-color);
}
.card-image {
  height: 280px;
}
table tr td {
  padding: 5px;
  width: 50%;
}
footer {
  background-color: var(--main-light-color);
  padding: 10px;
  text-align: center;
}
span {
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.ov-icon {
  margin-left: 10px;
  cursor: pointer;
}

</style>
