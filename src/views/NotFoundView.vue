<script setup lang="ts">

</script>

<template>
  <div class="not-found">
    <div>
      <h1>404</h1>
      <p>Такой страницы не существует</p>
    </div>
    <RouterLink to="/">Главное меню</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  height: 100vh;

  gap: 40px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 15px;

    & > h1 {
      font-size: 100px;
      text-align: center;
    }
  }

  & > a {
    padding: 8px 20px;

    background: rgba(gray, 0.2);
    width: fit-content;
    border-radius: 12px;

    text-align: center;
    font-size: 16px;

    opacity: 0.7;

    &:hover{
      opacity: 0.9;
    }
  }
}
</style>