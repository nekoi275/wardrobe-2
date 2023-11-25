<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import ColorCheckbox from '@/components/ColorCheckbox.vue'

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
        v-if="filter.name !== 'color'"
        :options="sidebarStore.availableFilters.options[filter.name]"
        mode="tags"
        :searchable="true"
        :canClear="false"
        v-model="sidebarStore.filters[filter.name]"
        @select="$emit('selected')"
        @deselect="$emit('deselected')"
      >
      </Multi-select>
      <div class="colors-container" v-else>
        <ColorCheckbox
          v-for="option in sidebarStore.availableFilters.options.color"
          :key="option"
          :option="option"
        ></ColorCheckbox>
      </div>
    </div>
    <V-toggle :offLabel="'Table'" :onLabel="'Cards'" v-model="sidebarStore.cardsView"></V-toggle>
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
.colors-container {
  display: flex;
  margin-bottom: 40px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
