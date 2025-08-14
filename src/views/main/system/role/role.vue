<template>
  <div class="role">
    <pageSearch :search-config="searchConfig" />
  </div>
</template>
<script lang="ts" setup>
import searchConfig from './config/search.config'
import pageSearch from '@/components/page-search/page-search.vue'
</script>
<style lang="less" scoped>
.role {
}
</style>
