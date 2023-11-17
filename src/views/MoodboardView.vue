<script setup lang="ts">
import { useMoodboardStore } from '@/stores/moodboard'

const moodboardStore = useMoodboardStore()
</script>

<template>
  <button>
    <input type="file" accept="image/png, image/jpeg, image/webp" />
  </button>
  <button class="add-button">Add</button>
  <div class="moodboard-container">
    <figure v-for="image in moodboardStore.images" :key="image">
      <img :src="image" />
      <V-icon name="fa-trash-alt" />
    </figure>
  </div>
</template>

<style scoped>
.moodboard-container {
  column-count: 3;
  column-gap: 10px;
  padding: 30px;
}
img {
  max-width: 100%;
  display: block;
  position: relative;
}
figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
  position: relative;
}
figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}
input {
  cursor: pointer;
}
.ov-icon {
  position: absolute;
  cursor: pointer;
  grid-row: 1;
  top: 5px;
  right: 5px;
  justify-self: end;
  color: var(--main-dark-color);
}
button {
  margin-left: 30px;
}
.add-button {
  height: 46px;
  margin: 0px;
  margin-left: -3px;
}
@media (max-width: 800px) {
  .moodboard-container {
    column-count: 1;
  }
}
</style>
