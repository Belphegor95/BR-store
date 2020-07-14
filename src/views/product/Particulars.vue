<template>
  <div class="particulars">
    <div class="imgBox">
      <van-swipe class="my-swipe" :loop="false" indicator-color="white" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in 4" :key="index">
          <img src="../../assets/img/product/particulars/chanpin.png" style="width:100%" />
        </van-swipe-item>
      </van-swipe>
      <img
        class="backImg"
        @click="backClick"
        src="../../assets/img/product/particulars/fanhui.png"
        alt
      />
    </div>
    <!-- 商品价格 -->
    <div class="attributeBox">
      <div class="priceBox">
        <div>
          <p>
            ￥
            <i>27</i> .9/包
          </p>
        </div>
        <div>
          <p>
            <i>558</i>/件
          </p>
          <p>￥27.9/包</p>
        </div>
      </div>
      <h4>73381得力图画本(10/200)</h4>
    </div>
    <!-- 规格 -->
    <div class="specificationBox">
      <div class="specification">
        <p>规格</p>
        <p>颜色: 蓝色</p>
      </div>
      <div @click="popClick">...</div>
    </div>
    <!-- 商品详情页 -->
    <div class="presentationBox">
      <topic name="商品介绍" color="#3ba8fa" />
      <img v-for="item in 4" :key="item" src="../../assets/img/product/particulars/chanpin.png" alt />
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-icon v-if="false" icon="star-o" text="已收藏" />
      <van-goods-action-icon v-else icon="star" text="已收藏" color="#feb35c" />
      <van-goods-action-button type="warning" text="加入购物车" @click="popClick" />
    </van-goods-action>
    <popUp :show="show" @showClick="showClick" />
  </div>
</template>
<script>
import topic from "@/components/Topic.vue";
import popUp from "@/components/PopUp.vue";
export default {
  components: {
    topic,
    popUp
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    backClick: function() {
      this.$router.go(-1);
    },
    popClick: function() {
      this.show = !this.show;
    },
    onClickIcon() {
      Toast("点击图标");
    },
    showClick: function(is) {
      this.show = is;
    }
  }
};
</script>
<style scoped>
.particulars {
  background: #f5f5f5;
  height: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.attributeBox,
.specificationBox,
.presentationBox {
  background: #fff;
  margin-bottom: 1rem;
}
.productImg {
  width: 100%;
}
/* 头部图片 */
.imgBox {
  position: relative;
  font-size: 0;
}
.backImg {
  width: 2rem;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
}
/* 价格 */
.attributeBox {
  padding: 0.5rem;
}
.priceBox {
  display: flex;
}
h4 {
  margin: 0.2rem 0;
}
.priceBox > div {
  width: 25%;
  height: 2.8rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.priceBox > div > p:nth-child(1) {
  color: #e75858;
  font-size: 0.9rem;
}
.priceBox > div > p:nth-child(2) {
  color: #acacac;
  font-size: 0.5rem;
}
.priceBox > div > p > i {
  font-size: 1.5rem;
}
/* 规格 */
.specificationBox {
  display: flex;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
}
.specification {
  display: flex;
}
.specification > p {
  margin-right: 0.5rem;
}
/* 商品介绍 */
.presentationBox {
  font-size: 0;
}
.presentationBox img {
  width: 100%;
}
</style>
