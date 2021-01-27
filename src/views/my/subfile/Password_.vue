<!-- 修改密码 -->
<template>
  <div class="password_">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="onBack"
      placeholder
      title="修改密码"
    />
    <div>
      <van-field
        v-model="phoneNum"
        label="手机号"
        placeholder="请输入手机号"
        readonly
      >
        <template #button>
          <van-button
            size="small"
            class="btn"
            v-if="!isloading"
            @click="yzmClick"
            >获取验证码</van-button
          >
          <p class="btnloadClass" v-else>{{ btnload }} s后重新获取</p>
        </template>
      </van-field>
      <van-field v-model="yzm" label="验证码" placeholder="请输入验证码" />
      <van-field
        v-model="pwd"
        label="新密码"
        type="password"
        placeholder="请输入新密码"
      />
      <van-field
        v-model="pwd_"
        label="再次新密码"
        type="password"
        placeholder="请输入再次新密码"
      />
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default" @click="resetPwd"
        >提交</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      phoneNum: "",
      yzm: "",
      pwd: "",
      pwd_: "",
      isloading: false,
      btnload: 60,
    };
  },
  mounted() {
    this.phoneNum = this.user.phone;
  },
  methods: {
    // 获取验证码
    yzmClick: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      }
      this.axios
        .post(this.$api.getYzmForFindPwd, {
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
          this.$toast(this.$api.monmsg);
        });
    },
    resetPwd: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else if (this.yzm.trim().length != 6) {
        this.$toast("验证码输入有误");
        return;
      } else if (this.pwd != this.pwd_) {
        this.$toast("两次输入不一致!");
        return;
      } else if (this.pwd.trim() == "" || this.pwd_.trim() == "") {
        this.$toast("密码不能为空!");
        return;
      } else if (this.pwd.trim().length < 6 || this.pwd_.trim().length < 6) {
        this.$toast("密码不能小于6位!");
        return;
      }
      this.axios
        .post(this.$api.resetPwd, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
          pwd: this.pwd,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$toast("修改成功!");
            this.$router.go(-1);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 验证码倒计时
    setloadingNum: function () {
      // 倒计时
      if (this.isloading && this.btnload != -1) {
        setTimeout(() => {
          this.btnload--;
          this.setloadingNum();
        }, 1000);
      } else {
        this.btnload = 60;
        this.isloading = false;
      }
    },
    onBack: function () {
      this.$emit("onBack", false);
    },
  },
};
</script>
<style scoped>
.password_ {
  height: 100%;
  background-color: #f5f5f5;
}
.btn span {
  background: linear-gradient(to right, #ffc474, #ff855a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btnBox {
  display: flex;
  padding: 2rem 0;
  justify-content: center;
}
.btnForm {
  width: 98%;
}
</style>
<style>
/* input 左边居中 */
.manage .van-field__label {
  display: flex;
  align-items: center;
}
</style>
