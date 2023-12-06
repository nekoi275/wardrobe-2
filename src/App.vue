<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useApiStore } from '@/stores/api'

const api = useApiStore()
</script>

<template>
  <header v-if="api.isLoggedIn">
    <nav>
      <RouterLink to="/clothes">Clothes</RouterLink>
      <RouterLink to="/accessories">Accessories</RouterLink>
      <RouterLink to="/moodboard">Moodboard</RouterLink>
      <RouterLink to="/old">Old</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: var(--main-light-color);
  width: 100%;
  padding-top: 10px;
}

nav {
  width: 100%;
  text-align: right;
}

nav a {
  display: inline-block;
  padding: 0 15px;
  color: var(--text-light-color);
}

a.router-link-active.router-link-exact-active {
  color: var(--main-light-color);
  background-color: var(--main-dark-color);
  border-radius: 3px;
}

nav a:hover {
  color: var(--main-dark-color);
}
@media (max-width: 800px) {
  nav a {
    padding: 0 5px;
  }
}
</style>
