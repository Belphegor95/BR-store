<!-- 我的订单 -->
<template>
  <div class="orderForm">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="订单" />
    <ul>
      <li v-for="item in 5" :key="item">
        <div class="orderNum">
          <p>DH-O-20200714-275691</p>
          <p>待订单审核</p>
        </div>
        <div class="imgBox" @click="($router.push('/shopping/order'))">
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
          <van-button class="paybtn" type="default" size="small">立即支付</van-button>
          <van-button type="default" size="small">再次购买</van-button>
          <van-button type="default" size="small">修改订单</van-button>
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
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
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
ul {
  overflow-y: auto;
}
ul::-webkit-scrollbar {
  display: none;
}
li {
  background: #fff;
  margin-bottom: 1rem;
}
/* 最后一个li */
li:last-child {
  margin-bottom: 0;
}
.orderNum {
  display: flex;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;
}
.orderNum p:nth-child(2) {
  color: #feb35c;
}
/* 种类 */
li > p {
  text-align: right;
  padding: 0 1rem;
  font-size: 0.9rem;
}
/* 按钮 */
.btnBox {
  display: flex;
  padding: 0.7rem 1rem;
  flex-direction: row-reverse;
}
.btnBox button {
  color: #8c8c8c;
  padding: 0 0.8rem;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
}
.btnBox .paybtn {
  color: #feb35c;
  border: 1px solid #feb35c;
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
