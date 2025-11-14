<script setup lang="ts">

</script>

<template>
  <div class="footer">
    <h1>Scribble</h1>
    <p>Современная веб-платформа для публикации и обмена статьями, разработанная на Vue.js и Golang</p>
  </div>
</template>

<style scoped lang="scss">
.footer {
  padding: 30px;
  margin-top: 50px;
  border-radius: 16px;

  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: $background-color;
  border: 1px solid rgba(gray, 0.2);

  & > p {
    font-size: 16px;
    opacity: 0.7;
  }
}
</style>