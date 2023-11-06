<script setup lang="ts">
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'

const store = useSidebarStore()
const tableStore = useTableStore()

const filters = computed(() => {
  return tableStore.current.headers.filter((h) => h.isFilter === true)
})
const options = computed(() => {
  const rows = tableStore.current.rows
  let result: { [propName: string]: any } = {}
  for (let i = 0; i < filters.value.length; i++) {
    result[filters.value[i].name] = []
    for (let j = 0; j < rows.length; j++) {
      let option = rows[j][filters.value[i].name] || ''
      if (!result[filters.value[i].name].includes(option)) {
        result[filters.value[i].name].push(option)
      }
    }
  }
  return result
})

function removeFilters() {}
function openSidebar() {
  store.isOpen = true
}
function closeSidebar() {
  store.isOpen = false
}

</script>

<template>
  <aside :class="{ open: store.isOpen }" v-click-outside="closeSidebar">
    <v-icon name="fa-filter" @click="openSidebar()" />
    <div v-for="filter in filters" :key="filter.name">
      <span>{{ filter.displayName }}</span>
      <select multiple>
        <option v-for="option in options[filter.name]" :key="option.name">{{ option }}</option>
      </select>
    </div>
    <button @click="removeFilters()">Reset</button>
  </aside>
</template>

<style scoped>
aside {
  position: fixed;
  z-index: 1;
  width: 200px;
  transform: translateX(-160px);
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--text-light-color);
  border-right: 1px solid var(--main-dark-color);
  text-align: center;
  padding: 0px 40px;
}
.open {
  transform: none;
}
.ov-icon {
  display: block;
  margin-top: 20px;
  margin-left: 130px;
  cursor: pointer;
}
span {
  display: block;
  margin-bottom: 10px;
}
select {
  width: 100%;
}
option:checked {
  background-color: var(--main-light-color);
}
option:focus {
  background-color: var(--main-light-color);
}
option:active {
  background-color: var(--main-light-color);
}
</style>