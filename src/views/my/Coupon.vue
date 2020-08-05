<!-- 优惠券 -->
<template>
  <div class="coupon">
    <van-radio-group v-model="radio">
      <div class="couponbox" v-for="(item,index) in ticketList" :key="index">
        <div>{{ item.amount }}元</div>
        <div>
          <p>优惠券名称: {{ item.amount }}元现金券</p>
          <p>使用说明: 可抵扣{{ item.amount }}元现金</p>
          <p v-if="!item.timeOut">有效期: 无限期</p>
          <p v-else>有效期: {{ item.expires }}</p>
        </div>
        <van-radio v-show="is" :name="index"></van-radio>
      </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 0,
      ticketList: [],
      is: false,
    };
  },
  mounted() {
    this.getTicket();
  },
  methods: {
    // 获取优惠券
    getTicket: function () {
      this.axios
        .post(this.$api.getTicket)
        .then((data) => {
          if (data.code == 200) {
            this.ticketList = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
            this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>

<style scoped>
.coupon {
  display: flex;
  height: 100%;
  padding-top: 0.1rem;
  flex-direction: column;
}
.couponbox {
  margin: 0.5rem;
  height: 5rem;
  border: 1px solid #f5f5f5;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.couponbox > div:nth-child(1) {
  flex: 1.5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f5f5f5;
}
.couponbox > div:nth-child(2) {
  flex: 5;
  margin-left: 0.5rem;
}
.couponbox > div:nth-child(3) {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}
</style>