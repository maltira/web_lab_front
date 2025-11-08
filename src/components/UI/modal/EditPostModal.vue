<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Spinner from '@/components/UI/Spinner.vue'
import { useThemeStore } from '@/stores/theme.store.ts'
import type { PublicationEntity, PublicationUpdateRequest } from '@/types/publication.entity.ts'
import { normalizeCategories } from '@/utils/validate_categories.ts'
import { usePublicationStore } from '@/stores/publication.store.ts'
import { useNotification } from '@/composables/useNotification.ts'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const {success, err} = useNotification()

const publicationStore = usePublicationStore()
const { isLoading, error } = storeToRefs(publicationStore)
const { updatePublication } = publicationStore

interface Props {
  isOpen: boolean,
  publication: PublicationEntity | null
}
const props = defineProps<Props>()

// обращение к родителю
const emit = defineEmits<{ close: [] }>()
const handleClose = () => {
  title.value = ''
  description.value = ''
  categories.value = ''
  emit('close')
}

const title = ref("")
const description = ref("")
const categories = ref("")

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

const isUpdateAvailable = computed(() => {
  if (!props.publication) {
    return title.value.trim().length > 0 ||
      description.value.trim().length > 0 ||
      categories.value.trim().length > 0
  }

  const hasTitleChanged = props.publication.title !== title.value
  const hasDescriptionChanged = props.publication.description !== description.value
  const hasCategoriesChanged = props.publication.categories !== normalizeCategories(categories.value)

  return hasTitleChanged || hasDescriptionChanged || hasCategoriesChanged
})

const UpdatePost = async () => {
  if (isUpdateAvailable && props.publication) {
    const req: PublicationUpdateRequest = {
      id: props.publication.id,
      title: title.value,
      description: description.value,
      categories: normalizeCategories(categories.value)
    }

    await updatePublication(req)

    if (error.value) {
      err("Ошибка обновления", error.value)
    }
    else {
      success("Публикация обновлена", `Вы успешно обновили публикацию «${props.publication.title}»`)
      handleClose()
    }

  }
}

// слежка за isOpen
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
    title.value = props.publication?.title || ""
    description.value = props.publication?.description || ""
    categories.value = props.publication?.categories || ""
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div class="modal-container" :class="{active: isOpen, 'dark-theme': theme === 'dark'}" @click="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-close-button" @click="handleClose">
        <img src="/icons/close.svg" alt="close" width="28px">
      </div>
      <div class="modal-header">
        <h1>Изменить публикацию</h1>
        <p>Укажите новые данные для публикации</p>
      </div>
      <div class="modal-body">
        <input v-model="title" required type="text" placeholder="Введите название">
        <textarea v-model="description" required placeholder="Введите текст публикации"></textarea>
        <input v-model="categories" required type="text" placeholder="Введите категории (категория1;категория2)">
      </div>
      <div class="modal-actions">
        <button
          class="submit_action"
          @click="UpdatePost"
          :class="{'disabled': !isUpdateAvailable || isLoading}"
          :style="{
            background: theme === 'dark' ? 'var(--white-primary)' : 'var(--black-primary)',
            color: theme === 'dark' ? 'var(--black-primary)' : 'var(--white-primary)',
          }"
        >
          {{!isLoading ? "Сохранить" : ""}}
          <Spinner size="small" v-if="isLoading"/>
        </button>
        <button
          class="cancel_action"
          @click="handleClose"
          :style="{
            border: theme === 'dark' ? '1px solid var(--white-primary)' : '1px solid var(--black-primary)',
            color: theme === 'dark' ? 'var(--white-primary)' : 'var(--black-primary)',
          }"
        >
          Отмена
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
    background-color: rgba(black, .1);
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
  width: 700px;
  position: relative;
  padding: 40px;

  border-radius: 16px;

  & > .modal-header{
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > h1 {
      font-size: 24px;
      text-align: center;
    }
    & > p {
      font-size: 16px;
      text-align: center;
      opacity: 0.6;
    }
  }

  & > .modal-actions{
    display: flex;
    gap: 20px;

    & > button {
      width: 100%;
      padding: 8px;
      border-radius: 12px;
      &.submit_action{
        color: $white-primary;
        background-color: $black-primary;

        &.disabled {
          opacity: 0.2;
          pointer-events: none;
        }
        &:hover{
          opacity: 0.9;
        }
      }
      &.cancel_action{
        color: $black-primary;
        border: 1px solid rgba($black-primary, 1);
        opacity: 0.7;

        &:hover{
          opacity: 1;
        }
      }
    }
  }
}
.modal-body{
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > input, & > textarea {
    width: 100%;
    height: 48px;
    padding: 0 15px;
    border-radius: 12px;
    background: rgba(gray, 0.1);
    outline: none;
  }
  & > textarea{
    padding: 8px 15px;
    min-height: 400px;
    max-height: 500px;
    max-width: 100%;
    min-width: 100%;

    scrollbar-width: thin;
    scrollbar-color: #292828 #f0f0f000;
  }
}
.modal-close-button{
  cursor: pointer;
  padding: 4px;
  border-radius: 32px;
  background: $white-primary;
  position: absolute;
  top: 0;
  right: calc(-36px - 12px);

  opacity: 0.6;
  &:hover{
    opacity: 0.8;
  }
  & > img {
    width: 28px;
    height: 28px;
  }
}
</style>