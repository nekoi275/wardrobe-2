<script setup lang="ts">
defineProps<{
  option: string
}>()
</script>

<template>
  <label class="checkbox-label">
    <input type="checkbox"/>
    <span class="checkmark" :style="{background: `${option}`}"></span>
  </label>
</template>

<style scoped>
.checkbox-label {
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-basis: 30%;
}
.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  border: 1px var(--main-dark-color) solid;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-label input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-label .checkmark:after {
  left: 8px;
  top: 5px;
  width: 12px;
  height: 12px;
  border: solid var(--main-dark-color);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
