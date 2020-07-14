<template>
  <div class="phone">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      fixed
      placeholder
      title="换绑手机号"
    />
    <div>
      <van-field v-model="value" label="原密码" placeholder="请输入原密码" />
      <van-field v-model="value" label="新密码" type="password" placeholder="请输入新密码" />
      <van-field v-model="value" label="新密码" type="password" placeholder="请再次输入新密码" />
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
      value: ""
    };
  },
  created() {
    // console.info(123)
  }
};
</script>
<style scoped>
.phone {
  height: 100%;
  background-color: #f5f5f5;
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
