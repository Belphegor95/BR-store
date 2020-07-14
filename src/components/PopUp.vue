<template>
  <van-action-sheet
    v-model="show"
    class="popup"
    @click-overlay="showClick"
    :close-on-click-overlay="false"
  >
    <div class="content">
      <div class="headBox">
        <img src="../assets/img/product/particulars/chanpin.png" alt />
        <h4>73381得力图画书(10/200)</h4>
      </div>
      <div class="trailBox">
        <div class="trail">
          <div class="trailName">
            <img src="../assets/img/product/particulars/chanpin.png" alt />
            <p style="margin-right:0.2rem">蓝色</p>
            <p>( P42358341256 )</p>
          </div>
          <div class="stepperBox">
            <van-stepper v-model="value" theme="round" />
          </div>
        </div>
        <div class="price">
          <div>
            <p>市场价￥35/包</p>
            <p>
              ￥
              <i>27.9</i> /包
            </p>
          </div>
          <span>库存充足</span>
        </div>
        <ul>
          <li>
            <span>单位</span>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio icon-size="16px" name="1">包</van-radio>
              <van-radio icon-size="16px" name="2">件</van-radio>
            </van-radio-group>
          </li>
          <li>
            <span>颜色</span>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio icon-size="16px" name="1">蓝色</van-radio>
              <van-radio icon-size="16px" name="2">红色</van-radio>
            </van-radio-group>
          </li>
        </ul>
      </div>
      <van-button class="btnForm" type="default">确定</van-button>
      <!-- <van-button class="btnClass" type="default">添加购物车</van-button> -->
    </div>
  </van-action-sheet>
</template>
<script>
export default {
  name: "popUp",
  props: {
    show: Boolean
  },
  data() {
    return {
      radio: 0,
      value: 0
    };
  },
  methods: {
    showClick: function() {
      this.$emit("showClick", false);
    }
  }
};
</script>
<style scoped>
.content {
  height: 20rem;
}
.popup {
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
.price > div:nth-child(1) {
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
</style>