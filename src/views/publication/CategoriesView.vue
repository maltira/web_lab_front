<script setup lang="ts">
import Skeleton from '@/components/UI/Skeleton.vue'
import { usePublicationStore } from '@/stores/publication.store.ts'
import { onMounted, ref } from 'vue'
import type {
  CategorizedGroups,
  Category,
  PublicationCategoriesRequest,
} from '@/types/category.entity.ts'
import router from '@/router'
import { storeToRefs } from 'pinia'

const publicationStore = usePublicationStore()
const { getAllCategories } = publicationStore
const { filter, isLoading, error } = storeToRefs(publicationStore)

const allCategories = ref<CategorizedGroups | null>(null)

const goToCategory = (category: Category) => {
  router.push(`/`)

  const req: PublicationCategoriesRequest = {
    background_color: '#f7f7f7',
    text_color: "7d7d7d",
    Category: category
  }

  setTimeout(() => {
    filter.value.categories.push(req)
  }, 1)
}

onMounted(async () => {
  allCategories.value = await getAllCategories()
})
</script>

<template>
  <div class="categories_page">
    <h1 class="page_title">Публикации по категориям</h1>
    <div class="categories_list skeleton" v-if="isLoading && !allCategories">
      <div class="category-block">
        <Skeleton width="100px" height="36px" border-radius="6px" />
        <div class="categories-block_items">
          <Skeleton width="150px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
          <Skeleton width="120px" height="36px" border-radius="6px" />
          <Skeleton width="150px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
          <Skeleton width="120px" height="36px" border-radius="6px" />
        </div>
      </div>
      <div class="category-block">
        <Skeleton width="100px" height="36px" border-radius="6px" />
        <div class="categories-block_items">
          <Skeleton width="150px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
          <Skeleton width="120px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
          <Skeleton width="120px" height="36px" border-radius="6px" />
        </div>
      </div>
      <div class="category-block">
        <Skeleton width="100px" height="36px" border-radius="6px" />
        <div class="categories-block_items">
          <Skeleton width="150px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
          <Skeleton width="120px" height="36px" border-radius="6px" />
          <Skeleton width="150px" height="36px" border-radius="6px" />
          <Skeleton width="100px" height="36px" border-radius="6px" />
        </div>
      </div>
    </div>
    <div class="categories_list" v-if="allCategories">
      <div class="category-block" v-for="el in allCategories.groups">
        {{ el.letter }}
        <div class="categories-block_items">
          <button class="btn-counter" v-for="cat in el.categories" @click="goToCategory(cat)">
            {{ cat.name }}
            <span class="counter">{{ cat.PublicationCategories.length }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.categories_page {
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > .page_title {
    @include h2-text;
  }
}
.categories_list {
  display: flex;
  flex-direction: column;

  & > .category-block {
    @include h2-text;

    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px 8px;
    border-bottom: 1px solid rgba($black-primary, 0.1);

    & > .categories-block_items {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      & > .btn-counter {
        @include category-counter;
      }
    }
  }
}
</style>
