<!-- 意见建议 -->
<template>
  <div class="idea">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" @click-right="submitSuggest" fixed placeholder title="意见建议" right-text="发表" />
    <van-field v-model="notes" rows="6" autosize type="textarea" maxlength="100" placeholder="请输入意见建议信息" show-word-limit />
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: "",
      btnload: false,
    };
  },
  methods: {
    submitSuggest: function () {
      if (this.notes.trim() == "") {
        this.$toast("意见建议输入有误!");
        return;
      } else if (this.btnload) {
        this.$toast("正在发表!");
        return;
      }
      this.btnload = true;
      this.axios
        .post(this.$api.submitSuggest, {
          content: this.notes,
        })
        .then((data) => {
          this.btnload = false;
          if (data.code == 200) {
            this.$toast("发表成功!");
            this.$router.go(-1);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.btnload = false;
          this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>

<style scoped>
</style>
<style>
.idea .van-nav-bar__text {
  color: #fff;
}
.idea .van-field__value {
  background-color: #f9f9f9;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
</style>