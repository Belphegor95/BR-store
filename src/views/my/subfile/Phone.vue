<!-- 换绑手机号 -->
<template>
  <div class="phone">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="onBack"
      :fixed="false"
      placeholder
      title="换绑手机号"
    />
    <div class="phonebox" v-if="type == 0">
      <van-field
        v-model="phoneNum"
        label="新手机号"
        placeholder="请输入手机号"
        :key="1"
      >
        <template #button>
          <van-button size="small" class="btn" v-if="!isloading" @click="getYzm"
            >获取验证码</van-button
          >
          <p class="btnloadClass" v-else>{{ btnload }}</p>
        </template>
      </van-field>
      <van-field v-model="yzm" label="验证码" placeholder="请输入验证码" />
    </div>
    <div class="phonebox" v-else-if="type == 1">
      <p>
        您的手机号包含了其他订货服务,输入手机号登录密码可以将当前账号与手机号关联,同时该账号密码也将同步为手机号登录密码
      </p>
      <van-field
        readonly
        v-model="id"
        label="当前账号"
        placeholder="请输入当前账号"
      />
      <van-field
        readonly
        v-model="phoneNum"
        label="登录手机号"
        type="tel"
        placeholder="请输入登录手机号"
        :key="2"
      />
      <van-field
        v-model="pwd"
        label="登录密码"
        type="password"
        placeholder="请再次输入登录密码"
      />
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default" @click="confirmClick"
        >确定</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phoneNum: "",
      yzm: "", // 验证码
      id: "",
      pwd: "",
      type: 0,
      isloading: false,
      btnload: 60,
    };
  },
  methods: {
    confirmClick: function () {
      this.type == 0 ? this.applyChangePhone() : this.changePhone();
    },
    // 获取验证码
    getYzm: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      }
      this.axios
        .post(this.$api.getYzmForChangePhone, {
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
    // 换绑手机
    applyChangePhone: function () {
      this.axios
        .post(this.$api.applyChangePhone, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
        })
        .then((data) => {
          if (data.code == 200) {
            this.type = 1;
            this.phoneNum = data.data.phoneNum;
            this.id = data.data.id;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 换绑手机号
    changePhone: function () {
      this.axios
        .post(this.$api.changePhone, {
          phoneNum: this.phoneNum,
          pwd: this.pwd,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$toast("换绑成功!");
            this.$router.go(-1);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
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
.phone {
  height: 100%;
  background-color: #f5f5f5;
}
.phonebox {
  background-color: #fff;
}
.phonebox > p {
  height: 49px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: #999;
}
.btnBox {
  display: flex;
  padding: 2rem 0;
  justify-content: center;
}
.btnForm {
  width: 98%;
}
.btn span {
  background: linear-gradient(to right, #ffc474, #ff855a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
