<!-- 退货/售后 -->
<template>
  <div class="aftermarket">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
      title="退货/售后"
    />
    <van-pull-refresh class="refreshbox" v-model="isRefresh" @refresh="onRefresh">
      <div class="recordbox" v-for="(item,index) in 4" :key="index">
        <div class="statusbox">
          <span>退款</span>
          <img src="../../assets/img/order/t.png" alt />
        </div>
        <div class="productbox">
          <img src="../../assets/img/home/cp.png" alt />
          <div>
            <div class="productname">
              <p>名字名字名字名字名字名字名字名字名字名字名字名字</p>
              <p>颜色分类:s427</p>
            </div>
            <p>退款: 439.00</p>
          </div>
        </div>
        <div class="markbox">
          <b>退款成功</b> 退款成功439.00
        </div>
        <div class="btnbox">
          <van-button round size="small" type="default" @click="$router.push('/shopping/refund')">查看详情</van-button>
          <van-button round size="small" type="default" >删除记录</van-button>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRefresh: false
    };
  },
  methods: {
    onRefresh: function() {
      this.isRefresh = false;
    }
  }
};
</script>

<style scoped>
.aftermarket {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.refreshbox {
  flex: auto;
  height: 1px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
/* list */
.recordbox {
  background-color: #fff;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
/* list 顶部盒子 */
.statusbox {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: #feb35e;
  padding: 0.2rem;
  border-bottom: 1px solid #f5f5f5;
}
.statusbox img {
  width: 1.2rem;
  margin-right: 0.5rem;
}
/* 产品 */
.productbox {
  display: flex;
  padding: 0.5rem;
}
.productbox > img {
  width: 8rem;
}
/* 右侧box */
.productbox > div {
  display: flex;
  margin-left: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
}
.productname > p:nth-child(2) {
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: #9c9c9c;
}
/* 退款状态 */
.markbox {
  margin: 0.5rem auto;
  padding: 0.4rem 2rem;
  background: #f9f9f9;
  /* display: inline-block; */
}
/* 底部按钮 */
.btnbox {
  display: flex;
  padding: 0.3rem;
  align-items: center;
  flex-direction: row-reverse;
}
.btnbox > button {
  margin-left: 0.5rem;
}
.btnbox > button:nth-child(1) {
  color: #feb03d;
  border: 1px solid #feb03d;
}
</style>