<script setup lang="ts">
</script>

<template>
  <div class="overlay"></div>
  <div class="background"></div>
  <div class="container">
    <nav>
      <RouterLink to="/clothes">Clothes</RouterLink>
      <RouterLink to="/accessories">Accessories</RouterLink>
      <RouterLink to="/moodboard">Moodboard</RouterLink>
      <RouterLink to="/old">Old</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
nav {
  background-color: var(--main-light-color);
  width: 400px;
  height: 400px;
  border-radius: 3px;
  text-align: center;
}
nav a {
  display: block;
  padding: 30px;
  font-size: 25px;
  color: var(--text-light-color);
}
a:hover {
  color: var(--main-dark-color);
}
.background {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url('@/assets/main_background.webp');
  background-size: 200px;
  opacity: 0.5;
}
.overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: var(--main-light-color);
}
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
