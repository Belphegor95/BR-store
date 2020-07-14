<template>
  <div class="manage">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      fixed
      placeholder
      :title="titlename"
    />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titlename: "收货地址"
    };
  },
  created() {
    if (this.$route.path.indexOf("address") != -1) {
      this.titlename = "收货地址";
    } else if (this.$route.path.indexOf("center") != -1) {
      this.titlename = "个人中心";
    } else if (this.$route.path.indexOf("setting") != -1) {
      this.titlename = "设置";
    } else if (this.$route.path.indexOf("information") != -1) {
      this.titlename = "消息";
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.path.indexOf("addressRedact") != -1) {
          this.titlename = "编辑地址";
        } else if (newValue.path.indexOf("address") != -1) {
          this.titlename = "收货地址";
        } else if (newValue.path.indexOf("center") != -1) {
          this.titlename = "个人中心";
        } else if (newValue.path.indexOf("setting") != -1) {
          this.titlename = "设置";
        } else if (newValue.path.indexOf("information") != -1) {
          this.titlename = "消息";
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.manage {
  height: 100%;
}
</style>
