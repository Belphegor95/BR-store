<template>
  <div class="topicBox">
    <div :style="{'background': color,'color': color}">.</div>
    <p :style="{'color': color}">{{ name }}</p>
  </div>
</template>
<script>
export default {
  name: "topic",
  props: {
    color: String,
    name: String
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.topicBox {
  /* color: #3ba8fa; */
  display: flex;
  padding: 0.4rem 0.6rem;
  align-items: center;
  font-size: 1.1rem;
}
.topicBox > div {
  height: 100%;
  width: 0.3rem;
  border-radius: 0.15rem;
  /* background: #3ba8fa; */
  margin-right: 0.3rem;
}
</style>
