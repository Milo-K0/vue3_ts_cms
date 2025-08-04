<template>
  <div class="main">
    <h2>main: {{ counterStore.counter + ':' + counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">点我修改数字</button>
  </div>
</template>
<script lang="ts" setup>
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
const changeCounter = function () {
  counterStore.changeCounterAction(900)
}
</script>
<style lang="less" scoped>
.main {
}
</style>
