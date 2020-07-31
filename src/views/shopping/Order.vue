<!-- 订单详情 -->
<template>
  <div class="order">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
      title="订单详情"
    />
    <div class="content">
      <div class="orderidBox">
        <p>
          <i v-if="orderData.type == 1">待支付</i>
          <i v-else-if="orderData.type == 2">待收货</i>
          <span>{{ orderData.tradeNo }}</span>
        </p>
      </div>
      <!-- 地址 -->
      <div class="siteBox" @click="popupClick(0)" v-if="orderData.address">
        <p>{{ orderData.address.linkman }} {{ orderData.address.phone }}</p>
        <div class="site">
          <p>
            <span v-if="orderData.address.address_default">默认</span>
            {{ orderData.address.address | site }}{{ orderData.address.address_detail }}
          </p>
          <van-icon class="van-cell__right-icon" name="arrow" />
        </div>
      </div>
      <!-- 商品清单 -->
      <div class="inventoryBox">
        <div>
          <p>商品清单</p>
          <p
            style="font-weight: 400;font-size: 0.8rem"
          >种类:{{ orderData.cateCount }},数量:{{ orderData.plistCount }}</p>
        </div>
        <div @click="popupClick(1)">
          <div>
            <img :src="item" v-for="(item,index) in orderData.picurl" :key="index" />
          </div>
          <van-icon class="van-cell__right-icon" name="arrow" />
        </div>
      </div>
      <!-- 付款信息 -->
      <div class="paymentBox">
        <p>付款金额</p>
        <div>
          <p>订单金额</p>
          <p>￥{{ orderData.money }}</p>
        </div>
        <div>
          <p>免费配送</p>
          <p style="color: #e75858;">￥{{ orderData.money }}</p>
        </div>
        <div>
          <p>应付金额</p>
        </div>
      </div>
      <div class="settlement">
        <p>待付: ￥{{ orderData.money }}</p>
      </div>
      <!-- 配送方式 -->
      <div class="distributionBox">
        <van-cell
          title="备注信息"
          is-link
          :value="orderData.notes?orderData.notes:'无'"
          @click="popupClick(2)"
        />
        <van-cell
          title="发票信息"
          is-link
          :value="orderData.billState == 0?'不开发票': '电子发票'"
          @click="popupClick(3)"
        />
      </div>
    </div>
    <div class="btnBox">
      <div v-if="isAlter">确认修改</div>
      <div v-else>再次购买</div>
    </div>
    <van-popup v-model="popupShow" class="popup">
      <van-nav-bar
        left-arrow
        class="navBar"
        @click-left="popupShut"
        :fixed="false"
        :title="popupid == 0? '地址选择':popupid == 1? '商品清单':popupid == 2? '备注信息':'发票信息' "
      />
      <!-- 地址选择 -->
      <address_ @address="addressClick" v-if="popupid == 0" />
      <!-- 订单详情 -->
      <div v-else-if="popupid == 1" class="productbox">
        <div v-for="(item,index) in orderData.plistDetail" :key="index" class="product">
          <img :src="item.picUrl" />
          <div>
            <p>{{ item.plistName }}</p>
            <div class="productSize">
              <span>颜色分类:{{ item.cateName }}</span>
              <span>{{ item.priceName }}</span>
            </div>
            <div>x{{ item.buyNum }}</div>
          </div>
        </div>
      </div>
      <!-- 备注信息 -->
      <div v-else-if="popupid == 2" class="remarksbox">
        <van-field
          v-model="orderData.notes"
          rows="4"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入备注信息"
          show-word-limit
        />
      </div>
      <!-- 发票信息 -->
      <div v-else class="invoicebox">
        <van-radio-group v-model="orderData.billState" class="groupbox">
          <van-radio :name="0" @click="radioClick(0)">不开发票</van-radio>
          <van-radio :name="1" @click="radioClick(1)">电子发票</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
