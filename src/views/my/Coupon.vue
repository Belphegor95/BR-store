<!-- 优惠券 -->
<template>
  <div class="coupon">
    <div class="btnbox">
      <button
        :class="ticketid == item.value ? 'active' : ''"
        v-for="(item, index) in tickettypes"
        :key="index"
        @click="onTicketType(item.value)"
      >
        {{ item.text }}
      </button>
    </div>
    <van-empty v-if="ticketList.length == 0" description="暂无数据" />
    <div class="dxbox" v-else>
      <ticket
        :ticket="item"
        v-for="(item, index) in ticketList"
        :key="index"
        v-show="item.is"
      />
    </div>
  </div>
</template>

<script>
import ticket from "../../components/Ticket";
export default {
  components: {
    ticket,
  },
  data() {
    return {
      ticketList: [],
      is: false,
      value1: 0,
      ticketid: 0,
      tickettypes: [
        { text: "全部", value: 0 },
        { text: "可用", value: 1 },
        { text: "不可用", value: 2 },
      ],
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
            this.onTicketType(0);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    //  处理显示隐藏 筛选
    onTicketType: function (id) {
      this.ticketid = id;
      for (let i = 0; i < this.ticketList.length; i++) {
        let item = this.ticketList[i];
        if (id == 0) {
          item.is = true;
        } else if (id == 1) {
          item.type == 0 ? (item.is = true) : (item.is = false);
        } else {
          item.type != 0 ? (item.is = true) : (item.is = false);
        }
      }
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
.btnbox {
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.btnbox > button {
  color: #999;
  margin-left: 1rem;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
  border: 1px solid #999;
}
.btnbox > .active {
  color: #ffa685;
  border: 1px solid #ffa685;
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
.dxbox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.dxbox > div {
  margin-top: 0.5rem;
}
</style>