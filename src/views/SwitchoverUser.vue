<template>
  <div class="switchoverUser">
    <!-- <head_ /> -->
    <!-- <div class="head"></div> -->
    <div class="contentbox">
      <h3>请选择要登录的ID</h3>
      <ul>
        <li v-for="(item,index) in users" :key="index" @click="on(item)">
          <img src="../assets/img/tx.png" />
          <div class="userName">
            <p>开心兔商城用户:{{ item.id }}</p>
            <p>昵称:{{ item.company_name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import head_ from "@/components/Head.vue";
export default {
  components: {
    head_,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.$store.state.user.loginData
      ? (this.users = this.$store.state.user.loginData)
      : (this.users = []);
  },
  methods: {
    on: function (item) {
      this.axios
        .post(this.$api.selectAcc, {
          accOrderId: item.id,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$store.commit("show_user", data.data);
            Object.keys(this.$route.query).length == 0
              ? this.$router.push("/")
              : this.$router.go(-2);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          //   this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>
<style scoped>
.switchoverUser {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.contentbox {
  display: flex;
  flex: auto;
  height: 1px;
  padding: 3rem 1rem;
  flex-direction: column;
}
.contentbox > h3 {
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 1rem;
  /* padding-top: 1rem; */
  background: linear-gradient(to right, #ffd8a4, #fcaa8d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.contentbox li {
  display: flex;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}
.contentbox li > img {
  width: 4rem;
  margin-right: 1rem;
}
.userName {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
ul {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
