<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user.store.ts'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme.store.ts'
import { useNotification } from '@/composables/useNotification.ts'

const { err } = useNotification()

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const userStore = useUserStore()
const { fetchGroups } = userStore
const { filteredGroups } = storeToRefs(userStore)

interface Props {
  isOpen: boolean
  group: string
}
const props = defineProps<Props>()

// обращение к родителю
const emit = defineEmits<{
  close: [],
  userUpdated: [id: string, name: string]
}>()
const handleClose = () => {
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

const handleRole = (id: string, name: string) => {
  if (id != props.group) {
    emit('userUpdated', id, name)
  } else {
    err("Ошибка выбора роли", "Пользоваетль уже имеет такую роль")
  }
}

// слежка за isOpen
watch(() => props.isOpen,
  (newValue) => {
    if (newValue) {
      console.log(props.group)
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  },
)
onMounted( async() => {
  await fetchGroups()
})
</script>

<template>
  <div class="modal-container" :class="{ active: isOpen, 'dark-theme': theme === 'dark' }" @click="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-close-button" @click="handleClose">
        <img src="/icons/close.svg" alt="close" width="28px" />
      </div>
      <h1>Выберите роль</h1>
      <div class="modal-body">
        <button
          v-for="(group, i) in filteredGroups"
          :key="i"
          class="role-item"
          :class="{disabled: group.id === props.group}"
          @click="handleRole(group.id, group.name)"
        >
          <span>{{group.name}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  visibility: hidden;
  opacity: 0;
  z-index: 1003;

  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: rgba(black, 0.1);
    backdrop-filter: blur(4px);
    visibility: visible;
    opacity: 1;

    &.dark-theme {
      background: rgba(white, 0.1);
    }
  }
}
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 35px;
  background: $background-color;
  width: 500px;
  position: relative;
  padding: 40px;
  border-radius: 16px;

  & > h1 {
    font-size: 24px;
    text-align: center;
  }
}
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > .role-item {
    width: 100%;
    height: 48px;
    padding: 0 15px;
    border-radius: 12px;
    background: rgba(gray, 0.1);
    & > span {
      font-weight: 400;
      opacity: 0.7;
    }
    &.disabled{
      opacity: 0.5;
      pointer-events: none;
    }
    &:hover{
      background: rgba(gray, 0.15);

      & > span {
        opacity: 0.8;
      }
    }
  }
}
.modal-close-button {
  cursor: pointer;
  padding: 4px;
  border-radius: 32px;
  background: $white-primary;
  position: absolute;
  top: 0;
  right: calc(-36px - 12px);

  opacity: 0.6;
  &:hover {
    opacity: 0.8;
  }
  & > img {
    width: 28px;
    height: 28px;
  }
}
</style>