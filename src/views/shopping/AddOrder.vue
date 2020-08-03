<!-- 填写订单 -->
<template>
  <div class="addOrder">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="填写订单" />
    <div class="content">
      <!-- 地址 -->
      <div class="siteBox" @click="popupClick(0)">
        <p>{{ site.linkman }} {{ site.phone }}</p>
        <div class="site">
          <p>
            <span v-if="site.address_default">默认</span>
            {{ site.address }}
          </p>
          <van-icon class="van-cell__right-icon" name="arrow" />
        </div>
      </div>
      <!-- 商品清单 -->
      <div class="inventoryBox">
        <div>
          <p>商品清单</p>
          <p style="font-weight: 400;font-size: 0.8rem">种类:{{ orderdata.cateCount }},数量:{{ orderdata.plistCount }}</p>
        </div>
        <div @click="popupClick(1)">
          <div>
            <img v-for="(item,index) in orderdata.picUrl" :key="index" :src="item" />
          </div>
          <van-icon class="van-cell__right-icon" name="arrow" />
        </div>
      </div>
      <!-- 付款信息 -->
      <div class="paymentBox">
        <p>付款金额</p>
        <div>
          <p>优惠券</p>
          <p>请选择</p>
        </div>
        <div>
          <p>订单金额</p>
          <p>￥{{ orderdata.totalMoney }}</p>
        </div>
      </div>
      <!-- 配送方式 -->
      <div class="distributionBox">
        <van-cell title="配送方式" value="免费配送" />
        <van-cell title="备注信息" is-link :value="notes?notes: '请输入'" @click="popupClick(2)" />
        <van-cell title="发票信息" is-link :value="billState?'电子发票':'不开发票'" @click="popupClick(3)" />
      </div>
    </div>

    <van-submit-bar
      class="noSubmit"
      v-if="orderdata.needMoney && orderdata.needMoney !=0"
      :price="orderdata.totalMoney * 100"
      label="应付金额："
      button-text="提交订单"
      @submit="onSubmit"
      :loading="btnload"
    >
      <template #tip>
        <i class="van-icon van-icon-info-o van-submit-bar__tip-icon"></i>
        <span>还差{{ orderdata.needMoney | toFixed }}起送</span>
      </template>
    </van-submit-bar>
    <van-submit-bar v-else :loading="btnload" class="yesSubmit" label="应付金额：" :price="orderdata.totalMoney * 100" button-text="提交订单" @submit="onSubmit" />
    <!-- 弹出框 -->
    <van-popup v-model="popupShow" :overlay="false" position="right" :style="{ height: height }" class="popup">
      <van-nav-bar left-arrow class="navBar" @click-left="popupShut" :fixed="false" :title="popupid == 0? '地址选择':popupid == 1? '商品清单':popupid == 2? '备注信息':'发票信息' " />
      <!-- 地址选择 -->
      <address_ @address="addressClick" :address="orderdata.address" v-if="popupid == 0" />
      <!-- 订单详情 -->
      <div v-else-if="popupid == 1" class="productbox">
        <div v-for="(item,index) in orderdata.plistDetail" :key="index" class="product">
          <img :src="item.picUrl" />
          <div>
            <p>{{ item.plistName }}</p>
            <div class="productSize">
              <span>颜色分类:{{ item.cateName? item.cateName: '暂无' }}</span>
              <span>{{ item.priceName }}</span>
            </div>
            <div class="productNum">x{{ item.buyNum }}</div>
          </div>
        </div>
      </div>
      <!-- 备注信息 -->
      <div v-else-if="popupid == 2" class="remarksbox">
        <van-field v-model="notes" rows="4" autosize type="textarea" maxlength="50" placeholder="请输入备注信息" show-word-limit />
      </div>
      <!-- 发票信息 -->
      <div v-else class="invoicebox">
        <van-radio-group v-model="billState" class="groupbox">
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
      orderdata: {}, // 订单数据
      site: {}, // 默认地址
      popupShow: false,
      popupid: 0,
      notes: "",
      billState: 0,
      btnload: false,
      height: 0,
    };
  },
  mounted() {
    this.height = window.innerHeight;
    this.height % 2 != 0 ? this.height-- : "";
    this.height = this.height + "px";
    this.orderdata = this.$store.state.order;
    this.getsite();
    if (this.orderdata.popupid) {
      this.popupShow = true;
      this.popupid = this.orderdata.popupid;
    }
  },
  methods: {
    // 获取默认地址
    getsite: function () {
      if (this.orderdata.address == undefined) return;
      let address = this.orderdata.address;
      for (let i = 0; i < address.length; i++) {
        if (address[i].address_default == 1) {
          this.site = address[i];
          return;
        }
      }
    },
    // 提交订单
    onSubmit: function () {
      if (Object.keys(this.site).length == 0) {
        this.$toast("请添加地址!");
        return;
      }
      console.info(this.orderdata)
      // this.btnload = true;
      // this.axios
      //   .post(this.$api.submitOrder, {
      //     addressId: this.site.id,
      //     plistIds: this.orderdata.addressId,
      //     sendType: 0, //配送方式 0:免费配送,1:自提
      //     notes: this.notes,
      //     billState: this.billState,
      //   })
      //   .then((data) => {
      //     if (data.code == 200) {
      //       this.btnload = false;
      //       // this.$router.push("/shopping/orderForm?formid=1");
      //       this.$router.push({
      //         path: "/shopping/orderForm",
      //         query: {
      //           formid: 1,
      //           order: JSON.stringify(data.data),
      //         },
      //       });
      //     } else {
      //       this.btnload = false;
      //       this.$toast(this.ErrCode(data.msg));
      //     }
      //   })
      //   .catch(() => {
      //     this.btnload = false;
      //     //   this.$toast.fail(this.$api.monmsg);
      //   });
    },
    // 打开弹出层
    popupClick: function (index) {
      this.popupid = index;
      this.$router.push({
        path: `/shopping/addOrder?popupid=${index}`,
        query: this.$route.query,
      });
      // this.$router.push();
      this.popupShow = true;
    },
    // 弹出层点击返回
    popupShut: function () {
      this.$router.go(-1);
      this.popupShow = false;
    },
    // 地址选择
    addressClick: function (data) {
      this.$router.go(-1);
      this.site = data;
      this.popupShow = false;
    },
  },
  filters: {
    toFixed: function (value) {
      // 替换地址 /
      return value.toFixed(2);
    },
  },
};
</script>
<style scoped>
.addOrder {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.content {
  flex: auto;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}

.siteBox,
.inventoryBox {
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
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  color: #bbbbbb;
  display: flex;
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
  display: flex;
  width: 100%;
  overflow-y: auto;
}
.inventoryBox img {
  width: 5rem;
  height: 5rem;
  margin-right: 0.5rem;
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
  padding: 0.6rem 1rem;
  justify-content: space-between;
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
.distributionBox > div:nth-child(1),
.distributionBox > div:nth-child(2) {
  border-bottom: 1px solid #f5f5f5;
}
/* 底部按钮 */
.btnBox {
  display: flex;
}
.btnBox > div {
  flex: 1;
  padding: 1rem;
  text-align: center;
  margin-top: 1rem;
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
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* top: 0;
  left: 0;
  transform: translate3d(0, 0, 0); */
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
.productSize {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
.productSize span:nth-child(1) {
  font-size: 0.8rem;
  color: #969696;
}
.productSize span:nth-child(2) {
  /* font-size: 0.8rem; */
  color: #ff341d;
}
.productNum {
  text-align: right;
  font-size: 0.8rem;
  color: #999;
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
/* 底部气泡 */
.poptipArrow {
  background-color: #e75858;
  position: absolute;
  will-change: top, left;
  top: -2.8rem;
  left: 17rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.ivu-poptip-arrow {
  left: 57%;
  margin-left: -7px;
}
.ivu-poptip-arrow {
  bottom: -8px;
  border-width: 7px 7px 0;
  border-top-color: hsla(0, 0%, 85%, 0.5);
}
.ivu-poptip-arrow,
.ivu-poptip-arrow:after {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent;
  border-style: solid;
}
.ivu-poptip-arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -7px;
  border-bottom-width: 0;
  border-top-width: 7px;
  border-top-color: #e75858;
}
</style>
<style>
.addOrder .van-submit-bar__text {
  text-align: left;
}
.addOrder .van-nav-bar .van-icon {
  color: #fff;
}
.addOrder .van-cell::after {
  border: none;
}
.remarksbox .van-field__value {
  background-color: #f9f9f9;
  padding: 0.2rem;
  border-radius: 0.2rem;
}
.addOrder .van-submit-bar {
  position: relative;
}
.addOrder .van-submit-bar__tip {
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;
}
/* 底部右侧内边距取消 */
.addOrder .van-submit-bar__bar {
  padding-right: 0;
}
/* 底部按钮样式 */
.addOrder .van-submit-bar__button {
  height: 100%;
  border-radius: 0;
}
.noSubmit .van-submit-bar__button {
  background: #bebebe !important;
}
.yesSubmit .van-submit-bar__button {
  background: #e75858 !important;
}
</style>
