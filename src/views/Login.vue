<template>
  <div class="login">
    <title_ titleId="0" />
    <div class="formBox">
      <van-field v-model="phoneNum" maxlength="11" placeholder="请输入手机号/用户名" />
      <van-field v-model="pwd" maxlength="18" type="password" placeholder="请输入密码" />
      <span class="losePassword" @click="( $router.push('/password'))">忘记密码</span>
      <van-button class="btnForm" type="default" @click="loginClick">登录</van-button>
    </div>
  </div>
</template>

<script>
import title_ from "@/components/Title.vue";

export default {
  name: "login",
  components: {
    title_
  },
  data() {
    return {
      phoneNum: "",
      pwd: ""
    };
  },
  methods: {
    loginClick: function() {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else if (!this.pwd || this.pwd.length < 6) {
        this.$toast("密码输入有误");
        return;
      }
      this.axios
        .post(this.$api.login, {
          phoneNum: this.phoneNum,
          pwd: this.pwd
        })
        .then(data => {
          if (data.code == 200) {
            this.$toast("登录成功");
            localStorage.removeItem('vuex')
            this.$store.commit("show_activeid", 0);
            this.$router.push("/homePage");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.login {
  padding: 3rem 1rem;
}
.formBox {
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.formBox > div {
  font-size: 1.1rem;
}
.formBox > div:nth-child(1) {
  margin-bottom: 1rem;
}
.losePassword {
  width: 100%;
  color: #c6c6c6;
  text-align: right;
  margin: 1rem 0;
  font-size: 0.8rem;
}
.btnForm {
  margin-top: 0.5rem;
}
</style>
<style >
.login .van-cell::after {
  display: none;
}
.login .van-cell {
  border-bottom: 1px solid #ebedf0 !important;
}
</style>
