<!-- 协议 -->
<template>
  <div class="Policy">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
      placeholder
      title="隐私政策"
    />
    <iframe
      :src="html"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="auto"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    this.html = `./${this.$route.query.name}.html`;
    window.onmessage = (e) => {
      if (e.data.name) {
        this.$router.push(`/policy?name=${e.data.name}`);
      }
    };
  },
  watch: {
    "$route.query.name"(val) {
      this.html = `/${val}.html`;
      // 因为本地引入 所以路由跳转 会导致回退后路由不更新  所有需要刷新下页面
      location.reload();
    },
  },
};
</script>
<style  scoped>
.Policy {
  width: 100%;
  height: 100%;
}
</style>