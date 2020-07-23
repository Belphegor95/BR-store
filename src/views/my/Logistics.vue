<!-- 物流信息 -->
<template>
  <div class="logistics">
    <p>申请快递754131864196891</p>
    <steps style="background-color: #fff;" />
  </div>
</template>

<script>
import steps from "../../components/Steps.vue";
export default {
  components: {
    steps,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.logistics {
  height: 100%;
  background-color: #f5f5f5;
}
.logistics > p {
  padding: 0.5rem;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
}
</style>