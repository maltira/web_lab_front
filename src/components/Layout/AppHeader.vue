<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "vue-router";
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.store.ts'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme.store.ts'
import { usePublicationStore } from '@/stores/publication.store.ts'
import ProfileModal from '@/components/UI/modal/ProfileModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const publicationStore = usePublicationStore()

const { logout } = authStore
const { setSearchQuery } = publicationStore
const { user} = storeToRefs(userStore)
const { theme } = storeToRefs(themeStore)
const { isAuthenticated } = storeToRefs(authStore)
const { toggleTheme } = themeStore

const isSearchOpen = ref(false)
const search = ref("")
const isDarkTheme = ref(false)
const isProfileModalOpen = ref(false)

const LogOut = async () => {
  await logout()
  await router.push("/login")
}

const toggleSearch = () => {
  const searchInput = document.getElementById('search-input')
  isSearchOpen.value = !isSearchOpen.value

  if (searchInput && isSearchOpen.value) {
    searchInput.focus()
  }
}

const handleSearch = async () => {
  const searchInput = document.getElementById('search-input')
  isSearchOpen.value = false
  if (searchInput) {
    searchInput!.blur()
  }

  if (search.value) {
    await router.push('/')
    setSearchQuery(search.value)
    search.value = ""
  }
}

const handleTheme = (theme: 'dark' | 'light') => {
  toggleTheme(theme)
  isDarkTheme.value = theme === 'dark'
}

const handleProfile = async () => {
  if (!isAuthenticated.value) {
    await router.push('/login')
  } else {
    isProfileModalOpen.value = !isProfileModalOpen.value
  }
}
const goToHome = () => {
  router.push('/').then(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  })
}

onMounted(() => {
  isDarkTheme.value = theme.value === 'dark'
})
</script>

<template>
  <div class="header">
    <div class="left-side-nav">
      <div class="logotype" @click="goToHome">S</div>
      <div class="theme-selector">
        <button class="theme-icon" @click="handleTheme('dark')" :class="{'active': isDarkTheme}">
          🌙
        </button>
        <button class="theme-icon" @click="handleTheme('light')" :class="{'active': !isDarkTheme}">
          🌞
        </button>
        <div :style="{
        width: '31px',
        height: '31px',
        background: 'white',
        borderRadius: '99px',
        position: 'absolute',
        transform: isDarkTheme ? 'translateX(4%)' : 'translateX(121%)',
      }"></div>
      </div>
    </div>
    <div class="buttons-header">
      <form autocomplete="off" @submit.prevent="handleSearch" class="button search-record" :class="{active: isSearchOpen}" @click="toggleSearch">
        <img :src=" theme === 'dark' ? '/icons/search-white.svg' : '/icons/search.svg'" alt="add">
        <input
          id="search-input"
          placeholder="Поиск публикаций"
          autocomplete="off"
          type="text"
          name="search"
          @blur="isSearchOpen=false"
          v-model="search"
        >
      </form>
      <RouterLink v-if="user && user.Group.name === 'Админ'" to="/admin" class="button admin">
        Админ-панель
      </RouterLink>
      <button class="button my-profile" @click="handleProfile" :style="{width: !isAuthenticated ? '120px' : 'fit-content'}">
        <img :src=" theme === 'dark' ? '/icons/user-white.svg' : '/icons/user.svg'" alt="user">
        {{ isAuthenticated ?  "" : "Войти"}}
      </button>
    </div>
  </div>

  <ProfileModal :is-open="isProfileModalOpen" @close="isProfileModalOpen  = false"/>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;

  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;


  background: $background-color;

  padding: 0 50px;
}

.left-side-nav {
  display: flex;
  align-items: center;
  gap: 50px;

  & > .theme-selector{
    display: flex;
    gap: 5px;
    background: rgba(gray, 0.1);
    padding: 5px 5px;
    border-radius: 99px;
    position: relative;
    & > .theme-icon {
      height: auto;
      padding: 5px;
      width: auto;
      background: none;
      z-index: 10;

      &:hover{
        background: rgba(gray, 0.05);
      }

    }
  }

  & > .logotype {
    width: 50px;
    height: 50px;
    background: rgba(gray, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 28px;
    font-weight: 700;

    cursor: pointer;

    &:hover{
      background: rgba(gray, 0.13);
    }
  }
}

.buttons-header {
  display: flex;
  gap: 15px;
}
.button, form {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0.7;
  cursor: pointer;

  width: 120px;
  padding: 10px 20px;
  background: rgba(gray, 0.2);
  border-radius: 32px;
  &.admin{
    font-weight: 500;
    width: fit-content;
    padding-left: 25px;
    padding-right: 25px;
  }
  &.search-record {
    width: 300px;
    justify-content: start;
    background: transparent;
    border: 2px solid rgba(gray, 0.2);

    & > img {
      opacity: 0.4;
    }

    &.active {
      opacity: 1;
    }
  }
  &.my-profile {
    padding: 10px 12px;
    width: fit-content;
  }
  & > img {
    width: 16px;
    transform: translateY(1px);
  }
  &:hover{
    opacity: 0.9;
  }
}
</style>