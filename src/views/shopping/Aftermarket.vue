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
        <div>
          <button>删除记录</button>
          <button>查看详情</button>
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
  background-color: #f5f5f5;
}
/* list */
.recordbox {
  background-color: #fff;
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
</style>