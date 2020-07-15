<template>
  <div class="setting">
    <div>
      <van-cell title="用户名" value="无动于衷" />
      <van-cell title="绑定手机" @click="tarPush(0)" is-link value="18639025358" />
      <van-cell title="登录密码" @click="tarPush(1)" is-link value="abc123456" />
    </div>
    <div>
      <van-cell title="关于开心兔" is-link />
      <van-cell title="检测更新" value="1.02" />
    </div>
    <div class="btnBox" @click="quitClick">切换用户</div>
    <div class="btnBox" @click="quitClick">退出登录</div>
    <van-popup v-model="popupShow" position="right" :style="{ height: '100%',width: '100%' }">
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
    password
  },
  data() {
    return {
      popupShow: false,
      tarbarType: 0
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
      deep: true
    }
  },
  methods: {
    tarPush: function(type) {
      this.$router.push(`/manage/setting?tarbar=${type}`);
    },
    quitClick: function () {
        this.$router.push("/login")
    }
  }
};
</script>
<style scoped>
.setting {
  height: calc(100% - 46px);
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
