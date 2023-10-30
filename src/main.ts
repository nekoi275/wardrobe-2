import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaAngleUp,
  FaAngleDown,
  FaImage,
  FaEdit,
  FaTrashAlt,
  FaShareSquare,
  FaFilter
} from 'oh-vue-icons/icons'

addIcons(FaAngleUp, FaAngleDown, FaImage, FaEdit, FaTrashAlt, FaShareSquare, FaFilter)

const app = createApp(App)
app.directive('click-outside', {
  beforeMount: function (element, binding) {
    element.clickOutsideEvent = function (event: { target: any }) {
      if (!(element === event.target || element.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted: function (element) {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  }
})
app.component('v-icon', OhVueIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
