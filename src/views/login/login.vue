<template>
  <div class="login">
    <login-panel />
  </div>
</template>
<script lang="ts" setup>
import loginPanel from './c-cpns/login-panel.vue'
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/Background 11.png');
  background-size: cover;
}
</style>
