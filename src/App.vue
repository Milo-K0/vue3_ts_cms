<template>
  <div class="app">
    <router-link to="main">main</router-link>
    <router-link to="login">login</router-link>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
console.log(import.meta.env.VITE_MODE)
</script>
<style lang="less" scoped>
.app {
}
</style>
