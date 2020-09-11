<!-- 维修及售后记录 -->
<template>
  <div class="maintainRecord">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" @click-right="onClickRight" :fixed="false" title="维修记录" right-text="申请维修" />
    <div class="btnbox">
      <button :class="maintaintype ==0?'pitchon': '' " class="underwaybtn" @click="typeClick(0)">维修中</button>
      <button :class="maintaintype ==1?'pitchon': '' " class="donebtn" @click="typeClick(1)">已完成</button>
    </div>
    <ul>
      <li v-for="(item,index) in orderlist" :key="index">
        <div class="msg">
          <img src="../../assets/img/product/particulars/chanpin.png" />
          <div class="msgbox">
            <p>单号: {{ item.tradeNo }}</p>
            <p>下单时间: {{ item.createTime | date }}</p>
            <p>上门时间: {{ item.doorTime |date }}</p>
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
      orderlist: [],
    };
  },
  mounted() {
    this.getFixOrder();
  },
  methods: {
    typeClick: function (typeid) {
      this.maintaintype = typeid;
      this.getFixOrder();
    },
    onClickRight: function () {
      this.$router.push("/maintain");
    },
    // 获取维修单列表
    getFixOrder: function () {
      this.axios
        .post(this.$api.getFixOrder, {
          orderType: this.maintaintype,
        })
        .then((data) => {
          if (data.code == 200) {
            this.orderlist = data.data.ordersData;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
  },
  filters: {
    date: function (value) {
      let arr = value.split(" ");
      if (arr.length != 2) return value;
      let miao = arr[1].split(":");
      return `${arr[0]} ${miao[0]}:${miao[1]}`
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
  margin-top: 3px;
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
  display: flex;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  flex-direction: column;
}
li {
  /* min-height: 6rem; */
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #e4e4e4;
  margin-bottom: 0.5rem;
}
li > div:nth-child(2) {
  /* width: 3.1rem; */
  white-space: nowrap;
}
.msg {
  height: 100%;
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
  height: 5rem;
}
</style>