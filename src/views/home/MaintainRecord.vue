<!-- 维修及售后记录 -->
<template>
  <div class="maintainRecord">
    <van-nav-bar
      left-arrow
      class="navBar"
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
      :fixed="false"
      title="维修记录"
      right-text="申请维修"
    />
    <div class="btnbox">
      <button :class="maintaintype ==0?'pitchon': '' " class="underwaybtn" @click="typeClick(0)">维修中</button>
      <button :class="maintaintype ==1?'pitchon': '' " class="donebtn" @click="typeClick(1)">已完成</button>
    </div>
    <ul>
      <li v-for="(item,index) in 8" :key="index">
        <div class="msg">
          <img src="../../assets/img/product/particulars/chanpin.png" alt />
          <div class="msgbox">
            <p>单号: 123456789</p>
            <p>下单时间: 2020-7-29 09:47</p>
            <p>上门时间: 2020-7-29 09:47</p>
            <p>接单师傅: 某某某</p>
          </div>
        </div>
        <div>维修中</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maintaintype: 0,
    };
  },
  methods: {
    typeClick: function (typeid) {
      this.maintaintype = typeid;
    },
    onClickRight: function () {
      this.$router.push("/maintain");
    },
  },
};
</script>

<style scoped>
.maintainRecord {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.btnbox {
  height: 3rem;
  display: flex;
  /* padding: 0.5rem; */
  align-items: center;
  justify-content: center;
}
.btnbox > button {
  color: #0076ff;
  padding: 0.2rem 2rem;
  border: 1px solid #0076ff;
}
.underwaybtn {
  border-radius: 0.5rem 0 0 0.5rem;
  border-right: none !important;
}
.donebtn {
  border-radius: 0 0.5rem 0.5rem 0;
}
.pitchon {
  color: #fff !important;
  background-color: #0076ff;
}
ul {
  flex: auto;
  height: 100%;
  /* height: calc(100% - 5rem); */
  display: flex;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  flex-direction: column;
}
li {
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #e4e4e4;
  margin-bottom: 0.5rem;
}
.msg {
  display: flex;
  align-items: flex-start;
}
/* 维修信息 */
.msgbox {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
.msgbox > p {
  line-height: 1.6rem;
}
img {
  width: 5rem;
}
</style>