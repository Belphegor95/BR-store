<!-- 详情页 -->
<template>
  <div class="particulars">
    <img
      class="backImg"
      @click="backClick"
      src="../assets/img/product/particulars/fanhui.png"
    />
    <div class="content">
      <div class="imgBox">
        <van-swipe
          class="my-swipe"
          :loop="false"
          indicator-color="white"
          :show-indicators="false"
          @change="onChange"
        >
          <van-swipe-item
            v-for="(item, index) in particularsData.plist_img_url"
            :key="index"
            @click="swipeClick(index)"
          >
            <img :src="item" style="width: 100%" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{
                particularsData.plist_img_url
                  ? particularsData.plist_img_url.length
                  : 0
              }}
            </div>
          </template>
        </van-swipe>
      </div>
      <!-- 商品价格 -->
      <div class="attributeBox">
        <div class="priceBox" v-if="particularsData.price_lv">
          <div
            v-for="(item, index) in particularsData.price_lv.unitList"
            :key="index"
          >
            <p v-html="integer(item)"></p>
          </div>
        </div>
        <h4>{{ particularsData.plist_name }}</h4>
      </div>
      <!-- 规格 -->
      <div class="specificationBox">
        <div class="specification">
          <p>规格</p>
          <p>颜色: 蓝色</p>
        </div>
        <div @click="popClick">
          <van-icon name="ellipsis" />
        </div>
      </div>
      <!-- 商品详情页 -->
      <div class="presentationBox" v-if="particularsData.plist_detail_img_url">
        <topic name="商品介绍" color="#3ba8fa" />
        <img
          v-for="(item, index) in particularsData.plist_detail_img_url"
          :key="index"
          :src="item"
        />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/shopping" />
      <!-- <van-goods-action-icon v-if="false" icon="star-o" text="已收藏" /> -->
      <!-- <van-goods-action-icon v-else icon="star" text="已收藏" color="#feb35c" /> -->
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="popClick"
      />
    </van-goods-action>
    <popUp
      :popUpShow="popUpShow"
      :popUpData="particularsData"
      @showClick="showClick"
    />
  </div>
</template>
<script>
import topic from "@/components/Topic.vue";
import popUp from "@/components/PopUp.vue";
import { ImagePreview } from "vant";
export default {
  components: {
    topic,
    popUp,
  },
  data() {
    return {
      current: 0,
      popUpShow: false,
      particularsData: {},
    };
  },
  mounted() {
    this.particularsData = this.$store.state.commodity;
    // 避免刷新 数据丢失
  },
  methods: {
    integer: function (data) {
      // 整数和小数
      if (!data.orderPrice) return;
      let num = data.orderPrice;
      let numStr = num + "";
      let decimals = numStr.split(".");
      if (decimals.length == 2) {
        return `￥<i style="font-size: 1.3rem;">${parseInt(num)}</i>.${
          decimals[1]
        }/${data.unitName}`;
      } else {
        return `￥<i style="font-size: 1.3rem;">${parseInt(num)}</i>/${
          data.unitName
        }`;
      }
    },
    backClick: function () {
      this.$router.go(-1);
    },
    popClick: function () {
      // 设置购买数量 和选择 类型的默认值
      for (let i = 0; i < this.particularsData.price_lv.cate.length; i++) {
        let item = this.particularsData.price_lv.cate[i];
        let rateType = this.particularsData.price_lv.unitList[0].priceId;
        item.rateType = rateType;
        item.num = 0;
      }
      this.popUpShow = true;
    },
    onClickIcon() {
      Toast("点击图标");
    },
    showClick: function (is) {
      this.popUpShow = is;
    },
    onChange: function (index) {
      this.current = index;
    },
    // 轮播图点击
    swipeClick: function (index) {
      ImagePreview({
        images: this.particularsData.plist_img_url,
        startPosition: index,
      });
    },
  },
  // filters: {
  //   integer: function(value) {
  //     return `<i>${parseInt(value)}</i>.${value.toFixed(2)}`;
  //   }
  // }
};
</script>
<style scoped>
.particulars {
  background: #f5f5f5;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
}
.content {
  height: 100%;
  overflow-y: auto;
}
.attributeBox,
.specificationBox {
  background: #fff;
  margin-bottom: 1rem;
}
.productImg {
  width: 100%;
}
/* 头部图片 */
.imgBox {
  font-size: 0;
}
.backImg {
  width: 2rem;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 9;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #fff;
  padding: 0.2rem 0.5rem;
  font-size: 12px;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
/* 价格 */
.attributeBox {
  padding: 0.5rem;
}
.priceBox {
  display: flex;
  margin-bottom: 0.5rem;
}
h4 {
  margin: 0.2rem 0;
}
.priceBox > div {
  flex: auto;
  /* width: 25%; */
  height: 2.8rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.priceBox > div > p {
  text-align: center;
}
.priceBox > div > p:nth-child(1) {
  color: #e75858;
  font-size: 0.9rem;
  font-weight: 700;
}
.priceBox > div > p:nth-child(2) {
  color: #acacac;
  font-size: 0.5rem;
}
.i_integer {
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
  background-color: #fff;
  font-size: 0;
}
.presentationBox img {
  width: 100%;
}
</style>
<style>
.particulars .van-goods-action {
  position: relative;
}
</style>>
