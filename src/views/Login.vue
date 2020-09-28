<template>
  <div class="login">
    <head_ />
    <title_ titleId="0" />
    <div class="formBox">
      <van-field v-model="phoneNum" maxlength="11" placeholder="请输入手机号/用户名" />
      <van-field key="010" v-model="pwd" maxlength="18" type="password" placeholder="请输入密码" v-if="logintype" />
      <van-field key="101" v-model="yzm" maxlength="6" placeholder="验证码" v-else>
        <template #button>
          <van-button size="small" class="btn" v-if="!isloading" @click="getYzm">获取验证码</van-button>
          <p class="btnloadClass" v-else>{{ btnloadnum }} s后重新获取</p>
        </template>
      </van-field>
      <div class="btnbox">
        <span @click="logintype = !logintype">{{ logintype ? "验证码登录": "密码登录" }}</span>
        <span class="losePassword" @click="( $router.push('/password'))">忘记密码</span>
      </div>
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
      yzm: "",
      btnload: false,
      logintype: true,
      btnloadnum: 60,
      isloading: false,
    };
  },
  mounted() {},
  methods: {
    loginClick: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else {
        if (this.logintype) {
          if (
            !this.pwd ||
            this.pwd.trim().length < 6 ||
            this.pwd.trim().length > 16
          ) {
            this.$toast("密码输入有误");
            return;
          }
        } else {
          if (this.yzm.trim().length != 6) {
            this.$toast("验证码输入有误");
            return;
          }
        }
      }
      this.btnload = true;
      let obj = {};
      let url = null;
      if (this.logintype) {
        obj = {
          phoneNum: this.phoneNum,
          pwd: this.pwd,
        };
        url = this.$api.login;
      } else {
        obj = {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
        };
        url = this.$api.loginByYzm;
      }
      this.axios
        .post(url, obj)
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
    // 获取验证码
    getYzm: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      }
      this.axios
        .post(this.$api.getYzmForLogin, {
          phoneNum: this.phoneNum,
        })
        .then((data) => {
          if (data.result == "OK") {
            this.isloading = true;
            this.$toast("验证码已发送");
            this.setloadingNum();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 验证码倒计时
    setloadingNum: function () {
      // 倒计时
      if (this.isloading && this.btnloadnum != -1) {
        setTimeout(() => {
          this.btnloadnum--;
          this.setloadingNum();
        }, 1000);
      } else {
        this.btnloadnum = 60;
        this.isloading = false;
      }
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
.formBox > .btnbox {
  display: flex;
  padding: 1rem 0;
  font-size: 0.8rem;
  align-items: center;
  justify-content: space-between;
}
.losePassword {
  /* width: 100%; */
  color: #c6c6c6;
  text-align: right;
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
