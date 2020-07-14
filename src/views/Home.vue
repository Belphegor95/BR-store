<template>
  <div class="home">
    <!-- 路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar v-model="activeid" class="tabbarBox" @change="tabbarClick"  :fixed="false">
      <van-tabbar-item>
        <img v-if="activeid === 0" src="../assets/img/home/shouye01.png" alt />
        <img v-else src="../assets/img/home/shouye.png" alt />
        首页
      </van-tabbar-item>
      <van-tabbar-item>
        <img v-if="activeid === 1" src="../assets/img/home/feilei01.png" alt />
        <img v-else src="../assets/img/home/feilei.png" alt />
        分类
      </van-tabbar-item>
      <van-tabbar-item>
        <img v-if="activeid === 2" src="../assets/img/home/gouwuche01.png" alt />
        <img v-else src="../assets/img/home/gouwuche.png" alt />
        购物车
      </van-tabbar-item>
      <van-tabbar-item>
        <img v-if="activeid === 3" src="../assets/img/home/wode01.png" alt />
        <img v-else src="../assets/img/home/wode.png" alt />
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeid: 0
    };
  },
  mounted() {
    this.activeid = this.$store.state.activeid;
  },
  methods: {
    tabbarClick: function(id) {
      this.$store.commit("show_activeid", id);
      if (id === 0) {
        this.$router.push("/homePage");
      } else if (id === 1) {
        this.$router.push("/classification");
      } else if (id === 2) {
        this.$router.push("/shopping");
      } else if (id === 3) {
        this.$router.push("/personage");
      }
    },
    onSearch: function(val) {
      Toast(val);
    },
    onCancel: function() {
      Toast("取消");
    },
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    }
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
/* .home > div:nth-child(1) {
  overflow-y: auto;
} */
/* 底部导航 */
.tabbarBox img {
  width: 1rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.3rem;
}
/* 单背景 */
.bgc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  z-index: -1;
  background-image: linear-gradient(to right, #ffc474, #ff855a);
}
</style>
<style >
/* 底部导航选中颜色 */
.home .van-tabbar-item--active {
  color: #feb35c;
}

</style>
