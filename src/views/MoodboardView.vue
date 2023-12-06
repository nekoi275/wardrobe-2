<script setup lang="ts">
import { useMoodboardStore } from '@/stores/moodboard'
import { useApiStore } from '@/stores/api'

const moodboardStore = useMoodboardStore()
const api = useApiStore()

function fileChange(e: any) {
  const file = e?.target?.files[0]
  moodboardStore.imageData = file
}
function submit() {
  api.createImage(moodboardStore.imageData).then((response) => {
    if (response?.id) {
      moodboardStore.images.push(response.id)
      api.updateImageIds(moodboardStore.images)
    }
  })
}
function removeImage(id: string) {
  api.removeImage(id)
  const index = moodboardStore.images.findIndex((item: string) => item == id)!
  moodboardStore.images = [
    ...moodboardStore.images.slice(0, index),
    ...moodboardStore.images.slice(index + 1)
  ]
  api.updateImageIds(moodboardStore.images)
}
</script>

<template>
  <button>
    <input type="file" accept="image/png, image/jpeg, image/webp" @change="fileChange" />
  </button>
  <button class="add-button" @click="submit">Add</button>
  <div class="moodboard-container">
    <figure v-for="image in moodboardStore.images" :key="image">
      <img :src="api.getImageUrl(image)" />
      <V-icon name="fa-trash-alt" @click="removeImage(image)" />
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
  width: 200px;
}
.ov-icon {
  position: absolute;
  cursor: pointer;
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
