<template>
  <div class="head">
    <img @click="($router.go(-1))" src="../assets/img/home/fanhui.png" alt />
  </div>
</template>
<script>

export default {

  data() {
    return {};
  }
};
</script>
<style scoped>
.head {
  height: 3.5rem;
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}
img {
  width: 2rem;
}
</style>
