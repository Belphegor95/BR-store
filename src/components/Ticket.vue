<!-- 优惠券 -->
<template>
  <div
    class="ticket"
    :class="
      ticket.type == 0 ? 'ticket_0' : ticket.type == 1 ? 'ticket_1' : 'ticket_2'
    "
  >
    <div>
      <span><i>¥</i>{{ ticket.money }}</span>
    </div>
    <div>
      <div>可抵扣{{ ticket.money }}元现金</div>
      <div>
        <span>使用期限:</span>
        <p>{{ ticket.outTime | date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ticket: Object,
  },
  data() {
    return {};
  },
  filters: {
    date(val) {
      let arr = val.split(" ");
      return arr[0];
    },
  },
};
</script>

<style  scoped>
.ticket {
  /* width: 12.6rem;
  height: 4.3rem; */
  width: 23rem;
  height: 6.5rem;
  cursor: pointer;
  color: #fff;
  display: flex;
}
.ticket > div:nth-child(1) {
  width: 6.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ticket > div:nth-child(1) > span {
  font-size: 1.8rem;
  padding-left: 0.4rem;
  height: 2rem;
  position: relative;
}
.ticket > div:nth-child(1) > span > i {
  position: absolute;
  left: 0;
  top: -0.4rem;
  font-size: 0.9rem;
  font-style: normal;
}
.ticket > div:nth-child(2) {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 0.5rem;
  padding-bottom: 2.5rem;
  flex-direction: column;
}
.ticket > div:nth-child(2) > div {
  display: flex;
}
.ticket_0 {
  background: url("../assets/img/coupon/cg.png") no-repeat;
  background-size: 100%;
}
.ticket_1 {
  background: url("../assets/img/coupon/sy.png") no-repeat;
  background-size: 100%;
}
.ticket_2 {
  background: url("../assets/img/coupon/gq.png") no-repeat;
  background-size: 100%;
}
</style>
