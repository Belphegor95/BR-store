<!-- 售后及维修 -->
<template>
  <div class="maintain">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      :fixed="false"
      title="申请维护"
    />
    <div class="content">
      <div class="siteBox">
        <img src="../../assets/img/home/dw.png"  />
        <div>
          <p>张三 1863680607</p>
          <p>河南郑州市中原区梧桐路高新区科学大道广告产业园2号楼8166</p>
        </div>
        <img src="../../assets/img/home/jsb.png"  />
      </div>
      <div class="natureBox">
        <p>待修物品名称</p>
        <p>打印机</p>
      </div>
      <div class="natureBox">
        <p>设备型号</p>
        <img src="../../assets/img/home/xiangji.png"  />
      </div>
      <div class="describeBox">
        <p>故障描述</p>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="(必填)请填写设备的故障信息,协助师傅加快维修"
        />
      </div>
      <van-cell title="上传图片" is-link value="0张图片" />
      <van-cell value="11:00" is-link class="visitBox">
        <template #title>
          <img src="../../assets/img/home/sm.png"  />
          <span class="custom-title">上门时间</span>
        </template>
      </van-cell>
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default" size="small">下单</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: ""
    };
  }
};
</script>
<style scoped>
.maintain {
  display: flex;
  height: 100%;
  background-color: #f5f5f5;
  flex-direction: column;
}
.content {
  flex: auto;
  height: 1px;
}
.content > div {
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.siteBox {
  display: flex;
  padding: 1rem 0;
  align-items: center;
}
.siteBox img {
  width: 2rem;
  padding: 1rem;
}
.siteBox img:nth-child(3) {
  width: 1.5rem;
}
.siteBox p {
  margin-bottom: 0.5rem;
}
.siteBox p:nth-child(2) {
  color: #999999;
}
.natureBox {
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
}
.describeBox p {
  padding: 0.5rem 1rem 0 1rem;
}
.visitBox {
  margin: 1rem 0;
}
.visitBox img {
  width: 1rem;
  margin-right: 0.5rem;
}

.btnBox {
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: row-reverse;
  background-color: #fff;
}
.btnForm {
  width: 5rem;
  border-radius: 2rem !important;
}
</style>
<style>
.maintain .van-nav-bar .van-icon {
  color: #fff;
}
.visitBox .van-cell__title {
  display: flex;
  align-items: center;
}
</style>