<template>
  <div class="switchoverUser">
    <head_ />
    <div class="contentbox">
      <h3>请选择要登录的ID</h3>
      <ul>
        <li v-for="(item,index) in 4" :key="index">
          <img src="../assets/img/tx.png" alt />
          <div class="userName">
            <p>开心兔商城用户:95279527</p>
            <p>昵称:小三</p>
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
    head_
  },
  data() {
    return {};
  }
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
  padding: 0 1rem;
  flex-direction: column;
}
.contentbox > h3 {
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 2rem;
  padding-top: 1rem;
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
</style>
