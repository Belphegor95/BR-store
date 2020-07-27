<!-- 我的订单 -->
<template>
  <div class="orderForm">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="订单" />
    <van-tabs v-model="formid" animated @click="getOrderList">
      <van-tab v-for="(title,titleindex) in titleList" :key="titleindex" :title="title">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <ul>
            <li v-for="(item,index) in orderList" :key="index">
              <div class="orderNum">
                <p>{{ item.tradeNo }}</p>
                <p>订单{{ titleList[item.type] }}</p>
              </div>
              <div class="imgBox" @click="orderClick(item)">
                <img v-for="(img,indeximg) in item.picurl" :key="indeximg" :src="img" alt />
              </div>
              <p>种类:{{ item.cateCount }},数量:{{ item.plistCount }},总计: ￥{{ item.money }}</p>
              <div class="btnBox">
                <van-button class="paybtn" type="default" size="small">立即支付</van-button>
                <van-button type="default" size="small">再次购买</van-button>
                <van-button type="default" size="small">修改订单</van-button>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formid: 0,
      isRefresh: false,
      titleList: ["全部", "待付款", "待收货", "已完成", "已取消"],
      orderList: [],
    };
  },
  mounted() {
    this.formid = Number(this.$route.query.formid);
    this.getOrderList();
  },
  methods: {
    onRefresh: function () {
      this.isRefresh = false;
    },
    getOrderList: function () {
      this.axios
        .post(this.$api.getOrderList, {
          type: this.formid,
        })
        .then((data) => {
          if (data.code == 200) {
            // console.info(data);
            this.orderList = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          //   this.$toast.fail(this.$api.monmsg);
        });
    },
    orderClick: function (item) {
      console.info(item);
      Object.values(item).some((value) => {
        if (typeof value == "object" || typeof value == "array") {
          console.info(index);
        }
      });
      // this.$router.push('/shopping/order')
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
</style>
