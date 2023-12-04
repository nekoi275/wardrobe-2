<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import FormValidationMessage from '@/components/FormValidationMessage.vue'
import { paletteFromImage } from 'palette-from-image'

const formStore = useFormStore()
const seasonOptions = ['winter', 'autumn/spring', 'summer', 'any']

function fileChange(e: any) {
  const file = e?.target?.files[0]
  formStore.imageData = file
  formStore.previewImage = URL.createObjectURL(file)
  const image = document.querySelector('#preview') as HTMLImageElement
  image.addEventListener('load', function () {
    const palette = paletteFromImage(image, {
      colorCount: 6,
      strategy: 'quantize',
      pixelRatio: 0.8
    })
    formStore.imagePalette = palette?.colors.map((color) => color.toHex()) as []
  })
}
</script>

<template>
  <div class="container" v-show="formStore.isOpen">
    <div class="overlay" @click="formStore.close()"></div>
    <div class="modal">
      <V-icon name="fa-regular-window-close" @click="formStore.close()" />
      <form>
        <FormValidationMessage
          :msg="'This field is required'"
          v-show="formStore.formData.type == '' && formStore.isSubmitted"
        ></FormValidationMessage>
        <label class="input-label">
          <span>Type</span>
          <input type="text" v-model="formStore.formData.type" />
        </label>
        <label class="input-label">
          <span>Description</span>
          <input type="text" v-model="formStore.formData.description" />
        </label>
        <label class="input-label">
          <span>Price</span>
          <input type="number" v-model.number="formStore.formData.price" />
        </label>
        <FormValidationMessage
          :msg="'This field is required'"
          v-show="formStore.formData.year == 0 && formStore.isSubmitted"
        ></FormValidationMessage>
        <label class="input-label">
          <span>Year</span>
          <input type="number" min="2000" max="2050" v-model.number="formStore.formData.year" />
        </label>
        <label class="input-label">
          <span>Season</span>
          <Multi-select
            v-model="formStore.formData.season"
            :options="seasonOptions"
            mode="single"
            :canClear="false"
          >
          </Multi-select>
        </label>
        <img id="preview" :src="formStore.previewImage" v-show="formStore.previewImage"/>
        <label class="input-label">
          <span>Photo</span>
          <input type="file" id="fileInput" accept="image/png, image/jpeg, image/webp" @change="fileChange"/>
        </label>
        <FormValidationMessage
          :msg="'This field is required'"
          v-show="formStore.formData.color == '' && formStore.isSubmitted"
        ></FormValidationMessage>
        <fieldset id="colorgroup" class="input-label">
          <span>Color</span>
          <div
            class="color-container"
            v-show="formStore.imagePalette.length > 0"
            v-for="color in formStore.imagePalette"
            :key="color"
          >
            <input
              type="radio"
              name="colorgroup"
              :value="color"
              v-model="formStore.formData.color"
            />
            <span class="checkmark" :style="{ 'background-color': `${color}` }"></span>
          </div>
          <input
            type="text"
            v-show="formStore.imagePalette.length == 0"
            v-model="formStore.formData.color"
            :style="{ 'background-color': `${formStore.formData.color}` }"
          />
        </fieldset>
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
  padding: 20px;
  width: 500px;
  text-align: right;
}
.input-label {
  display: flex;
  color: var(--text-light-color);
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border: none;
  padding: 0px;
}
input,
.multiselect {
  box-sizing: border-box;
  padding: 11px;
  margin: 8px;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 70%;
}
input:focus {
  border: 3px solid var(--text-light-color);
}
input[type='file'] {
  cursor: pointer;
}
.color-container {
  position: relative;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin: auto;
}
.color-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 25px;
  width: 25px;
  margin: 0px;
  padding: 0px;
  border: none;
  transition: none;
  display: block;
  z-index: 1;
}
.checkmark {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 25px;
  width: 25px;
  border-radius: 100px;
}
.color-container input:checked ~ .checkmark {
  background-color: var(--main-light-color);
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.color-container input:checked ~ .checkmark:after {
  display: block;
}
.color-container .checkmark:after {
  background-color: var(--main-light-color);
  width: 11px;
  height: 11px;
  border-radius: 100px;
  top: 7px;
  left: 7px;
}
#preview {
  width: 130px;
  margin: 10px auto;
  display: block;
}
button {
  margin-right: 20px;
  margin-top: 20px;
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
