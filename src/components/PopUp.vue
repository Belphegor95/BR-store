<template>
  <van-action-sheet
    v-model="popUpShow"
    class="popup"
    @click-overlay="showClick"
    :close-on-click-overlay="false"
  >
    <div class="headBox">
      <img :src="popUpData.plist_img_url ? popUpData.plist_img_url[0] : ''" />
      <h4>{{ popUpData.plist_name }}</h4>
    </div>
    <div class="content" v-if="popUpData.price_lv">
      <div
        class="trailBox"
        v-for="(cate, indexcate) in popUpData.price_lv.cate"
        :key="indexcate"
      >
        <div class="trail">
          <div class="trailName">
            <p style="margin-right: 0.2rem">
              {{ cate.cateName ? cate.cateName : "暂无" }}
            </p>
          </div>
          <div class="stepperBox">
            <van-stepper
              v-model="cate.num"
              default-value="0"
              :integer="true"
              :allow-empty="false"
              :min="0"
              theme="round"
            />
          </div>
        </div>
        <div class="price" v-if="popUpData.price_lv.unitList">
          <div
            v-show="item.rate == cate.unitId"
            v-for="(item, index) in popUpData.price_lv.unitList"
            :key="index"
          >
            <p>市场价￥{{ `${item.orderPrice}/${item.unitName}` }}</p>
            <p>
              ￥
              <i>{{ item.orderPrice }}</i>
              /{{ item.unitName }}
            </p>
          </div>
          <span>库存充足</span>
        </div>
        <div class="orderbox">
          <p>
            价格:
            <span>￥{{ cate.order }}</span>
          </p>
        </div>
        <ul>
          <li v-if="popUpData.price_lv && popUpData.price_lv.unitList">
            <span>单位</span>
            <van-radio-group v-model="cate.rateType" direction="horizontal">
              <van-radio
                @click="rateTypeClick(cate, item)"
                icon-size="16px"
                :name="item.priceId"
                v-for="(item, index) in popUpData.price_lv.unitList"
                :key="index"
                >{{ item.unitName
                }}<i v-if="item.rate != 1"
                  >({{ item.rate
                  }}{{ popUpData.price_lv.unitList[0].unitName }})</i
                ></van-radio
              >
            </van-radio-group>
          </li>
        </ul>
      </div>
    </div>
    <van-button class="btnForm" @click="addShopping" type="default"
      >确定</van-button
    >
  </van-action-sheet>
</template>
<script>
export default {
  name: "popUp",
  props: {
    popUpShow: Boolean,
    popUpData: Object,
  },
  data() {
    return {
      // rate: 1,
    };
  },
  watch: {
    popUpShow(val) {
      if (val) this.getOrderPrice();
    },
  },
  methods: {
    getOrderPrice: function () {
      this.popUpData.price_lv.cate.forEach((item) => {
        item.order = this.popUpData.price_lv.unitList[0].orderPrice;
      });
    },
    rateTypeClick: function (cate, item) {
      this.$forceUpdate();
      cate.order = item.orderPrice;
    },
    showClick: function () {
      this.$emit("showClick", false);
    },
    // 添加进入购物车
    addShopping: function () {
      let arr = [];
      for (let i = 0; i < this.popUpData.price_lv.cate.length; i++) {
        let item = this.popUpData.price_lv.cate[i];
        let obj = {};
        obj.plistId = this.popUpData.id;
        obj.priceId = item.rateType;
        obj.cateId = item.cateId;
        obj.buyNum = item.num;
        if (item.num != 0) {
          arr.push(obj);
        }
      }
      if (arr.length == 0) return;
      this.axios
        .post(this.$api.addToShoppingCart, {
          plist: JSON.stringify(arr),
        })
        .then((data) => {
          if (data.code == 200) {
            this.$emit("showClick", false);
            this.$store.commit("show_token", data.data.certificate);
            this.$store.commit("show_count", data.data.count);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          //   this.$toast.fail(this.$api.monmsg);
        });
    },
  },
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
  /* height: 1px; */
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}
.trailBox {
  margin-bottom: 0.5rem;
}
.trail,
.price,
.orderbox {
  padding: 0 1rem;
}
.trail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.orderbox {
  margin-top: 0.4rem;
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
  flex-shrink: 0;
  margin-right: 1rem;
}
/* 底部按钮 */
.btnForm {
  width: 98%;
  min-height: 2.8rem;
  color: #fff;
  border-radius: 2rem !important;
  margin: 0.2rem auto;
}
</style>

<style>
/* 单选颜色 */
.popup .van-radio__icon--checked .van-icon {
  background-color: #faa062;
  border-color: #faa062;
}
.popup .van-action-sheet__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.popup .van-radio--horizontal {
  margin-right: 1.5rem;
}
</style>