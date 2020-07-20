<template>
  <van-action-sheet
    v-model="popUpShow"
    class="popup"
    @click-overlay="showClick"
    :close-on-click-overlay="false"
  >
    <div class="headBox">
      <img :src="popUpData.plist_img_url?popUpData.plist_img_url[0]: '' " alt />
      <h4>{{ popUpData.plist_name }}</h4>
    </div>
    <div class="content" v-if="popUpData.price_lv">
      <div class="trailBox" v-for="(cate,indexcate) in popUpData.price_lv.cate" :key="indexcate">
        <div class="trail">
          <div class="trailName">
            <p style="margin-right:0.2rem">{{ cate.cateName }}</p>
          </div>
          <div class="stepperBox">
            <van-stepper v-model="cate.num" theme="round" />
          </div>
        </div>
        <div class="price" v-if="popUpData.price_lv.unitList">
          <div
            v-show="item.rate == cate.unitId"
            v-for="(item,index) in popUpData.price_lv.unitList"
            :key="index"
          >
            <p>市场价￥{{ `${item.marketPrice}/${item.unitName}` }}</p>
            <p>
              ￥
              <i>{{ item.marketPrice }}</i>
              /{{ item.unitName }}
            </p>
          </div>
          <span>库存充足</span>
        </div>
        <ul>
          <li
            v-if="popUpData.price_lv && popUpData.price_lv.unitList && popUpData.price_lv.unitList.length > 1"
          >
            <span>单位</span>
            <van-radio-group v-model="cate.unitId" direction="horizontal">
              <van-radio
                icon-size="16px"
                :name="item.rate"
                v-for="(item,index) in popUpData.price_lv.unitList"
                :key="index"
              >{{ item.unitName }}</van-radio>
            </van-radio-group>
          </li>
        </ul>
      </div>
    </div>
    <van-button class="btnForm" @click="ok" type="default">确定</van-button>
  </van-action-sheet>
</template>
<script>
export default {
  name: "popUp",
  props: {
    popUpShow: Boolean,
    popUpData: Object
  },
  data() {
    return {
      rate: 1,
      value: ""
    };
  },
  mounted() {
    // if (this.popUpData.price_lv) this.popUpData.price_lv = JSON.parse(popUpData.price_lv)
  },
  methods: {
    showClick: function() {
      this.$emit("showClick", false);
    },
    ok() {
      console.info(this.popUpData);
    }
  }
};
</script>
<style scoped>
.popup {
  height: 70%;
  /* width: 100%;
  display: flex; */
  border-radius: 0 !important;
}
.headBox {
  height: 4rem;
  display: flex;
  padding: 1rem;
}
.headBox img {
  height: 100%;
  margin-right: 0.8rem;
}
.content {
  flex: auto;
}
.trail,
.price {
  padding: 0 1rem;
}
.trail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.trailName {
  display: flex;
  align-items: center;
}
.trailName img {
  height: 1.5rem;
  margin-right: 0.5rem;
}
/* 市场价 */
.price {
  color: #b8bcc4;
  font-size: 0.8rem;
  /* margin: 0.5rem 0; */
  display: flex;
  justify-content: space-between;
}
/* 价格 */
.price > div {
  margin-top: 0.5rem;
}
/* 库存充足 */
.price span {
  margin-right: 0.5rem;
}
.price p {
  line-height: 1.2rem;
}
.price i {
  color: #fa4a03;
}
ul {
  margin-top: 1rem;
}
li {
  padding: 0.3rem 1rem;
  display: flex;
  background: #f7f8fb;
  font-size: 0.8rem;
  border-bottom: 1px solid #d2d5df;
}
li > span {
  margin-right: 1rem;
}
/* 底部按钮 */
.btnForm {
  width: 98%;
  color: #fff;
  border-radius: 2rem !important;
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
}
</style>

<style>
/* 单选颜色 */
.popup .van-radio__icon--checked .van-icon {
  background-color: #faa062;
  border-color: #faa062;
}
.popup .van-action-sheet__content {
  display: flex;
  flex-direction: column;
}
</style>