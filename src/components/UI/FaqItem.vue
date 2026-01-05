<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id: string
  question: string
  answer: string
  icon: string
}
const props = defineProps<Props>()

const isOpen = ref(false)
const toggleFaqItem = () => {
  if (!isOpen.value) {
    isOpen.value = true

    setTimeout(() => {
      const active_answer = document.getElementById(props.id)
      active_answer!.style.display = 'block'

      setTimeout(() => {
        active_answer!.style.paddingTop = '4px'
        active_answer!.style.height = '50px'
        active_answer!.style.opacity = '1'
      }, 17)
    }, 1)
  } else {
    const active_answer = document.getElementById(props.id)
    isOpen.value = false

    active_answer!.style.height = '0'
    active_answer!.style.opacity = '0'
    active_answer!.style.paddingTop = '0'

    setTimeout(() => {
      active_answer!.style.display = 'none'
    }, 100)
  }
}
</script>

<template>
  <div class="faq-item" :class="{ active: isOpen }">
    <div class="question-block" @click="toggleFaqItem">
      <div class="question">
        <div class="question-icon">
          <img :src="`/icons/${icon}`" alt="icon" />
        </div>
        <p>{{ question }}</p>
      </div>
      <img class="toggle-arr" src="/icons/arr-black.svg" alt="arr" />
    </div>
    <div :id="isOpen ? id : undefined" class="answer-block">
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-item {
  display: flex;
  flex-direction: column;
  width: 100%;

  &.active {
    & .toggle-arr {
      transform: rotate(-90deg);
    }
    & .question {
      & > p {
        opacity: 0.99;
      }
      & > .question-icon {
        border-color: rgba($black-primary, 0.2);
      }
    }
  }
}
.question-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  cursor: pointer;

  & > .question {
    display: flex;
    align-items: center;
    gap: 16px;

    & > .question-icon {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 10px;
      width: 40px;
      height: 40px;

      border-radius: 8px;
      border: 1px solid rgba($black-primary, 0.1);

      & > img {
        width: 20px;
        height: 20px;
        opacity: 0.8;
      }
    }
    & > p {
      @include main-text;
      font-weight: 500;

      opacity: 0.8;
    }
  }
  & > .toggle-arr {
    transform: rotate(90deg);
    opacity: 0.6;

    width: 20px;
    height: 20px;
  }

  &:hover {
    & > .question {
      & > p {
        opacity: 0.99;
      }
      & > .question-icon {
        border-color: rgba($black-primary, 0.2);
      }
    }

    & .toggle-arr {
      opacity: 0.9;
    }
  }
}
.answer-block {
  display: none;

  padding-left: 56px;
  padding-top: 0;

  height: 0;
  opacity: 0;

  transition: 100ms;

  & > p {
    @include main-text;
    line-height: 130%;
    opacity: 0.6;
  }
}
</style>
