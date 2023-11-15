<script setup lang="ts">
import { useModalFormStore } from '@/stores/modalForm'

const modalFormStore = useModalFormStore()

function getColor(event: Event) {
  const canvas: HTMLCanvasElement = document.getElementById('preview')
  if (canvas) {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    let x = event.offsetX
    let y = event.offsetY
    let imageData = ctx.getImageData(x, y, 1, 1).data
    modalFormStore.formData.color = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`
  }
}
function submit() {}
function close() {
  modalFormStore.isOpen = false
  modalFormStore.formData = {
    _id: '',
    type: '',
    color: '',
    description: '',
    price: 0,
    year: 0,
    image: '',
    isOld: false
  }
}
</script>

<template>
  <div class="container" v-show="modalFormStore.isOpen">
    <div class="overlay" @click="modalFormStore.isOpen = false"></div>
    <div class="modal">
      <form>
        <input type="hidden" v-model="modalFormStore.formData._id" />
        <!-- <span
          class="required-msg"
          v-show="currentData.type == '' && isSubmitted"
        >Это поле обязательное</span> -->
        <label>
          <span>Type</span>
          <input type="text" v-model="modalFormStore.formData.type" required />
        </label>
        <label>
          <span>Description</span>
          <input type="text" v-model="modalFormStore.formData.description" />
        </label>
        <label>
          <span>Price</span>
          <input type="number" v-model.number="modalFormStore.formData.price" />
        </label>
        <label>
          <span>Year</span>
          <input
            type="number"
            min="2000"
            max="2050"
            v-model.number="modalFormStore.formData.year"
            required
          />
        </label>
        <label>
          <span>Season</span>
          <select name="season" v-model="modalFormStore.formData.season" required>
            <option value="winter">winter</option>
            <option value="autumn/spring">autumn/spring</option>
            <option value="summer">summer</option>
            <option value="">any</option>
          </select>
        </label>
        <label>
          <span>Photo</span>
          <input type="file" accept="image/png, image/jpeg, image/webp" />
        </label>
        <label>
          <span>Color</span>
          <input type="text" v-model="modalFormStore.formData.color" />
        </label>
        <label class="color-label" v-show="modalFormStore.previewImage">
          <canvas id="preview" width="200" height="200" @click="getColor"></canvas>
        </label>
        <button @click="submit()" type="button">Submit</button>
        <button @click="close()" type="reset">Close</button>
      </form>
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
  padding: 30px;
}
label {
  display: flex;
  color: var(--text-light-color);
  align-items: center;
  width: 100%;
  justify-content: flex-end;
}
input,
select {
  box-sizing: border-box;
  padding: 5px;
  margin: 8px;
  font-family: monospace;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 60%;
}
input:focus {
  border: 3px solid var(--text-light-color);
}
input[type="file"] {
  cursor: pointer;
}
span {
  margin-left: 30px;
}
.color-label {
  justify-content: center;
}
#preview {
  cursor: crosshair;
}
button {
  margin-right: 20px;
}
</style>
