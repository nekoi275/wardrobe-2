<script setup lang="ts">
import { useFormStore } from '@/stores/form'
import FormValidationMessage from '@/components/FormValidationMessage.vue'
import { paletteFromImage } from 'palette-from-image'
import { ref } from 'vue'
import ColorCheckbox from '@/components/ColorCheckbox.vue'

const formStore = useFormStore()
const seasonOptions = ['winter', 'autumn/spring', 'summer', 'any']
let imagePalette = ref()

function fileChange(e: any) {
  const file = e?.target?.files[0]
  formStore.previewImage = URL.createObjectURL(file)
  const image = document.querySelector('#preview') as HTMLImageElement
  image.addEventListener('load', function () {
    const palette = paletteFromImage(image, {
      colorCount: 4,
      strategy: 'quantize',
      pixelRatio: 0.8
    })
    imagePalette.value = palette?.colors.map((color) => color.toHex())
  })
}
function selectColor(color: string) {
  formStore.formData.color = color
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
        <label class="input-label">
          <span>Type</span>
          <input type="text" v-model="formStore.formData.type" required />
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
          v-show="formStore.formData.year == 0 && formStore.isSubmitted"
        ></FormValidationMessage>
        <label class="input-label">
          <span>Year</span>
          <input
            type="number"
            min="2000"
            max="2050"
            v-model.number="formStore.formData.year"
            required
          />
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
        <img id="preview" :src="formStore.previewImage" v-show="formStore.previewImage" />
        <label class="input-label">
          <span>Photo</span>
          <input type="file" accept="image/png, image/jpeg, image/webp" @change="fileChange" />
        </label>
        <FormValidationMessage
          v-show="formStore.formData.color == '' && formStore.isSubmitted"
        ></FormValidationMessage>
        <label v-show="imagePalette" class="input-label">
          <span>Color</span>
          <ColorCheckbox
            v-for="color in imagePalette"
            :key="color"
            :option="color"
            @checked="selectColor(color)"
          ></ColorCheckbox>
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
}
.checkbox-label {
  flex-basis: 0%;
  margin-bottom: 30px;
  margin-right: 35px;
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
span {
  margin-left: 30px;
}
#preview {
  width: 150px;
  margin: 10px auto;
  display: block;
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
