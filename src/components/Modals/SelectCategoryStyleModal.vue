<script setup lang="ts">
import { ChromePicker } from 'vue-color'
import { onMounted, onUnmounted } from 'vue'
import type { PublicationCategories } from '@/types/publication.entity.ts'

interface Props {
  pos_x: number
  pos_y: number

  category_id: string
  category: PublicationCategories
}
const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleOutsideClick = (e: MouseEvent) => {
  const publication_container = document.getElementById('category_style_container')
  const category_container = document.getElementById(props.category_id)

  if (
    !publication_container?.contains(e.target as Node) &&
    !category_container?.contains(e.target as Node)
  ) {
    emit('close')
  }
}

onMounted(() => {
  const category_style_container = document.getElementById('category_style_container')

  if (category_style_container) {
    setTimeout(() => {
      category_style_container.style.top = props.pos_y + 15 + 'px'
      category_style_container.style.left = props.pos_x - 165 + 'px'

      category_style_container.style.opacity = '1'
      category_style_container.style.transform = 'scale(1)'
    }, 1)
  }
  document.addEventListener('click', handleOutsideClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div id="category_style_container" class="category_style_container">
    <div class="select_color">
      <p>Цвет фона</p>
      <ChromePicker
        v-model="category.background_color"
        :style="{
          boxShadow: 'none',
        }"
      />
    </div>
    <div class="select_color">
      <p>Цвет текста</p>
      <ChromePicker
        v-model="category.text_color"
        :style="{
          boxShadow: 'none',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.category_style_container {
  display: flex;
  align-items: center;
  gap: 30px;

  position: absolute;

  background: $white-primary;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  transform: scale(0.8);
  opacity: 0;
  transition: 50ms;

  z-index: 1100;

  & > button {
    @include button-icon;
  }
}
.select_color {
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > p {
    @include button-text;
    opacity: 0.5;
  }
}
</style>
