<script setup lang="ts">
import { useApiStore } from '@/stores/api'
import FormValidationMessage from '@/components/FormValidationMessage.vue'

const api = useApiStore()
</script>

<template>
  <div class="overlay"></div>
  <div class="background"></div>
  <div class="container">
    <form v-if="!api.isLoggedIn">
      <FormValidationMessage
        :msg="'Wrong credentials'"
        v-show="api.isWrongCreds"
      ></FormValidationMessage>
      <label>
        User Name
        <input type="text" v-model="api.userName" />
      </label>
      <label>
        Password
        <input type="password" v-model="api.password" />
      </label>
      <button @click="api.login()" type="button">Log in</button>
    </form>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url('@/assets/cloakroom.jpg');
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
}
.overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: var(--main-light-color);
}
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
form {
  display: block;
  width: 300px;
  background-color: var(--main-dark-color);
  padding: 50px;
  border-radius: 3px;
  text-align: right;
  color: var(--text-light-color);
  opacity: 1;
}
label {
  display: block;
  text-align: left;
  width: 100%;
}
input {
  box-sizing: border-box;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: normal;
  display: block;
  margin-bottom: 20px;
  width: 100%;
  margin-top: 5px;
  padding: 11px;
  border-radius: 3px;
  padding-left: 13px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}
button {
  background-color: var(--main-light-color);
  color: var(--main-dark-color);
  margin: 0px auto;
}
button:hover {
  background-color: var(--main-dark-color);
  border: 3px solid var(--main-light-color);
  color: var(--main-light-color);
}
</style>
