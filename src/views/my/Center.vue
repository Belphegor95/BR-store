<template>
  <div class="center">
    <van-cell title="头像" is-link class="cellImg">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <img src="../../assets/img/my/defaultavatar_personal.png" alt />
        <van-icon class="van-cell__right-icon" name="arrow" />
      </template>
    </van-cell>
    <van-cell title="昵称" is-link value="无动于衷" @click="show = true" />
    <!-- <van-popup v-model="show" position="right" :style="{ width:'100%',height: '100%' }">
      <van-nav-bar
        left-arrow
        class="navBar"
        @click-left="show = false"
        fixed
        placeholder
        title="昵称"
      />
      <div class="name_">
        <van-field v-model="value" placeholder="请输入昵称" />
      </div>
    </van-popup> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      value: ""
    };
  }
};
</script>
<style scoped>
.cellImg {
  display: flex;
  align-items: center;
}
.cellImg img {
  width: 4rem;
  padding-right: 1rem;
}
.name_ {
  padding: 0 16px;
}
</style>

<style>
.name_ .van-cell {
  border-bottom: 1px solid #ebedf0;
}
</style>
