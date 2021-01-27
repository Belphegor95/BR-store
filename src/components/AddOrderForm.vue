<!-- 订单生成成功 -->
<template>
  <div>
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="popuClick"
      :fixed="false"
      title="订单信息"
    />
    <div class="content">
      <img src="../assets/img/form/wc.png" />
      <div class="msgbox">
        <p>订单编号:{{ order.tradeNo }}</p>
        <p>
          应付金额:
          <span>{{ order.money }}</span>
        </p>
      </div>
      <div class="btnbox">
        <van-button type="primary" color="#faa062" @click="popuClick"
          >返回</van-button
        >
        <van-button type="primary" color="#e75858" @click="onPay"
          >立即支付</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  data() {
    return {};
  },
  methods: {
    popuClick: function () {
      this.$store.commit("show_order_", {});
      // this.$router.push("/shopping/orderForm?formid=1");
      this.$emit("popuClick", false);
    },
    onPay: function () {
      // 根据打包设置的 app还是网站来 区分支付方式
      this.$api.isApp ? this.appPay() : this.h5Pay();
      // this.h5Pay();
    },
    // 网站支付
    h5Pay: function () {
      let url = `http://www.kaixintu.cn/wxPay/pay/jsapi.php?tradeNo=${this.order.tradeNo}1&money=${this.order.money}&orderType=0&baseUrl=${this.$api.baseUrl}`;
      window.location.href = url;
    },
    // app支付
    appPay: function () {
      this.$router.push({
        path: "/shopping/payment",
        query: {
          tradeNo: this.order.tradeNo,
          money: this.order.money,
        },
      });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  padding: 1rem;
  align-items: center;
  flex-direction: column;
}
.msgbox {
  margin-top: 1rem;
  text-align: center;
  line-height: 2rem;
}
.btnbox {
  width: 100%;
  display: flex;
  margin-top: 4rem;
  justify-content: space-around;
}
.btnbox div {
  width: 4.5rem;
}
img {
  width: 8rem;
}
</style>