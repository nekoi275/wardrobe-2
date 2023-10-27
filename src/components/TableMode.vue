<script setup lang="ts">
import { onMounted } from 'vue'
import { useTableStore } from '@/stores/table'

// access the `store` variable anywhere in the component
const store = useTableStore()

// reactive (ref) state

// a computed ref

// functions that mutate state and trigger updates
function setSorting(field: string) {
  if (store.sorting.field == field) {
    store.sorting = {field: field, isAscending: !store.sorting.isAscending}
  } else {
    store.sorting = {field: field, isAscending: true}
  }
  return field
}
function sort(field: string) {
  setSorting(field);
  store.sort();
}
function openImageModal(row: {}) {
  return row
}
function openModal(row: {}) {
  return row
}
function remove(row: {}) {
  return row
}
function moveToOld(row: {}) {
  return row
}

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <table>
    <thead>
      <th v-for="header in store.current.headers" :key="header.name">
        <div @click="sort(header.name)">
          {{ header.displayName }}
        </div>
      </th>
      <th class="empty-th"></th>
    </thead>
    <tbody>
      <tr v-for="row in store.current.rows" :key="row.id">
        <td>{{ row.type }}</td>
        <td :style="{ backgroundColor: row.color }"></td>
        <td>{{ row.description }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.year }}</td>
        <td v-if="row.season">{{ row.season }}</td>
        <td>
          <span class="photo" @click="openImageModal(row.image)">image</span>
          <span class="edit" @click="openModal(row)">edit</span>
          <span class="remove" @click="remove(row)">remove</span>
          <span class="move" @click="moveToOld(row)">move</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  box-sizing: border-box;
  padding-top: 70px;
}
thead {
  background: var(--main-dark-color);
  position: sticky;
  top: 0;
  border-bottom: 3px solid var(--text-light-color);
  font-weight: initial;
  color: var(--text-light-color);
}
thead th {
  padding: 15px;
  cursor: pointer;
}

th.empty-th {
  cursor: default;
}

tbody tr {
  border-bottom: 1px solid var(--text-light-color);
}
tbody tr:hover {
  background-color: var(--text-light-color);
  border-bottom: 1px solid var(--text-light-color);
}
tbody tr td {
  padding: 10px;
}
span {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
</style>
