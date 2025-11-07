<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user.store.ts'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme.store.ts'
import type { PublicationEntity} from '@/types/publication.entity.ts'
import { formatDate } from '@/utils/date_format.ts'
import { parseCategories } from '@/utils/validate_categories.ts'
import EditPostModal from '@/components/UI/modal/EditPostModal.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

interface Props {
  isOpen: boolean,
  publication: PublicationEntity | null,
  onDelete: (id: string) => Promise<void>,
}
const props = defineProps<Props>()

const isEditModalOpen = ref(false)

const toggleEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value
}

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

// слежка за isOpen
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div
    class="modal-container"
    :class="{active: isOpen, 'dark-theme': theme === 'dark'}"
    @click="handleClose"
  >
    <div class="modal-content" @click.stop>
      <div class="modal-action-btn">
        <div class="modal-btn modal-close-button" @click="handleClose">
          <img
            src="/icons/close.svg"
            alt="close"
          >
        </div>
        <div
          class="modal-btn modal-delete-button"
          v-if="user && user.Group.name === 'Админ' || props.publication && user && props.publication.user_id === user.id && user.Group.can_publish_posts"
          @click="props.publication && user && user.Group.name === 'Админ' || props.publication && user && props.publication.user_id === user.id && user.Group.can_publish_posts ? onDelete(props.publication.id) : null"
        >
          <img
            class="delete-publication"
            src="/icons/delete.svg"
            alt="del"
            width="30px"
          >
        </div>
        <div
          class="modal-btn modal-edit-button"
          v-if="user && user.Group.name === 'Админ' || props.publication && user && props.publication.user_id === user.id && user.Group.can_publish_posts"
          @click="props.publication && user && user.Group.name === 'Админ'  || props.publication && user && props.publication.user_id === user.id && user.Group.can_publish_posts? toggleEditModal() : null"
        >
          <img
            class="delete-publication"
            src="/icons/edit.svg"
            alt="del"
            width="30px"
          >
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-body-text">
          <h2>{{props.publication ? props.publication.title : "Unknown"}}</h2>
          <p>{{props.publication ? props.publication.description : "Unknown"}}</p>
          <div class="p-categories" v-if="props.publication && parseCategories(props.publication.categories).length > 0">
            <div class="category-item"
                 v-for="(c, i) in parseCategories(props.publication.categories).slice(0, 5)"
                 :key="i"
            >
              <p>{{c}}</p>
            </div>
          </div>
        </div>
        <div class="modal-body-meta">
          <div class="author">
            <img width="16px" :src="theme === 'dark' ? '/icons/user-white.svg' : '/icons/user.svg'" alt="">
            <p>{{props.publication ? props.publication.User.name : "Unknown"}}</p>
          </div>
          <p>{{props.publication ? formatDate(props.publication.created_at, 'DD/MM/YYYY HH:mm') : "Unknown"}}</p>
        </div>
      </div>
    </div>
  </div>

  <EditPostModal :is-open="isEditModalOpen" :publication="props.publication" @close="isEditModalOpen = false; emit('close')"/>
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
    background: rgba(black, 0.1);
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
  gap: 20px;
  background: $background-color;
  width: 700px;
  position: relative;
  padding: 50px 30px;

  border-radius: 16px;
}
.modal-body{
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    display: flex;

    & p {
      font-size: 16px;
    }

    &.modal-body-text {
      flex-direction: column;
      gap: 25px;

      padding: 30px 30px;
      border-radius: 16px;
      background-color: rgba(gray, 0.1);

      max-height: 60vh;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: #292828 #f0f0f000;

      & > h2 {
        font-size: 28px;
      }

      & > p {
        max-height: 60vh;
        opacity: 0.7;
      }
    }

    &.modal-body-meta {
      justify-content: space-between;

      & > p, & > .author {
        opacity: 0.7;
        background: rgba(gray, 0.1);
        border-radius: 16px;
        padding: 8px 15px;
      }

      & > p {
        opacity: 0.7;
        padding: 10px 20px;
        background-color: rgba(gray, 0.1);
      }

      & > .author {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        & > p {
          font-size: 16px;
        }
        & > img {
          opacity: 0.7;
        }
        &:hover{
          opacity: 0.9;
        }
      }
    }
  }
}
.modal-action-btn{
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: absolute;
  top: 0;
  right: calc(-36px - 12px);
}
.modal-btn {
  cursor: pointer;
  border-radius: 32px;
  background: $white-primary;

  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0.6;
  &:hover{
    opacity: 0.8;
  }
  & > img {
    width: 28px;
    height: 28px;
  }

  &.modal-delete-button, &.modal-edit-button {
    & > img {
      width: 24px;
      height: 24px;
    }
  }

}

.p-categories {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  & > .category-item {
    padding: 5px 15px;
    border-radius: 8px;
    background: rgba(gray, 0.3);
    & > p {
      font-size: 16px;
      opacity: 0.8;
    }
  }
}
</style>