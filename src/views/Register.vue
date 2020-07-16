<template>
  <div class="register">
    <head_ />
    <div class="registerBox">
      <title_ titleId="1" />
      <div class="phoneBox">
        <p>
          欢迎加入开心兔商城,注册后,即可了解产品订货价格,可直接下单订货采购;支持货到付款,支持微信,信用卡,...
          <i>点击查看更多</i>
        </p>
        <van-field v-model="yzm" label="+86" placeholder="请输入手机号/用户名">
          <template #button>
            <van-button size="small" class="btn">获取验证码</van-button>
          </template>
        </van-field>
        <van-field v-model="phoneNum" label="验证码" placeholder="请输入验证码" />
        <van-field v-model="phoneNum" label="密码" type="password"  placeholder="请输入密码" />
      </div>
      <!-- 详细信息 -->
      <!-- <topic name="详细信息" color="#feb35c" />
      <div>
        <van-field v-model="company" label="购货单位" placeholder="请输入购货单位" />
        <van-field v-model="linkman" label="联系人" placeholder="请输入联系人" />
        <van-field v-model="address" label="所属地区" placeholder="请输入所属地区" />
        <van-field v-model="address_detail" label="详细地址" placeholder="请输入详细地址" />
      </div> -->
      <van-button class="btnForm" type="default" @click="saveUser">完成注册</van-button>
    </div>
    <van-popup v-model="popupShow" position="right" :style="{ height: '100%',width: '100%' }">
      <head_ />
      <div class="popupbox">
        <img src="../assets/img/form/wc.png" />
        <p>恭喜你账号注册成功</p>
        <van-button class="btnForm" type="default" @click="saveUser">立即进入</van-button>
      </div>
    </van-popup>
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
    head_
  },
  data() {
    return {
      yzm: "", // 手机/用户
      phoneNum: "", // 验证码
      pwd: "", // 密码
      
      company: 0, // 购货单位
      linkman: 0, // 联系人
      address: 0, // 地址
      address_detail: 0, // 详细地址
      popupShow: false
    };
  },
  methods: {
    saveUser: function() {
      // this.popupShow = true;
    },
    getVerificationCode: function() {
      this.axios
        .post(this.$api.getVerificationCode, {
          phoneNum: 0
        })
        .then(data => {
          if (data.code) {
          } else {
          }
        })
        .catch(() => {});
    },
    saveregist: function() {
      // this.axios
      //   .post(this.$api.regist, {
      //     phoneNum: 0, // 验证码
      //     pwd: 0, // 密码
      //     yzm: 0, // 手机/用户
      //     company: 0, // 购货单位
      //     linkman: 0, // 联系人
      //     address: 0, // 地址
      //     address_detail: 0 // 详细地址
      //   })
      //   .then(data => {
      //     if (data.code) {
      //     } else {
      //     }
      //   })
      //   .catch(() => {});
    }
  }
};
</script>
<style scoped>
.registerBox {
  padding: 0 1rem;
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
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btn {
  border: 0px solid #ebedf0 !important;
}
.btn span {
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
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
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
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

