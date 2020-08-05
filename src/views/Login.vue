<template>
  <div class="login">
    <head_ />
    <title_ titleId="0" />
    <div class="formBox">
      <van-field v-model="phoneNum" maxlength="11" placeholder="请输入手机号/用户名" />
      <van-field v-model="pwd" maxlength="18" type="password" placeholder="请输入密码" />
      <span class="losePassword" @click="( $router.push('/password'))">忘记密码</span>
      <van-button class="btnForm" type="default" :loading="btnload" @click="loginClick">登录</van-button>
    </div>
  </div>
</template>

<script>
import title_ from "@/components/Title.vue";
import head_ from "@/components/Head.vue";
export default {
  name: "login",
  components: {
    title_,
    head_,
  },
  data() {
    return {
      phoneNum: "",
      pwd: "",
      btnload: false,
    };
  },
  mounted() {},
  methods: {
    loginClick: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else if (
        !this.pwd ||
        this.pwd.trim().length < 6 ||
        this.pwd.trim().length > 16
      ) {
        this.$toast("密码输入有误");
        return;
      }
      this.btnload = true;
      this.axios
        .post(this.$api.login, {
          phoneNum: this.phoneNum,
          pwd: this.pwd,
        })
        .then((data) => {
          this.btnload = false;
          if (data.code == 200) {
            this.$toast("登录成功");
            // 删除重新赋值
            localStorage.removeItem("vuex");
            this.$store.commit("resetState");
            this.$store.commit("show_user", data.data);
            if (data.data.type) {
              this.$router.push({
                path: "/switchoverUser",
                query: this.$route.query,
              });
            } else {
              Object.keys(this.$route.query).length == 0
                ? this.$router.push("/")
                : this.$router.go(-1);
            }
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.btnload = false;
          this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>

<style scoped>
.Title {
  padding: 0 1rem;
}
.formBox {
  padding: 3rem 2rem;
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
