<template>
  <div class="setting">
    <div>
      <van-cell
        title="用户名"
        :value="$store.state.user.companyName ? $store.state.user.companyName: '暂无'"
      />
      <!-- <van-cell title="换绑手机" @click="tarPush(0)" is-link value="186****5358" /> -->
      <van-cell title="换绑手机" @click="tarPush(0)" is-link />
      <!-- <van-cell title="登录密码" @click="tarPush(1)" is-link value="******" /> -->
      <van-cell title="修改密码" @click="tarPush(1)" is-link />
    </div>
    <div>
      <van-cell title="关于开心兔" is-link />
      <van-cell title="当前版本" value="1.02" />
    </div>
    <!-- <div class="btnBox" @click="quitClick">切换账号</div> -->
    <div class="btnBox" @click="quitClick">退出登录</div>
    <van-popup
      :overlay="false"
      v-model="popupShow"
      position="right"
      :style="{ height: height,width: '100%' }"
    >
      <phone v-if="tarbarType == 0" />
      <password v-else-if="tarbarType == 1" />
    </van-popup>
  </div>
</template>
<script>
import phone from "./subfile/Phone";
import password from "./subfile/Password_";
export default {
  components: {
    phone,
    password,
  },
  data() {
    return {
      popupShow: false,
      tarbarType: 0,
      height: 0,
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.query.tarbar) {
          this.tarbarType = newValue.query.tarbar;
          !this.popupShow ? (this.popupShow = true) : null;
          return;
        }
        this.popupShow = false;
      },
      deep: true,
    },
  },
  mounted() {
    // 弹窗动画有小数导致字模糊
    this.height = window.innerHeight;
    this.height % 2 != 0 ? this.height-- : "";
    this.height = this.height + "px";
    // 如果没登录让他跳转到首页
    if (!this.$store.state.user.companyName) this.$router.push("/");
  },
  methods: {
    tarPush: function (type) {
      this.$router.push(`/manage/setting?tarbar=${type}`);
    },
    // 退出登录
    quitClick: function () {
      this.$dialog
        .confirm({
          message: "确定退出吗?",
        })
        .then(() => {
          this.axios
            .post(this.$api.logout)
            .then((data) => {
              if (data.code == 200) {
                this.$store.commit("show_user", {});
                this.$store.commit("show_activeid", 0);
                localStorage.removeItem("vuex");
                this.$router.push("/login");
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              //   this.$toast.fail(this.$api.monmsg);
            });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.setting {
  height: 100%;
  background-color: #f5f5f5;
}
.setting > div {
  background-color: #fff;
  margin-bottom: 1rem;
}
/* 底部按钮 */
.btnBox {
  display: flex;
  line-height: 3rem;
  align-items: center;
  justify-content: center;
}
</style>
