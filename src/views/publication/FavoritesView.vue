<script setup lang="ts">
import { usePublicationStore } from '@/stores/publication.store.ts'
import { onMounted, ref } from 'vue'
import type { FavoritePublicationEntity } from '@/types/publication.entity.ts'
import { storeToRefs } from 'pinia'
import { useNotification } from '@/composables/useNotification.ts'
import Skeleton from '@/components/UI/Skeleton.vue'
import { usePubViewStore } from '@/stores/view.store.ts'
import PublicationItem from '@/components/UI/PublicationItem.vue'
import { formatDate } from '@/utils/date_format.ts'
import { useUserStore } from '@/stores/user.store.ts'
import PublicationModal from '@/components/Modals/PublicationModal.vue'

const { infoNotification } = useNotification()

const userStore = useUserStore()
const pubViewStore = usePubViewStore()
const { viewMode } = storeToRefs(pubViewStore)
const publicationStore = usePublicationStore()
const { getAllFavorites } = publicationStore
const { isLoading, error } = storeToRefs(publicationStore)

const allFavorites = ref<FavoritePublicationEntity[]>([])
const isPublicationOpen = ref<boolean>(false)
const selectedPublication = ref<string>('')

const togglePublicationModal = (id: string) => {
  isPublicationOpen.value = !isPublicationOpen.value
  selectedPublication.value = id
}

const getPublications = async () => {
  allFavorites.value = await getAllFavorites()
}

onMounted(async () => {
  await getPublications()
  if (error.value) {
    infoNotification('❌ ' + error.value)
  }
})
</script>

<template>
  <div class="favorites_page">
    <div class="page-header">
      <h2>
        Сохранённые публикации <span :style="{ opacity: 0.3 }">({{ allFavorites.length }})</span>
      </h2>
      <p>Все ваши сохранненые публикации находятся здесь</p>
    </div>
    <div class="list-publications skeleton" v-if="isLoading && !allFavorites.length">
      <Skeleton :width="viewMode === 'single' ? '100%' : '341px'" height="360px" border-radius="20px" />
      <Skeleton :width="viewMode === 'single' ? '100%' : '341px'" height="360px" border-radius="20px" />
      <Skeleton :width="viewMode === 'single' ? '100%' : '341px'" height="360px" border-radius="20px" />
    </div>
    <div class="list-publications" v-if="allFavorites.length > 0">
      <PublicationItem
        v-for="p in allFavorites"
        :id="p.Publication.id"
        :title="p.Publication.title"
        :description="p.Publication.description"
        :categories="p.Publication.PublicationCategories"
        :created_at="formatDate(p.Publication.created_at, 'DD/MM/YYYY HH:mm')"
        :author="userStore.user!"
        :background_color="p.Publication.background_color"
        :isWide="viewMode === 'single'"
        @openModal="togglePublicationModal"
        @deleted="getPublications"
      />
    </div>
    <p v-if="!isLoading && allFavorites.length === 0" class="search-result-none">Ничего не найдено</p>
  </div>
  <PublicationModal
    v-if="selectedPublication && isPublicationOpen"
    :pub_id="selectedPublication"
    @close="
      () => {
        isPublicationOpen = false
        getPublications()
      }
    "
  />
</template>

<style scoped lang="scss">
.favorites_page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > p {
    @include main-text;
    opacity: 0.6;
  }
  & > h2 {
    @include h2-text;
  }
}
.list-publications {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.search-result-none {
  @include button-text;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
}
</style>
