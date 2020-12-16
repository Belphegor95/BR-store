<!-- 修改用户名 -->
<template>
  <div class="orderName">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="onBack"
      :fixed="false"
      placeholder
      title="修改用户名"
    />
    <van-field v-model="name" label="用户名" placeholder="请输入用户名" />
    <div class="btnBox">
      <van-button class="btnForm" type="default" @click="editAccOrderName"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      user: this.$store.state.user,
    };
  },
  methods: {
    editAccOrderName: function () {
      if (this.name.trim().length == 0) return this.$toast("名字输入不符合!");
      this.axios
        .post(this.$api.editAccOrderName, {
          companyName: this.name,
        })
        .then((data) => {
          if (data.code == 200) {
            this.user.companyName = this.name;
            this.$store.commit("show_user", this.user);
            this.$router.go(-1);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    onBack: function () {
      this.$emit("onBack", false);
    },
  },
};
</script>

<style scoped>
.orderName {
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