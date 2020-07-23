<!-- 步骤条 -->
<template>
  <div class="steps">
    <div class="stepslist" v-for="(item,index) in 5" :key="index">
      <div class="datebox">
        <p>06-07</p>
        <p>21:07</p>
      </div>
      <div class="statebox">
        <img class="stateimg" v-if="index == 0" src="../assets/img/form/wc.png" />
        <img class="stateimg" v-else-if="index == 3" src="../assets/img/form/lj.png" />
        <img class="stateimg" v-else-if="index == 4" src="../assets/img/form/fh.png" />
        <i v-else class="van-step__circle"></i>
        <p>已签收,签收人取货码千手{{ index }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.steps {
  padding-top: 1rem;
}
.stepslist {
  display: flex;
}
.datebox {
  padding: 0 1rem 2rem 1rem;
  border-right: 1px solid #f1f1f1;
}
.datebox > p {
  font-size: 0.9rem;
  text-align: center;
}
.datebox > p:nth-child(2) {
  font-size: 0.6rem;
  margin-top: 0.3rem;
  color: #999;
}
.statebox {
  padding: 0 1rem 2rem 1rem;
  position: relative;
}
.van-step__circle {
  background-color: #f1f1f1;
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  top: 0rem;
  left: -0.3rem;
}
.stateimg {
  width: 1.4rem;
  position: absolute;
  top: -0.5rem;
  left: -0.7rem;
}
</style>