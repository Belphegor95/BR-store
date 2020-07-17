<template>
  <div class="center">
    <van-cell title="头像" is-link class="cellImg" @click="show= true">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <img src="../../assets/img/my/defaultavatar_personal.png" alt />
        <van-icon class="van-cell__right-icon" name="arrow" />
      </template>
    </van-cell>
    <van-cell title="昵称" is-link value="无动于衷" @click="show_= true" />
    <van-popup v-model="show_" position="right" :style="{ width:'100%',height: '100%' }">
      <van-nav-bar
        left-arrow
        class="navBar"
        @click-left="show_ = false"
        fixed
        placeholder
        title="昵称"
      />
      <div class="name_">
        <van-field v-model="value" placeholder="请输入昵称" />
      </div>
    </van-popup>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      show: false,
      show_: false,
      actions: [{ name: "拍照" }, { name: "从相机选择" }]
    };
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.$toast(item.name);
    },
    onCancel() {
      this.$toast("取消");
    }
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