import address_ from "../my/Address";
export default {
  components: {
    address_,
  },
  data() {
    return {
      isAlter: false, // 是否允许修改
      orderData: {},
      popupid: 0,
      popupShow: false,
      message: "",
      radio: 0,
    };
  },
  mounted() {
    this.getorderData();
    this.isAlter = this.$route.query.is;
  },
  methods: {
    onSubmit: function () {
      this.$emit;
    },
    // 打开弹出层
    popupClick: function (index) {
      if (this.isAlter) {
        this.popupid = index;
        // this.$router.push(`/shopping/order?popupid=${index}`);
        this.popupShow = true;
      } else {
        if (index == 1) {
          this.popupid = index;
          // this.$router.push(`/shopping/order?popupid=${index}`);
          this.popupShow = true;
        }
      }
    },
    // 弹出层点击返回
    popupShut: function () {
      // this.$router.go(-1);
      this.popupShow = false;
    },
    // 地址选择
    addressClick: function (data) {
      this.$router.go(-1);
      this.popupShow = false;
    },
    // 选择发票信息
    radioClick: function (index) {
      this.$router.go(-1);
      this.popupShow = false;
    },
    // 转换 参数格式
    getorderData: function () {
      this.orderData = JSON.parse(this.$route.query.data);
      for (let index in this.orderData) {
        if (typeof this.orderData[index] == "string") {
          try {
            let obj = JSON.parse(this.orderData[index]);
            // 判断是否是 JSON
            if (typeof obj == "object" && obj) {
              this.orderData[index] = JSON.parse(this.orderData[index]);
            }
          } catch (e) {}
        }
      }
    },
  },
  filters: {
    site: function (value) {
      // 替换地址 /
      return value.replace(/\//g, "");
    },
  },
};
</script>
<style scoped>
.order {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.content {
  flex: auto;
  overflow-y: auto;
}
.orderidBox {
  display: flex;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  justify-content: space-between;
}
.orderidBox p {
  color: #fec281;
  font-weight: 700;
}
.orderidBox span {
  color: #000;
  margin-left: 0.5rem;
}
.siteBox,
.inventoryBox,
.settlement {
  margin-bottom: 1rem;
}
.distributionBox {
  margin-bottom: 1px;
}
.siteBox {
  background: #fff;
  padding: 1rem;
}
.siteBox > p {
  font-weight: 700;
}
.site {
  margin: 0.5rem 0;
  color: #bbbbbb;
  display: flex;
  justify-content: space-between;
}
.site span {
  color: #fff;
  font-size: 0.1rem;
  padding: 0 0.2rem;
  border-radius: 1rem;
  background: #feb35c;
  margin: 0 0.2rem;
}
/* 清单 */
.inventoryBox {
  background-color: #fff;
}
.inventoryBox > div {
  display: flex;
  padding: 0.8rem 1rem;
  justify-content: space-between;
}
.inventoryBox > div:nth-child(1),
.paymentBox > p {
  font-weight: 700;
  border-bottom: 1px solid #f5f5f5;
}
.inventoryBox > div:nth-child(2) {
  align-items: center;
}
.inventoryBox > div:nth-child(2) > div {
  width: 100%;
  /* align-items: center; */
}
.inventoryBox img {
  width: 24%;
  max-height: 5rem;
  margin-right: 3px;
  /* width: 5rem; */
}
/* 付款 */
.paymentBox {
  background: #fff;
}
.paymentBox > p {
  padding: 0.8rem 1rem;
}
.paymentBox > div {
  display: flex;
  padding: 0.3rem 1rem;
  justify-content: space-between;
}
.paymentBox > div:nth-child(2) {
  padding-top: 0.5rem;
}
.paymentBox > div:nth-child(4) {
  padding-bottom: 0.5rem;
}

/* 配送方式 */
.distributionBox {
  background-color: #fff;
  margin-top: 1rem;
}
.distributionBox > div {
  display: flex;
  padding: 0.8rem 1rem;
  justify-content: space-between;
}
.distributionBox > div > p:nth-child(2) {
  color: #707070;
}
.distributionBox > div {
  border-bottom: 1px solid #f5f5f5;
}
/* 结算 */
.settlement {
  display: flex;
  align-items: center;
  margin-top: 1px;
  padding: 0.6rem 0.4rem;
  background-color: #fff;
  flex-direction: row-reverse;
}
.settlement p {
  color: #f93404;
}
.btnForm {
  width: 6rem;
  margin-left: 1rem;
  font-size: 0.9rem !important;
  border-radius: 2rem !important;
}
/* 底部按钮 */
.btnBox {
  background: #fff;
  display: flex;
  flex-direction: row-reverse;
}
.btnBox > div {
  width: 33%;
  padding: 1rem;
  border: 1px solid #f5f5f5;
  text-align: center;
  /* margin-top: 1rem; */
}
.btnBox > div:nth-child(1) {
  background-color: #fff;
  color: #707070;
}
.btnBox > div:nth-child(2) {
  background-color: #f6e0dd;
  color: #e75858;
}
.btnBox > div:nth-child(3) {
  background-color: #bb3220;
  color: #fff;
}
/* 弹出层 */
.popup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
}
/* 订单详情 */
.productbox {
  height: 100%;
  background-color: #f5f5f5;
}
.product {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.product > img {
  width: 5rem;
  /* height: 5rem; */
  margin-right: 0.5rem;
}
.product > div {
  display: flex;
  width: 100%;
  /* height: 5rem; */
  flex-direction: column;
  justify-content: space-between;
}
.product > div > div:nth-child(3) {
  text-align: right;
}
.productSize {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.productSize span:nth-child(1) {
  font-size: 0.8rem;
  color: #969696;
}
.productSize span:nth-child(2) {
  /* font-size: 0.8rem; */
  color: #ff341d;
}
/* 发票 */
.invoicebox {
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
}
.groupbox > div {
  display: flex;
  padding: 0.8rem;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
</style>
<style>
.order .van-submit-bar__text {
  text-align: left;
}
.order .van-nav-bar .van-icon {
  color: #fff;
}
.order .van-cell::after {
  border: none;
}
.remarksbox .van-field__value {
  background-color: #f9f9f9;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
</style>
