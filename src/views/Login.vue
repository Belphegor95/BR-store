<template>
  <div class="login">
    <title_ titleId="0" />
    <div class="formBox">
      <van-field v-model="text" placeholder="请输入手机号/用户名" />
      <van-field v-model="text1" type="password" placeholder="请输入密码" />
      <span class="losePassword" @click="( $router.push('/password'))">忘记密码</span>
      <van-button class="btnForm" type="default" @click="loginClick" >登录</van-button>
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
      text: "",
      text1: ""
    };
  },
  methods: {
    loginClick: function () {
      this.$router.push("/homePage")
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
