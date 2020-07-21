<!-- 购物车 -->
<template>
  <div class="shopping">
    <van-nav-bar class="navBar" :fixed="false" placeholder title="购物车">
      <template #right>
        <span @click="fold = !fold">{{ fold? '折叠':'收起' }}</span>
        <span @click="operate = !operate">{{ operate? '编辑':'完成' }}</span>
      </template>
    </van-nav-bar>
    <div>
      <div class="shortofBox">
        <p>满50包邮</p>
        <p>还差11包邮</p>
      </div>
    </div>
    <van-checkbox-group
      class="checkboxBox"
      v-model="result"
      ref="checkboxGroup"
      checked-color="#feb35c"
    >
      <div class="van-card" v-for="item in 3" :key="item">
        <div class="van-card__header">
          <van-checkbox @click="checkedClural" :name="item"></van-checkbox>
          <a class="van-card__thumb">
            <div class="van-image" style="width: 100%; height: 100%;">
              <img
                src="https://img.yzcdn.cn/vant/ipad.jpeg"
                class="van-image__img"
                style="object-fit: cover;"
              />
            </div>
          </a>
          <div class="van-card__content">
            <div class="contentbox">
              <div class="van-card__title van-multi-ellipsis--l2">5777 得力 120张名片册 （1/12/96）</div>
              <van-button round size="mini" type="info">
                <p>{{ fold? '折叠':'收起' }}</p>
                <van-icon name="arrow-up" />
              </van-button>
            </div>
            <div class="van-card__bottom">
              <div class="van-card__num">x2</div>
            </div>
          </div>
        </div>
        <div class="van-card_content" v-if="!fold">
          <van-checkbox-group
            class="checkboxBox"
            v-model="singles"
            ref="checkboxGroup"
            checked-color="#feb35c"
          >
            <van-checkbox
              checked-color="#feb35c"
              :name="item + '-'"
              @click="checkedSingle"
            >￥439.00/台</van-checkbox>
          </van-checkbox-group>
          <van-stepper v-model="value" theme="round" />
        </div>
      </div>
    </van-checkbox-group>
    <van-submit-bar v-if="operate" :price="0" button-text="结算" @submit="onSubmit">
      <van-checkbox checked-color="#feb35c" @click="checkedClick" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <div v-else class="submitBar">
      <van-checkbox checked-color="#feb35c" @click="checkedClick" v-model="checked">全选</van-checkbox>
      <p>种类3数量24</p>
      <button
        class="van-button van-button--danger van-button--normal van-button--round van-submit-bar__button van-submit-bar__button--danger"
      >
        <div class="van-button__content">
          <span class="van-button__text">删除</span>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
      singles: [],
      checked: false,
      value: 0,
      fold: true,
      operate: true
    };
  },
  mounted() {
    // this.$store.commit("show_activeid", 2);
  },
  methods: {
    //   点击结算
    onSubmit: function() {
      this.$router.push("/shopping/addOrder");
    },
    // 单个
    checkedSingle: function(a) {
      console.info(a);
      console.info(this.singles);
    },
    // 多个点击
    checkedClural: function() {
      console.info(this.result);
    },
    checkedClick: function(is) {
      // console.info(this.checked)
      // is
      //   ? this.$refs.checkboxGroup.toggleAll(true)
      //   : this.result.length == 0
      //   ? this.$refs.checkboxGroup.toggleAll()
      //   : "";
    },
    toggle() {
      this.result.length == 3 ? (this.checked = true) : (this.checked = false);
    }
  }
};
</script>
<style scoped>
.shopping {
  height: 1px;
  flex: auto;
  display: flex;
  flex-direction: column;
}
/* 列表 */
.checkboxBox {
  flex: auto;
  overflow-y: auto;
  background-color: #f5f5f5;
}
.shortofBox {
  display: flex;
  height: 2rem;
  background: #ffeee0;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  color: #e75858;
  font-size: 1rem;
}
.contentbox {
  display: flex;
}
.contentbox button {
  width: 4rem;
}
.van-card_content {
  display: flex;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  justify-content: space-between;
}

/* 删除操作栏 */
.submitBar {
  height: 50px;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
}
.submitBar p {
  flex: 1;
  padding-right: 0.5rem;
  text-align: right;
  color: #ee0a24;
}
</style>
<style  >
.shopping .van-submit-bar {
  bottom: 50px;
  background-color: #fff;
}
.shopping .van-card {
  margin-bottom: 8px;
  margin-top: 0;
}
/* 头部 按钮样式 */
.shopping .van-nav-bar__right span {
  color: #fff;
  margin-left: 1rem;
}
/* 折叠按钮 */
.shopping .checkboxBox .van-button--info {
  background-color: #f5f5f5;
  border: 1px solid #a3a3a1;
  color: #a3a3a1;
}
.van-button__text {
  display: flex;
}
.van-card_content .van-checkbox__label {
  color: red !important;
  font-size: 1rem;
}
.shopping .van-checkbox__label {
  font-size: 0.9rem;
}
/* 步进器 */
/* .van-stepper {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
} */
.van-stepper--round .van-stepper__minus {
  border: none;
  color: #c8c9cc;
  background-color: #f4f4f4;
}
.van-stepper--round .van-stepper__plus {
  color: #feb35c;
  background-color: #f4f4f4;
}
.van-stepper {
  display: inline-block;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  background-color: #f4f4f4;
}
</style>
