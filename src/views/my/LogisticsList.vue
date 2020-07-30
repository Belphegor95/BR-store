<!-- 物流列表 -->
<template>
  <ul class="logisticsList">
    <li v-for="(item,index) in 8" :key="index" @click="$router.push('/manage/logisticsMsg')">
      <div>
        <img src="../../assets/img/product/particulars/chanpin.png"  />
        <div class="logisticsbox">
          <p>
            订单编号:12345679
            <span>运输中</span>
          </p>
          <p>由[郑州高新区]发往[郑州高新区瑞达路科学</p>
        </div>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
ul {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
li {
  display: flex;
  width: 100%;
  padding: 0.5rem 1rem;
  /* padding: 0.5rem; */
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
li > div {
  flex: 1;
  display: flex;
  align-items: center;
}
.logisticsbox {
  max-width: 16rem;
  font-size: 0.9rem;
}
.logisticsbox > p {
  line-height: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
img {
  width: 3rem;
  /* margin-right: 0.5rem; */
  margin-right: 1rem;
}
</style>