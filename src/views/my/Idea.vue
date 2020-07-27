<!-- 意见建议 -->
<template>
  <div class="idea">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      fixed
      placeholder
      title="意见建议"
      right-text="发表"
    />
    <van-field
      v-model="notes"
      rows="6"
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请输入意见建议信息"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: "",
    };
  },
};
</script>

<style scoped>
</style>
<style>
.idea .van-nav-bar__text {
  color: #fff;
}
.idea .van-field__value {
  background-color: #f9f9f9;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
</style>