<script setup lang="ts">
import { useImageStore } from '@/stores/image'
const imageStore = useImageStore()
</script>

<template>
  <div class="container" v-show="imageStore.isOpen">
    <div class="overlay" @click="imageStore.close"></div>
    <div class="modal">
      <img :src="imageStore.imageUrl" />
    </div>
  </div>
</template>

<style scoped>
.container {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
.container .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.container .modal {
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  background-color: var(--main-light-color);
  border-radius: 3px;
  width: 600px;
  height: 600px;
}
img {
  width: 600px;
  height: 600px;
  border-radius: 3px;
}
@media (max-width: 800px) {
  .container .modal {
    width: 370px;
    height: 370px;
  }
  img {
    width: 370px;
    height: 370px;
  }
}
</style>
