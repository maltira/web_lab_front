<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.store.ts'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

interface Props {
  isOpen: boolean
}
const props = defineProps<Props>()

// обращение к родителю
const emit = defineEmits<{ close: [] }>()
const handleClose = () => {
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="modal-container" @click="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h1>Настройки профиля</h1>
        <img src="/icons/close.svg" alt="close" width="24px" />
      </div>
      <div class="modal-body">
        <div class="avatar-block">

        </div>
        <div class="input-block">

        </div>
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
  z-index: 1003;

  opacity: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 35px;
  background: $white-primary;
  width: 500px;
  position: relative;
  padding: 40px;

  border-radius: 16px;

  opacity: 0;
  transform: scale(0.8);

  & > .modal-header {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > h1 {
      font-size: 24px;
      text-align: center;
    }
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > p {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 20px;
    border-radius: 16px;

    background-color: rgba(gray, 0.1);
    font-size: 16px;
    opacity: 0.7;
  }
}

.exit_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  width: 100%;
  height: 48px;
  border-radius: 16px;

  background: rgba($red-color, 0.05);
  border: 1px solid rgba($red-color, 0.2);
  opacity: 0.7;
  color: $red-color !important;

  &:hover {
    opacity: 0.99;
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