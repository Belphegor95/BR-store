<!-- 退款详情 -->
<template>
  <div class="refund">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
      title="退款详情"
    />
    <!-- 下拉刷新 -->
    <van-pull-refresh class="content" v-model="isRefresh" @refresh="onRefresh">
      <div class="refundstate">
        <p>退款成功</p>
        <p>2020年7月23日 09:22</p>
      </div>
      <div class="natixis">
        <div>
          <span>退款总金额</span>
          <span style="color: #f8362f">￥31.77</span>
        </div>
        <div>
          <span>退回交通银行(尾号9521)</span>
          <span>￥31.77</span>
        </div>
        <van-steps :active="1">
          <van-step>
            <div class="stepsbox">
              <h3>卖家退款</h3>
              <p>2016-07-12 12:40</p>
            </div>
          </van-step>
          <van-step>
            <div class="stepsbox">
              <h3>银行受理</h3>
              <p>2016-07-11 10:00</p>
            </div>
          </van-step>
          <van-step>
            <div class="stepsbox">
              <h3>退款成功</h3>
              <p>2016-07-10 09:30</p>
            </div>
          </van-step>
        </van-steps>
      </div>
      <div>
        <topic name="退款信息" color="#feb03d" style="background-color: #fff;" />
        <div class="productbox">
          <img src="../../assets/img/home/cp.png"  />
          <div>
            <p>名字名字名字名字名字名字名字名字名字名字名字名字</p>
            <p>颜色分类:s427</p>
          </div>
        </div>
      </div>
      <div class="msgbox">
        <p>退款原因: 商店缺货/大洋,联系我取消</p>
        <p>退款金额: 31.77</p>
        <p>申请时间: 2020年7月23日 14:02</p>
        <p>退款编号: 538456114541562841</p>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import topic from "@/components/Topic.vue";
export default {
  components: {
    topic
  },
  data() {
    return {
      isRefresh: false
    };
  },
  methods: {
    onRefresh: function() {}
  }
};
</script>

<style scoped>
.refund {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: auto;
  height: 1px;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  background-color: #f5f5f5;
}
/* 退款状态 */
.refundstate {
  padding: 0.5rem;
  color: #feb03d;
  font-weight: 700;
  margin-bottom: 1rem;
  background-color: #fff;
}
/* 银行信息 */
.natixis > div:nth-child(1),
.natixis > div:nth-child(2) {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  padding-right: 1rem;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
}
.natixis > div:nth-child(2) {
    margin-bottom: 0.5rem;
}
/* 底部退款信息 */
.msgbox {
    background-color: #fff;
    font-size: 0.9rem;
    padding: 0.5rem;
    color: #999;
}
.msgbox > p {
    padding: 0.2rem 0;
}
.refundstate > p {
  padding: 0.2rem 0;
}
.stepsbox {
  padding-top: 1rem;
  /* display: flex; */
}
.stepsbox h3,
.stepsbox p {
  text-align: center;
}

/* 产品 */
.productbox {
  display: flex;
  padding: 1rem;
  background-color: #f5f5f5;
}
.productbox > img {
  width: 6rem;
}
/* 右侧box */
.productbox > div {
  margin-left: 0.5rem;
}
.productbox > div > p:nth-child(2) {
  margin-top: 0.2rem;
  font-size: 0.9rem;
  color: #9c9c9c;
}
</style>
<style>
.refund .van-step__line,
.refund .van-step__circle-container {
  top: 0;
}
.refund .van-steps__items > div:nth-child(1) > .van-step__circle-container {
  left: 35px;
}
.refund .van-steps__items > div:nth-child(1) > .van-step__circle-container,
.refund .van-step--horizontal:last-child .van-step__circle-container {
  left: 35px;
}
/* 步骤条 */
.refund .van-steps,
.refund .van-step__circle-container {
  background-color: #f5f5f5;
}
/* 高度 */
.refund .van-step__line {
    height: 2px;
}

</style>
