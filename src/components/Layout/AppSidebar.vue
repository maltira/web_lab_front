<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const routes = [
  [
    { path: '/', name: 'Все публикации', icon: 'home.svg' },
    { path: '/categories', name: 'Категории', icon: 'category.svg' },
    { path: '/authors', name: 'Авторы', icon: 'user.svg' },
  ],
  [
    { path: '/my-publications', name: 'Мои публикации', icon: 'box.svg' },
    { path: '/drafts', name: 'Черновики', icon: 'page.svg' },
    { path: '/saved', name: 'Сохраненное', icon: 'saved.svg' },
    { path: '/subscriptions', name: 'Мои подписки', icon: 'user-check.svg' },
  ],
]
</script>

<template>
  <div class="sidebar">
    <div class="route-block">
      <div class="block main">
        <p>ГЛАВНАЯ</p>
        <div class="routes">
          <RouterLink
            to="/greeting"
            class="tab-container close"
            :class="{ active: route.path === 'greeting' }"
          >
            <div class="route">
              <img src="/icons/mood.svg" alt="img" />
              Добро пожаловать
            </div>
            <img class="close-container" src="/icons/close.svg" alt="close" />
          </RouterLink>
          <RouterLink
            v-for="(el, i) in routes[0]"
            :key="i"
            :to="el.path"
            class="tab-container"
            :class="{ active: route.path === el.path }"
          >
            <img :src="`/icons/${el.icon}`" alt="img" />
            {{ el.name }}
          </RouterLink>
        </div>
      </div>
      <div class="block personal">
        <p>ЛИЧНОЕ</p>
        <div class="routes">
          <RouterLink
            v-for="(el, i) in routes[1]"
            :key="i"
            :to="el.path"
            class="tab-container"
            :class="{ active: route.path === el.path }"
          >
            <img :src="`/icons/${el.icon}`" alt="img" />
            {{ el.name }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="block settings">
      <p>ЛИЧНОЕ</p>
      <div class="routes">
        <button class="tab-container">
          <img src="/icons/notif.svg" alt="img" />
          Уведомления
        </button>
        <button class="tab-container">
          <img src="/icons/settings.svg" alt="img" />
          Настройки
        </button>
        <RouterLink to="/about" class="tab-container">
          <img src="/icons/question-line.svg" alt="img" />
          О нас
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;

  height: calc(100vh - 150px);
  width: 280px;

  padding: 24px;

  border-right: 1px solid rgba($black-primary, 0.1);
}

.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 24px;

  & > .routes {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & > p {
    @include tag-text;
    opacity: 0.2;
  }
}

.tab-container {
  @include sidebar-tab;

  &.close {
    justify-content: space-between;

    & > .route {
      display: flex;
      gap: 12px;
      align-items: center;

      & > img {
        width: 20px;
      }
    }

    & > .close-container {
      width: 14px;
      opacity: 0;
    }

    &:hover {
      & > .close-container {
        opacity: 1;
      }
    }
  }
}
</style>
