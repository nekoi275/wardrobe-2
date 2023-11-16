import '@vueform/toggle/themes/default.css'
import '@vueform/multiselect/themes/default.css'
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
  FaFilter,
  FaRegularWindowClose
} from 'oh-vue-icons/icons'
import  Multiselect  from '@vueform/multiselect'
import Toggle from '@vueform/toggle'

addIcons(FaAngleUp, FaAngleDown, FaImage, FaEdit, FaTrashAlt, FaShareSquare, FaFilter, FaRegularWindowClose)

const app = createApp(App)
const pinia = createPinia()
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
app.component('V-icon', OhVueIcon)
app.component('Multi-select', Multiselect)
app.component('V-toggle', Toggle)

app.use(pinia)
app.use(router)

app.mount('#app')
