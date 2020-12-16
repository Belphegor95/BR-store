<template>
  <div class="setting">
    <div>
      <van-cell
        title="用户名"
        :value="
          $store.state.user.companyName ? $store.state.user.companyName : '暂无'
        "
        @click="tarPush(2)"
      />
      <!-- <van-cell title="换绑手机" @click="tarPush(0)" is-link value="186****5358" /> -->
      <van-cell title="换绑手机" @click="tarPush(0)" is-link />
      <!-- <van-cell title="登录密码" @click="tarPush(1)" is-link value="******" /> -->
      <van-cell title="修改密码" @click="tarPush(1)" is-link />
    </div>
    <div>
      <van-cell title="关于开心兔" @click="tarPush(3)" is-link />
      <van-cell title="当前版本" value="1.02" />
    </div>
    <!-- <div class="btnBox" @click="quitClick">切换账号</div> -->
    <div class="btnBox" @click="quitClick">退出登录</div>
    <van-popup
      :overlay="false"
      v-model="popupShow"
      position="right"
      :style="{ height: height, width: '100%' }"
    >
      <phone @onBack="onBack" v-if="tarbarType == 0" />
      <password @onBack="onBack" v-else-if="tarbarType == 1" />
      <orderName @onBack="onBack" v-else-if="tarbarType == 2" />
      <happyRabbit @onBack="onBack" v-else-if="tarbarType == 3" />
    </van-popup>
  </div>
</template>
<script>
import phone from "./subfile/Phone";
import password from "./subfile/Password_";
import orderName from "./subfile/OrderName";
import happyRabbit from "./subfile/HappyRabbit";
export default {
  components: {
    phone,
    password,
    orderName,
    happyRabbit,
  },
  data() {
    return {
      popupShow: false,
      tarbarType: 0,
      height: 0,
    };
  },
  mounted() {
    // 弹窗动画有小数导致字模糊
    this.height = window.innerHeight;
    this.height % 2 != 0 ? this.height-- : "";
    this.height = this.height + "px";
    // 如果没登录让他跳转到首页
    if (!this.$store.state.user.companyName) this.$router.push("/");
    this.onBack();
  },
  methods: {
    tarPush: function (type) {
      this.$router.replace(`/manage/setting?tarbar=${type}`);
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
                localStorage.removeItem("vuex");
                this.$store.commit("resetState");
                this.$router.push("/login");
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast.fail(this.$api.monmsg);
            });
        })
        .catch(() => {});
    },
    onBack: function () {
      this.popupShow = false;
      this.$route.path != "/manage/setting"
        ? this.$router.replace(`/manage/setting`)
        : "";
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
