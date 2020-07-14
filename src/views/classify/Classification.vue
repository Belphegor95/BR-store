<template>
  <div class="classification">
    <van-nav-bar class="navBar" title="分类" :fixed="false" :placeholder="true" />
    <!-- <div style="height: 46px">123</div> -->
    <div class="nav">
      <sidebar />
      <div class="contentBox">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
        <ul>
          <li v-for="item in 8" :key="item">
            <h4>得力打印机456201(12345)</h4>
            <div class="tagBox">
              <img src="../../assets/img/product/particulars/chanpin.png" />
              <div class="tagRight">
                <p>蓝</p>
                <p>市场价: 19.8/个</p>
                <p>商品标签:</p>
                <p>15.86/个</p>
              </div>
            </div>
            <div class="stepperBox">
              <van-stepper v-model="value" theme="round" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    sidebar
  },
  data() {
    return {
      value: 0,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  }
};
</script>
<style scoped>
.classification {
  height: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.nav {
  height: 100%;
  display: flex;
  overflow-y: hidden;
}
/* 右侧内容 */
.contentBox {
  flex: auto;
  overflow-y: auto;
}
li {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f3f3f3;
}
li > h4 {
  padding: 0.6rem 0.2rem;
  font-weight: 400;
}
.tagBox {
  display: flex;
}
.tagBox > img {
  width: 5rem;
  margin-right: 0.7rem;
}
.tagRight {
  font-size: 0.8rem;
  color: #888888;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
/* 步进器 */
.stepperBox {
  display: flex;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  flex-direction: row-reverse;
}
</style>

<style>
/* 下拉边框 */
.classification .van-dropdown-menu__bar {
  border-bottom: 1px solid #fafafa;
}
.classification .van-dropdown-menu {
  width: auto;
}
</style>

