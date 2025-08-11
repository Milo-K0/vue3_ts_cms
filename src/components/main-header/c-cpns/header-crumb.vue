<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useLoginStore } from '@/store/login/login'
import { mapPathToBreadCrumb } from '@/utils/map-manus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const breadcrumbs = computed(() => mapPathToBreadCrumb(route.path, userMenus))
</script>
<style lang="less" scoped>
.header-crumb {
}
</style>
