<template>
  <div class="home">
    <!-- 路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar
      v-model="activeid"
      class="tabbarBox"
      @change="tabbarClick"
      :fixed="false"
    >
      <van-tabbar-item>
        <img v-if="activeid === 0" src="../assets/img/home/shouye01.png" />
        <img v-else src="../assets/img/home/shouye.png" />
        首页
      </van-tabbar-item>
      <van-tabbar-item>
        <img v-if="activeid === 1" src="../assets/img/home/feilei01.png" />
        <img v-else src="../assets/img/home/feilei.png" />
        分类
      </van-tabbar-item>
      <van-tabbar-item :badge="count">
        <img v-if="activeid === 2" src="../assets/img/home/gouwuche01.png" />
        <img v-else src="../assets/img/home/gouwuche.png" />
        购物车
      </van-tabbar-item>
      <van-tabbar-item>
        <img v-if="activeid === 3" src="../assets/img/home/wode01.png" />
        <img v-else src="../assets/img/home/wode.png" />
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeid: 0,
      count: null,
    };
  },
  watch: {
    "$store.state.count": function (value) {
      if (value != 0) {
        this.count = value;
      } else {
        this.count = null;
      }
    },
    "$store.state.activeid": function (value) {
      this.activeid = value;
    },
  },
  mounted() {
    this.getShoppingCartPlistCount();
    this.activeid = this.$store.state.activeid;
  },
  methods: {
    tabbarClick: function (id) {
      this.$store.commit("show_activeid", id);
      if (id === 0) {
        this.$router.replace("/homePage");
      } else if (id === 1) {
        this.$router.replace("/classification");
      } else if (id === 2) {
        this.$router.replace("/shopping");
      } else if (id === 3) {
        this.$router.replace("/personage");
      }
    },
    // 获取购物车里商品数量
    getShoppingCartPlistCount: function () {
      this.axios
        .post(this.$api.getShoppingCartPlistCount)
        .then((data) => {
          if (data.code == 200) {
            if (data.data.count) {
              this.count = data.data.count;
            }
            this.$store.commit("show_count", data.data.count);
          } else {
            // this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          // this.$toast.fail(this.$api.monmsg);
        });
    },
    onSearch: function (val) {
      Toast(val);
    },
    onCancel: function () {
      Toast("取消");
    },
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    },
  },
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
.van-tabbar--unfit {
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}
.home .tabbarBox .van-info {
  top: 3px;
  right: -9px;
}
</style>
