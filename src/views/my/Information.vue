<template>
  <div class="information">
    <div>
      <p>APP信息</p>
      <p>这里是信息内容</p>
    </div>
    <div>
      <p>通知</p>
      <p>有新版本信息</p>
    </div>
    <div>
      <p>其他</p>
      <p>暂无其他消息</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.information {
  height: 100%;
}
.information > div {
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
}
.information > div > p {
  line-height: 2rem;
}
.information > div > p:nth-child(2) {
  color: #999999;
}
</style>
