<template>
  <div class="Title">
    <div v-if="titleId === '0'">
      <div class="topicBox">
        <p>登录</p>
        <div class="gradientBg" style="width: 3.8rem;"></div>
      </div>
      <p class="prompt">
        还没有账号,立即
        <i @click="go">注册</i>
      </p>
    </div>
    <div v-else-if="titleId === '1'">
      <div class="topicBox">
        <p>注册</p>
        <div class="gradientBg" style="width: 3.8rem;"></div>
      </div>
      <p class="prompt">
        已有账号,立即
        <i @click="go">登录</i>
      </p>
    </div>
    <div v-else-if="titleId === '2'">
      <div class="topicBox">
        <p @click="forgetPadClick">忘记密码</p>
        <div class="gradientBg" style="width: 7.1rem;"></div>
      </div>
      <p class="prompt">
        去
        <i @click="go">登录</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    titleId: String
  },
  data() {
    return {};
  },
  methods: {
    go: function() {
      this.titleId == 0
        ? this.$router.push("/register")
        : this.$router.push("/");
    },
    forgetPadClick: function() {
      console.info(123)
      // this.$router.push("/password");
    }
  }
};
</script>

<style scoped>
.Title {
  position: relative;
}
.prompt {
  color: #b1b1b1;
  margin-top: 0.5rem;
}
.topicBox {
  position: relative;
}
.topicBox > p {
  padding-left: 0.3rem;
  font-size: 1.6rem;
  font-weight: 700;
}
.gradientBg {
  z-index: -1;
  position: absolute;
  bottom: -0.1rem;
  left: 0;
  height: 0.5rem;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
i {
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
