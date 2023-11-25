<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import FormValidationMessage from '@/components/FormValidationMessage.vue'

const formStore = useFormStore()
const seasonOptions = ['winter', 'autumn/spring', 'summer', 'any']

function getColor(event: Event) {
/*   const canvas: HTMLCanvasElement = document.getElementById('preview')
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
  let x = event.offsetX
  let y = event.offsetY
  let imageData = ctx.getImageData(x, y, 1, 1).data
  formStore.formData.color = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`
  return event */
}
//TODO: colorpicker
//TODO: separate form data from row ???
</script>

<template>
  <div class="container" v-show="formStore.isOpen">
    <div class="overlay" @click="formStore.close()"></div>
    <div class="modal">
      <V-icon name="fa-regular-window-close" @click="formStore.close()" />
      <form>
        <input type="hidden" v-model="formStore.formData._id" />
        <FormValidationMessage
          v-show="formStore.formData.type == '' && formStore.isSubmitted"
        ></FormValidationMessage>
        <label>
          <span>Type</span>
          <input type="text" v-model="formStore.formData.type" required />
        </label>
        <label>
          <span>Description</span>
          <input type="text" v-model="formStore.formData.description" />
        </label>
        <label>
          <span>Price</span>
          <input type="number" v-model.number="formStore.formData.price" />
        </label>
        <FormValidationMessage
          v-show="formStore.formData.year == 0 && formStore.isSubmitted"
        ></FormValidationMessage>
        <label>
          <span>Year</span>
          <input
            type="number"
            min="2000"
            max="2050"
            v-model.number="formStore.formData.year"
            required
          />
        </label>
        <label>
          <span>Season</span>
          <Multi-select
            v-model="formStore.formData.season"
            :options="seasonOptions"
            mode="single"
            :canClear="false"
          >
          </Multi-select>
        </label>
        <label>
          <span>Photo</span>
          <input type="file" accept="image/png, image/jpeg, image/webp" required />
        </label>
        <FormValidationMessage
          v-show="formStore.formData.color == '' && formStore.isSubmitted"
        ></FormValidationMessage>
        <label>
          <span>Color</span>
          <input type="text" v-model="formStore.formData.color" required />
        </label>
        <label class="color-label" v-show="formStore.previewImage">
          <canvas id="preview" width="200" height="200" @click="getColor"></canvas>
        </label>
        <button @click="$emit('submit')" type="button">Submit</button>
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
  text-align: right;
}
label {
  display: flex;
  color: var(--text-light-color);
  align-items: center;
  width: 100%;
  justify-content: flex-end;
}
input,
.multiselect {
  box-sizing: border-box;
  padding: 11px;
  padding-left: 13px;
  margin: 8px;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 60%;
}
input:focus {
  border: 3px solid var(--text-light-color);
}
input[type='file'] {
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
.ov-icon {
  margin-bottom: 20px;
  cursor: pointer;
}
.multiselect {
  color: var(--text-dark-color);
  padding: 0px;
}
</style>
