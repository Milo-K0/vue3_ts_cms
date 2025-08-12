<template>
  <div class="user">
    <div class="search">
      <userSearch />
    </div>
    <div class="content">
      <userContent />
    </div>
  </div>
</template>
<script lang="ts" setup>
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
</script>
<style lang="less" scoped>
.user {
  border-radius: 5px;
  overflow: hidden;
}
</style>
