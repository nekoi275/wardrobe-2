<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

function openSidebar() {
  sidebarStore.isOpen = true
}
function closeSidebar() {
  sidebarStore.isOpen = false
}
// TODO: add colors to color filters
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
        @select="$emit('selected')"
        @deselect="$emit('deselected')"
      >
      </Multi-select>
    </div>
    <V-toggle :offLabel="'Table'" 
    :onLabel="'Cards'"
    v-model="sidebarStore.cardsView"></V-toggle>
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
.toggle-container {
  margin-top: 30px;
  box-shadow: none;
}
</style>
