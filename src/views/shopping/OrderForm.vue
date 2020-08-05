<!-- 我的订单 -->
<template>
  <div class="orderForm">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="订单" />
    <van-tabs animated lazy-render v-model="formid" @click="getOrderList">
      <van-tab v-for="(title,titleindex) in titleList" :key="titleindex" :title="title">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-empty v-if="orderList.length == 0" description="暂无数据" />
          <ul v-else>
            <li v-for="item in orderList" :key="item.tradeNo">
              <div class="orderNum">
                <p>{{ item.tradeNo }}</p>
                <p>订单{{ titleList[item.type] }}</p>
              </div>
              <div class="imgBox" @click="orderClick(item,false)">
                <img v-for="(img,indeximg) in item.picurl" :key="indeximg" :src="img" />
              </div>
              <p>种类:{{ item.cateCount }},数量:{{ item.plistCount }},总计: ￥{{ item.money }}</p>
              <div class="btnBox">
                <van-button class="paybtn" type="default" size="small">立即支付</van-button>
                <!-- <van-button type="default" size="small">再次购买</van-button> -->
                <!-- <van-button type="default" size="small" @click="orderClick(item,true)">修改订单</van-button> -->
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出框 -->
    <van-popup v-model="popupShow" :overlay="false" position="right" :style="{ height: height,width: '100%' }" class="popup">
      <addOrderForm :order="order" @popuClick="popuClick" />
    </van-popup>
  </div>
</template>
<script>
import addOrderForm from "@/components/AddOrderForm.vue";
export default {
  components: {
    addOrderForm,
  },
  data() {
    return {
      formid: 0,
      isRefresh: false,
      titleList: ["全部", "待付款", "待收货", "已完成", "已取消"],
      orderList: [],
      order: {}, // 提交订单后订单属性
      popupShow: false,
      height: 0,
    };
  },
  mounted() {
    this.height = window.innerHeight;
    this.height % 2 != 0 ? this.height-- : "";
    this.height = this.height + "px";
    this.formid = Number(this.$route.query.formid);
    this.getOrderList();
    if (!this.$route.query.order) return;
    let order = JSON.parse(this.$route.query.order);
    this.order = order ? order : {};
    if (Object.keys(this.order).length != 0) this.popupShow = true;
  },
  methods: {
    onRefresh: function () {
      this.getOrderList();
      this.isRefresh = false;
    },
    // 获取列表
    getOrderList: function () {
      this.orderList = [];
      this.axios
        .post(this.$api.getOrderList, {
          type: this.formid,
        })
        .then((data) => {
          if (data.code == 200) {
            this.orderList = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 跳转详情
    orderClick: function (item, is) {
      this.$store.commit("show_order", item);
      this.$router.push({
        path: "/shopping/order",
        query: {
          is: is,
        },
      });
    },
    // 弹窗关闭
    popuClick: function (is) {
      this.popupShow = is;
    },
    // 接收query传参 数据处理
    JSON_data: function (item) {
      let objString = JSON.stringify(item);
      let obj = JSON.parse(objString);
      for (let index in obj) {
        if (typeof obj[index] == "object")
          obj[index] = JSON.stringify(obj[index]);
      }
      return obj;
    },
  },
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
.imgBox img {
  width: 25%;
  max-height: 5rem;
  padding: 0.2rem;
}
ul {
  overflow-y: auto;
}
ul::-webkit-scrollbar {
  display: none;
}
li {
  background: #fff;
  margin-top: 0.1rem;
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
  height: 100%;
  display: flex;
  flex-direction: column;
}
.orderForm .van-tabs__content {
  height: 1px;
  flex: auto;
  overflow-y: auto;
  background-color: #f5f5f5;
}
/* 设置高度  下拉刷新问题 */
.orderForm .van-tab__pane {
  height: 100%;
  overflow-y: auto;
}
/* 顶部tab栏滚动关闭 */
.orderForm .van-tabs__nav {
  display: flex;
}
.orderForm .van-tab {
  flex: 1;
}
</style>
