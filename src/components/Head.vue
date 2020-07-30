<template>
  <div class="head">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
    />
    <!-- <img @click="($router.go(-1))" src="../assets/img/home/fanhui.png"  /> -->
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
<style >
.head .van-nav-bar__left .van-icon {
  color: #000!important;
}
</style>