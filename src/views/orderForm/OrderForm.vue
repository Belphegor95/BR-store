<template>
  <div class="orderForm">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      fixed
      placeholder
      title="订单"
    />
    <ul>
      <li>
        <div>
          <p>DH-O-20200714-275691</p>
          <p>待订单审核</p>
        </div>
        <div class="imgBox">
          <div>
            <img src="../../assets/img/product/particulars/chanpin.png" alt />
          </div>
          <div>
            <img src="../../assets/img/product/particulars/chanpin.png" alt />
          </div>
          <div>
            <img src="../../assets/img/product/particulars/chanpin.png" alt />
          </div>
          <div>
            <img src="../../assets/img/product/particulars/chanpin.png" alt />
          </div>
        </div>
        <p>种类:2,数量:22,总计: ￥176.64</p>
        <div class="btnBox">
          <van-button type="default" size="mini">迷你按钮</van-button>
          <van-button type="default" size="mini">迷你按钮</van-button>
          <van-button type="default" size="mini">迷你按钮</van-button>
        </div>
      </li>
    </ul>
    <!-- <van-tabs v-model="formid">
      <van-tab title="全部">内容 1</van-tab>
      <van-tab title="待付款">内容 2</van-tab>
      <van-tab title="待评价">内容 3</van-tab>
      <van-tab title="已完成">内容 4</van-tab>
    </van-tabs>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formid: 0
    };
  },
  mounted() {
    this.formid = this.$route.query.formid;
  }
};
</script>
<style scoped>
.orderForm {
  height: 100%;
}
.imgBox {
  display: flex;
  padding: 1rem;
}
.imgBox div {
  flex: 1;
  padding: 0.2rem;
}
.imgBox div img {
  width: 100%;
}
</style>
<style>
/* 设置选中的样式 */
.orderForm .van-tab--active {
  color: #feb35c;
}
.orderForm .van-tabs__line {
  background-color: #feb35c;
}
/* 设置高度占满 */
.orderForm .van-tabs {
  height: calc(100% - 46px);
  display: flex;
  flex-direction: column;
}
.orderForm .van-tabs__content {
  height: 1px;
  flex: auto;
  background-color: #f5f5f5;
  padding: 0.8rem 1rem;
}
</style>
