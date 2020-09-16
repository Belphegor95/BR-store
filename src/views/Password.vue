<template>
  <div class="password">
    <head_ />
    <div class="passwordBox">
      <title_ titleId="2" />
      <div class="formBox">
        <van-field v-model="phoneNum" label="+86" placeholder="请输入手机号/用户名">
          <template #button>
            <van-button size="small" class="btn" v-if="!isloading" @click="yzmClick">获取验证码</van-button>
            <p class="btnloadClass" v-else>{{ btnload }} s</p>
          </template>
        </van-field>
        <van-field v-model="yzm" label="验证码" placeholder="请输入验证码" />
        <van-field v-model="pwd" label="新密码" type="password" placeholder="请输入新密码" />
        <van-field v-model="pwd_" label="再次新密码" type="password" placeholder="请输入再次新密码" />
      </div>
      <van-button class="btnForm" type="default" @click="resetPwd">确定</van-button>
    </div>
  </div>
</template>
<script>
import title_ from "@/components/Title.vue";
import topic from "@/components/Topic.vue";
import head_ from "@/components/Head.vue";

export default {
  components: {
    title_,
    topic,
    head_,
  },
  data() {
    return {
      isloading: false,
      btnload: 60,
      phoneNum: "",
      yzm: "",
      pwd: "",
      pwd_: "",
    };
  },
  methods: {
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
            this.$router.push("/login");
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
  },
};
</script>
<style scoped>
.passwordBox {
  padding: 0 1rem;
}
.formBox {
  margin-top: 1.5rem;
}
.btn span {
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btnForm {
  margin-top: 2rem;
}
</style>
<style>
/* 每个输入框的高 */
.password .van-cell {
  margin-bottom: 0.6rem;
}
.password .van-cell::after {
  display: none;
}
.password .van-cell {
  border-bottom: 1px solid #ebedf0 !important;
}
</style>
