<template>
  <div class="register">
    <!-- <head_ /> -->
    <div class="registerBox">
      <title_ titleId="1" />
      <div class="phoneBox">
        <!-- <p>
          欢迎加入开心兔商城,注册后,即可了解产品订货价格,可直接下单订货采购;支持货到付款,支持微信,信用卡,...
          <i>点击查看更多</i>
        </p>-->
        <van-field
          v-model="phoneNum"
          type="tel"
          maxlength="11"
          label="+86"
          placeholder="请输入手机号"
        >
          <template #button>
            <van-button
              size="small"
              class="btn"
              v-if="!isloading"
              @click="getYzm"
              >获取验证码</van-button
            >
            <p class="btnloadClass" v-else>{{ btnload }} s后重新获取</p>
          </template>
        </van-field>
        <van-field
          v-model="yzm"
          type="digit"
          maxlength="6"
          label="验证码"
          placeholder="请输入验证码"
        />
        <van-field
          v-model="pwd"
          label="密码"
          maxlength="18"
          type="password"
          placeholder="请输入初始密码"
        />
      </div>
      <!-- 详细信息 -->
      <!-- <topic name="详细信息" color="#feb35c" />
      <div>
        <van-field v-model="company" label="购货单位" placeholder="请输入购货单位" />
        <van-field v-model="linkman" label="联系人" placeholder="请输入联系人" />
        <van-field v-model="address" label="所属地区" placeholder="请输入所属地区" />
        <van-field v-model="address_detail" label="详细地址" placeholder="请输入详细地址" />
      </div>-->
      <van-button class="btnForm" type="default" @click="saveUser"
        >完成注册</van-button
      >
    </div>
    <van-popup
      v-model="popupShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <head_ />
      <div class="popupbox">
        <img src="../assets/img/form/wc.png" />
        <p>恭喜你账号注册成功</p>
        <van-button class="btnForm" type="default" @click="$router.push('/')"
          >立即进入</van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
import title_ from "@/components/Title.vue";
import topic from "@/components/Topic.vue";
// import head_ from "@/components/Head.vue";

export default {
  components: {
    title_,
    topic,
    // head_,
  },
  data() {
    return {
      phoneNum: "", // 手机/用户
      yzm: "", // 验证码
      pwd: "", // 密码
      btnload: 60,
      isloading: false,
      company: 0, // 购货单位
      linkman: 0, // 联系人
      address: 0, // 地址
      address_detail: 0, // 详细地址
      popupShow: false,
    };
  },
  methods: {
    // 注册账号
    saveUser: function () {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号输入有误");
        return;
      } else if (!/[0-9]{6}/.test(this.yzm)) {
        this.$toast("验证码输入有误");
        return;
      } else if (
        !this.pwd ||
        this.pwd.trim().length < 6 ||
        this.pwd.trim().length > 16
      ) {
        this.$toast("密码输入有误");
        return;
      }
      this.axios
        .post(this.$api.regist, {
          phoneNum: this.phoneNum,
          yzm: this.yzm,
          pwd: this.pwd,
        })
        .then((data) => {
          if (data.code == 200) {
            this.popupShow = true;
            this.$store.commit("show_user", data.data);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
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
        .post(this.$api.getYzm, {
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
.registerBox {
  padding: 0 1rem;
  margin-top: 3.5rem;
}

.phoneBox {
  padding: 0.5rem 0.2rem;
}
.phoneBox > p {
  color: #b1b1b1;
  font-size: 0.78rem;
  line-height: 1.4rem;
}
.register i {
  background: linear-gradient(to right, #ffc474, #ff855a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btn span {
  background: linear-gradient(to right, #ffc474, #ff855a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btnForm {
  margin: 2rem 0;
}
.popupbox {
  display: flex;
  padding: 2rem 1rem;
  align-items: center;
  flex-direction: column;
}
.popupbox > img {
  width: 8rem;
}
.popupbox > p {
  background: linear-gradient(to right, #ffc474, #ff855a);
  -webkit-background-clip: text;
  background-clip: text;
  margin-top: 1.5rem;
  color: transparent;
  font-size: 1.2rem;
}
</style>
<style >
/* 每个输入框的高 */
.register .van-cell {
  margin-bottom: 0.6rem;
}
.register .van-field__label {
  margin: 0;
  width: 4rem;
}
.register .van-cell::after {
  display: none;
}
.register .van-cell {
  border-bottom: 1px solid #ebedf0 !important;
}
</style>

