<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <span class="required-msg"
    >{{ msg }}</span>
</template>

<style scoped>
.required-msg {
  margin-right: 10px;
  color: var(--warning-color);
  font-size: 10pt;
}
</style>
