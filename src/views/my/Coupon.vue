<!-- 优惠券 -->
<template>
  <div class="coupon">
    <van-radio-group v-model="radio">
      <div class="couponbox" v-for="(item,index) in ticketList" :key="index">
        <div>
          <p>优惠券名称: 50元现金券</p>
          <p>使用说明: 可抵扣50元现金</p>
          <p v-if="!item.timeOut">有效期: 无限期</p>
          <p v-else>有效期: {{ item.expires }}</p>
        </div>
        <van-radio :name="index"></van-radio>
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
    };
  },
  mounted() {
    this.getTicket();
  },
  methods: {
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
          //   this.$toast.fail(this.$api.monmsg);
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
  padding: 0.5rem;
  height: 5rem;
  border: 1px solid #f5f5f5;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>