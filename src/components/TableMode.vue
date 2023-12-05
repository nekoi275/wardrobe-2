<script setup lang="ts">
import { useTableStore } from '@/stores/table'

const tableStore = useTableStore()
defineProps<{
  isOld: boolean
}>()

function setSorting(field: string) {
  if (tableStore.sorting.field == field) {
    tableStore.sorting = { field: field, isAscending: !tableStore.sorting.isAscending }
  } else {
    tableStore.sorting = { field: field, isAscending: true }
  }
  return field
}
function sort(field: string) {
  setSorting(field)
  tableStore.sort()
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <th
          v-for="header in tableStore.current.headers"
          :key="header.name"
          @click="sort(header.name)"
        >
          <span>
            {{ header.displayName }}
          </span>
          <V-icon
            v-show="tableStore.sorting.field == header.name && tableStore.sorting.isAscending"
            name="fa-angle-up"
          />
          <V-icon
            v-show="tableStore.sorting.field == header.name && !tableStore.sorting.isAscending"
            name="fa-angle-down"
          />
        </th>
        <th class="empty-th">Total: {{ tableStore.totalAmount }}</th>
      </thead>
      <tbody>
        <tr v-for="row in tableStore.filtered" :key="row.id">
          <td>{{ row.type }}</td>
          <td :style="{ backgroundColor: row.color }"></td>
          <td>{{ row.description }}</td>
          <td>{{ row.price }}</td>
          <td>{{ row.year }}</td>
          <td v-if="tableStore.current.headers.some((el) => el.name === 'season')">
            {{ row.season }}
          </td>
          <td>
            <V-icon name="fa-image" @click="$emit('openImage', row.image)" title="Open photo" />
            <V-icon name="fa-edit" @click="$emit('openForm', row)" title="Edit entry" />
            <V-icon
              name="fa-trash-alt"
              @click="$emit('remove', row.id, row.image)"
              title="Remove entry"
            />
            <V-icon
              v-if="!isOld"
              name="fa-share-square"
              @click="$emit('moveToOld', row)"
              title="Move entry to old"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  padding-left: 35px;
  overflow-x: auto;
}
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
