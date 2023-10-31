<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useTableStore } from '@/stores/table'

// access the `store` variable anywhere in the component
const store = useSidebarStore()
const tableStore = useTableStore()

// reactive (ref) state

// a computed ref
const availableFilters = computed(() => {
  return tableStore.current.headers.filter((h) => h.isFilter === true)
})
//const availableOptions = computed(() => {})

// functions that mutate state and trigger updates
function removeFilters() {}
function openSidebar() {
  console.log('wtf')
  store.isOpen = true
}
function closeSidebar() {
  console.log('called')
  store.isOpen = false
}

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <aside :class="{ open: store.isOpen }" v-click-outside="closeSidebar">
    <v-icon name="fa-filter" @click="openSidebar()" />
    <div v-for="filter in availableFilters" :key="filter.name">
      <span>{{ filter.displayName }}</span>
      <select multiple>
        <option>zz</option>
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
option {
  background-color: var(--main-light-color);
}
</style>
