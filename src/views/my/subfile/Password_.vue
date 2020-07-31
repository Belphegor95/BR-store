<!-- 修改密码 -->
<template>
  <div class="password_">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      fixed
      placeholder
      title="修改密码"
    />
    <div>
      <van-field v-model="text" label="手机号" placeholder="请输入验证码" />
      <van-field v-model="text" label="验证码" placeholder="请输入手机号/用户名">
        <template #button>
          <van-button size="small" class="btn">获取验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="text" label="新手机号" placeholder="请输入验证码" />
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default">提交</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>
<style scoped>
.password_ {
  height: 100%;
  background-color: #f5f5f5;
}
.btn span {
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
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
