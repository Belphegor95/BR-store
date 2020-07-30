<template>
  <div class="password">
    <head_ />
    <div class="passwordBox">
      <title_ titleId="2" />
      <div class="formBox">
        <van-field v-model="text" label="+86" placeholder="请输入手机号/用户名">
          <template #button>
            <van-button size="small" class="btn" v-if="!isloading">获取验证码</van-button>
            <p class="btnloadClass" v-else>{{ btnload }} s</p>
          </template>
        </van-field>
        <van-field v-model="text" label="验证码" placeholder="请输入验证码" />
        <van-field v-model="text" label="新密码" placeholder="请输入新密码" />
      </div>
      <van-button class="btnForm" type="default">确定</van-button>
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
    head_
  },
  data() {
    return {
      text: "",
      isloading: false,
      btnload: 60,
    };
  }
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
