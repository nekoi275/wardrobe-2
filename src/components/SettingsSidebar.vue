<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

function openSidebar() {
  sidebarStore.isOpen = true
}
function closeSidebar() {
  sidebarStore.isOpen = false
}
/* function applyFilters() {
  for (let key in store.filters) {
    let values = store.filters[key]
    if (values.length > 0) {
      console.log('works')
      tableStore.current.rows = tableStore.current.rows.filter((item) => {
        return values.includes(item[key])
      })
    }
  }
} */
</script>

<template>
  <aside :class="{ open: sidebarStore.isOpen }" v-click-outside="closeSidebar">
    <V-icon name="fa-filter" @click="openSidebar()" />
    <div v-for="filter in sidebarStore.availableFilters.filters" :key="filter.name">
      <span>{{ filter.displayName }}</span>
      <Multi-select
        :options="sidebarStore.availableFilters.options[filter.name]"
        mode="tags"
        :searchable="true"
        :canClear="false"
        v-model="sidebarStore.filters[filter.name]"
      >
      </Multi-select>
    </div>
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
  margin-top: 10px;
}
</style>
