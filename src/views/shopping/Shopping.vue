<template>
  <div class="shopping">
    <van-nav-bar class="navBar" :fixed="false" placeholder title="购物车"></van-nav-bar>
    <div>
      <div class="shortofBox">
        <p>满50包邮</p>
        <p>还差11包邮</p>
      </div>
    </div>
    <van-checkbox-group class="checkboxBox" v-model="result" ref="checkboxGroup">
      <div class="van-card" v-for="item in 8" :key="item">
        <div class="van-card__header">
          <van-checkbox :name="item"></van-checkbox>
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
            <div>
              <div class="van-card__title van-multi-ellipsis--l2">5777 得力 120张名片册 （1/12/96）</div>
              <!-- <div class="van-card__desc van-ellipsis">描述信息</div> -->
            </div>
            <div class="van-card__bottom">
              <div class="van-card__num">x2</div>
            </div>
          </div>
        </div>
      </div>
    </van-checkbox-group>

    <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
      <van-checkbox @change="checkedClick" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
      checked: false
    };
  },
  methods: {
    //   点击结算
    onSubmit: function() {
      this.$router.push("/shopping/order");
    },
    checkedClick: function(is) {
      is
        ? this.$refs.checkboxGroup.toggleAll(true)
        : this.$refs.checkboxGroup.toggleAll();
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
  margin-bottom: 50px;
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
</style>
