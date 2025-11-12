<script setup lang="ts">
import { ref } from 'vue'
import {useAuthStore} from "@/stores/auth.store";
import {storeToRefs} from "pinia";
import {useNotification} from "@/composables/useNotification";
import {useRouter} from "vue-router";
import Spinner from '@/components/UI/Spinner.vue'
import { useThemeStore } from '@/stores/theme.store.ts'
import type { CreateUserRequest } from '@/types/user.entity.ts'

const router = useRouter()
const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const authStore = useAuthStore()
const { isLoading, error } = storeToRefs(authStore)
const { registration } = authStore
const { success, err } = useNotification()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const registrationUser = async () => {
  if (name.value && email.value && password.value && (password.value == confirmPassword.value)) {
    const req: CreateUserRequest = {
      name: name.value,
      email: email.value,
      password: password.value,
      group_id: "700c704d-f5c9-4a95-ad9e-c040b4429050"
    }
    await registration(req)

    if (error.value) {
      err("Ошибка при регистрации", error.value.toString())
    }
    else {
      await router.push('/')
      success("Успешная регистрация", "Добро пожаловать в Scribble")
    }
  } else {
    err("Неверные данные", "Указаны неверные данные, возможно вы указали не все поля либо пароли не совпадают")
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login_block">
      <div class="login_title">
        <div class="logotype">S</div>
        <h1>Добро пожаловать в <span>Scribble</span>!</h1>
        <div class="registration">
          <p>Уже были у нас?</p>
          <RouterLink to="/login">Авторизация</RouterLink>
        </div>
      </div>
      <div class="login_inputs">
        <input id="name-input" name="name" v-model="name" autocomplete="off" required type="text" placeholder="Как вас зовут?"/>
        <input id="email-input" name="email" v-model="email" autocomplete="off" required type="email" placeholder="Укажите ваш email"/>
        <div class="password-input">
          <input id="password-input" name="password" v-model="password" autocomplete="off" required :type="isPasswordVisible ? 'text' : 'password'" placeholder="Введите пароль"/>
          <img :src="isPasswordVisible ? (theme == 'dark' ? '/icons/eye-closed-white.svg' : '/icons/eye-closed.svg') : (theme == 'dark' ? '/icons/eye-white.svg' : '/icons/eye.svg')"  alt="visible" @click="isPasswordVisible = !isPasswordVisible">
        </div>
        <div class="password-input">
          <input id="password-input-confirm" name="password" v-model="confirmPassword" autocomplete="off" required :type="isConfirmPasswordVisible ? 'text' : 'password'" placeholder="Подтвердите пароль"/>
          <img :src="isConfirmPasswordVisible ? (theme == 'dark' ? '/icons/eye-closed-white.svg' : '/icons/eye-closed.svg') : (theme == 'dark' ? '/icons/eye-white.svg' : '/icons/eye.svg')"  alt="visible" @click="isConfirmPasswordVisible = !isConfirmPasswordVisible">
        </div>
      </div>
      <button class="login_submit" @click="registrationUser" :class="{'disabled': !name || !email || !password || !confirmPassword || isLoading}">
        {{isLoading ? "" : "Создать аккаунт"}}
        <Spinner size="small" v-if="isLoading"/>
      </button>
    </div>

    <div class="back-img small"></div>
    <div class="back-img large"></div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  background-color: #171616;

  & > .back-img{
    position: absolute;
    z-index: 1;
    border-radius: 100%;


    &.small {
      width: 442px;
      height: 442px;

      background-color: rgba(white, 0.12);
      filter: blur(430px);
      bottom: -75px;
      animation: 10s position-small infinite ease-in-out alternate;
    }
    &.large {
      width: 483px;
      height: 483px;
      filter: blur(530px);
      background-color: rgba(white, 0.2);

      top: -160px;

      animation: 10s position-large infinite ease-in-out alternate;
    }
  }
}
@keyframes position-large {
  from {
    right: -560px;
    transform: rotate(0);
  }
  to {
    right: -650px;
    transform: rotate(3deg);
  }
}
@keyframes position-small {
  from {
    left: -251px;
    transform: rotate(0);
  }
  to {
    left: -371px;
    transform: rotate(-3deg);
  }
}

.login_block {
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 500px;
  padding: 25px;
  z-index: 5;

  & > .login_title{
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;

    & > h1 {
      font-size: 32px;
      text-align: center;
      font-weight: 400;
      color: $white-primary;

      margin-top: 40px;

      & > span {
        font-weight: 700;
      }
    }
    & > .registration {
      display: flex;
      gap: 5px;
      font-size: 16px;
      justify-content: center;
      & > p {
        text-align: center;
        opacity: 0.4;
        color: $white-primary;
      }
      & > a {
        opacity: 0.9;
        color: $white-primary;

        &:hover{
          opacity: 1;
        }
      }
    }
    & > .logotype {
      width: 70px;
      height: 70px;
      background: rgba(gray, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      font-size: 36px;
      font-weight: 700;
      color: $white-primary;
      animation: scale-size 5s infinite linear alternate;
    }
  }
}
@keyframes scale-size {
  from {
    box-shadow: 0 0 16px 0 rgba(gray, 0.2);
  }
  to {
    box-shadow: 0 0 16px 0 $black-primary;
  }
}
.login_inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;

  & > input, .password-input > input {
    height: 48px;
    border-radius: 20px;
    width: 100%;
    padding: 0 16px;
    background: $black-primary;
    border: 1px solid rgba(gray, 0.15);
    color: $white-primary;
    &:focus{
      box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.05);
    }

    &:-webkit-autofill{
      transition: all 5000s ease-in-out;
    }
  }
}
.password-input {
  position: relative;
  & > img {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
    opacity: 0.3;

    &:hover{
      opacity: 0.5;
    }
  }
}
.login_submit {
  height: 48px;
  background: $white-primary;
  font-weight: 500;
  border-radius: 20px;
  color: $black-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  &:hover {
    background: rgba(#fff, 0.8);

    .logotype{
      opacity: 0;
    }
  }
  &.disabled{
    opacity: 0.2;
    pointer-events: none;
  }
}
</style>