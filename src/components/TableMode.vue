<script setup lang="ts">
import { useTableStore } from '@/stores/table'

const tableStore = useTableStore()

function setSorting(field: string) {
  if (tableStore.sorting.field == field) {
    tableStore.sorting = {field: field, isAscending: !tableStore.sorting.isAscending}
  } else {
    tableStore.sorting = {field: field, isAscending: true}
  }
  return field
}
function sort(field: string) {
  setSorting(field);
  tableStore.sort();
}
function remove(row: {}) {
  return row
}
function moveToOld(row: {}) {
  return row
}
/* TODO: add tooltips to icons */
</script>

<template>
  <table>
    <thead>
      <th v-for="header in tableStore.current.headers" :key="header.name" @click="sort(header.name)">
        <span>
          {{ header.displayName }}
        </span>
        <V-icon v-show="tableStore.sorting.field == header.name && tableStore.sorting.isAscending" name="fa-angle-up" />
        <V-icon v-show="tableStore.sorting.field == header.name && !tableStore.sorting.isAscending" name="fa-angle-down" />
      </th>
      <th class="empty-th">Total: {{ tableStore.totalAmount }}</th>
    </thead>
    <tbody>
      <tr v-for="row in tableStore.filtered" :key="row._id">
        <td>{{ row.type }}</td>
        <td :style="{ backgroundColor: row.color }"></td>
        <td>{{ row.description }}</td>
        <td>{{ row.price }}</td>
        <td>{{ row.year }}</td>
        <td v-if="row.season">{{ row.season }}</td>
        <td>
          <V-icon name="fa-image" @click="$emit('openImage')"/>
          <V-icon name="fa-edit" @click="$emit('openForm', row)"/>
          <V-icon name="fa-trash-alt" @click="remove(row)"/>
          <V-icon v-if="!row.isOld" name="fa-share-square" @click="moveToOld(row)"/>
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
