<!-- 开心兔 -->
<template>
  <div class="happyRabbit">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="onBack"
      :fixed="false"
      placeholder
      title="关于开心兔"
    />
    <div class="content">
      <div class="logobox">
        <img src="../../../assets/img/logo_.png" alt="" />
        <p>当前版本号: 0.0.1</p>
      </div>
      <div class="btnbox">
        <van-button @click="$router.push('/policy?name=policy')">
          开心兔隐私政策
        </van-button>
      </div>
    </div>
    <div class="copyrightBox">
      <p>河南般若网络技术有限公司 版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onBack: function () {
      this.$emit("onBack", false);
    },
  },
};
</script>
<style  scoped>
.content {
  display: flex;
  flex-direction: column;
}
.logobox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
}
.logobox > img {
  width: 10rem;
}
.logobox > p {
  font-size: 1.1rem;
  margin-top: 1rem;
}
.btnbox {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
.btnbox > button {
  margin-top: 1rem;
}
.copyrightBox {
  color:#a5a6a9;
  font-size: 0.85rem;
  margin-top: 5rem;
  text-align: center;
}
</style>