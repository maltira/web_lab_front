<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "vue-router";

const router = useRouter()
const authStore = useAuthStore()
const {logout} = authStore

const LogOut = async () => {
  await logout()
  await router.push("/auth")
}
</script>

<template>
  <div class="header">
    <button class="exit-button" @click="LogOut">
      <img src="/icons/exit.svg" alt="exit">
      Выйти
    </button>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 0 20px;
}
.exit-button{
  height: 40px;
  padding: 0 25px;
  background: rgba(gray, 0.3);
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0.7;
  border-radius: 32px;
  cursor: pointer;

  & > img {
    width: 16px;
    transform: translateY(1px);
  }

  &:hover{
    opacity: 0.9;
  }
}
</style>