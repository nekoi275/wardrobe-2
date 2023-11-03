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
      <th v-for="header in store.current.headers" :key="header.name" @click="sort(header.name)">
        <span>
          {{ header.displayName }}
        </span>
        <v-icon v-show="store.sorting.field == header.name && store.sorting.isAscending" name="fa-angle-up" />
        <v-icon v-show="store.sorting.field == header.name && !store.sorting.isAscending" name="fa-angle-down" />
      </th>
      <th class="empty-th"></th>
    </thead>
    <tbody>
      <tr v-for="row in store.current.rows" :key="row._id">
        <td>{{ row.type }}</td>
        <td :style="{ backgroundColor: row.color }"></td>
        <td>{{ row.description }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.year }}</td>
        <td>{{ row.season || '' }}</td>
        <td>
          <v-icon name="fa-image" @click="openImageModal(row.image)"/>
          <v-icon name="fa-edit" @click="openModal(row)"/>
          <v-icon name="fa-trash-alt" @click="remove(row)"/>
          <v-icon name="fa-share-square" @click="moveToOld(row)"/>
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
.ov-icon {
  margin-left: 10px;
  cursor: pointer;
}
</style>
