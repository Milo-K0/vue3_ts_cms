<template>
  <div class="pane-phone">
    <el-form label-width="60px" style="margin-top: 16px">
      <el-form-item label="手机号">
        <el-input type="text" autocomplete="off" size="large" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input type="text" autocomplete="off" size="large" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.pane-phone {
}
</style>
