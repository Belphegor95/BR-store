<!-- 售后及维修 -->
<template>
  <div class="maintain">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="申请维护" />
    <div class="content">
      <div class="siteBox">
        <img src="../../assets/img/home/dw.png" />
        <div>
          <p>张三 1863680607</p>
          <p>河南郑州市中原区梧桐路高新区科学大道广告产业园2号楼8166</p>
        </div>
        <img src="../../assets/img/home/jsb.png" />
      </div>
      <div class="natureBox">
        <p>待修物品名称</p>
        <p>打印机</p>
      </div>
      <div class="natureBox">
        <p>设备型号</p>
        <img src="../../assets/img/home/xiangji.png" />
      </div>
      <div class="describeBox">
        <p>故障描述</p>
        <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="(必填)请填写设备的故障信息,协助师傅加快维修" />
      </div>
      <van-cell title="上传图片" is-link value="0张图片" />
      <van-cell value="11:00" is-link class="visitBox" @click="show = true">
        <template #title>
          <img src="../../assets/img/home/sm.png" />
          <span class="custom-title">上门时间</span>
        </template>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%', width: '100%' }">
        <van-picker show-toolbar title="选择时间" :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
      </van-popup>
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
      message: "",
      show: false,
      columns: [],
    };
  },
  mounted() {
    this.getweek();
    // this.gethour();
  },
  methods: {
    getweek: function () {
      let now = new Date();
      let arr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      for (let i = 0; i < 7; i++) {
        let index = new Date(now.getTime() + i * 1000 * 60 * 60 * 24);
        let newdate = new Date(index);
        let day = newdate.getDay(); //得到周几
        let month = newdate.getMonth(); //得到月份
        let date = newdate.getDate(); //得到日期
        let riqi = `${month + 1}月${date}日-${arr[day]}`;
        let obj = {};
        obj.text = riqi;
        obj.children = [];
        this.columns.push(obj);
        this.gethour(i);
      }
    },
    gethour: function (index) {
      let now = new Date();
      let arr = ["00", "30"];
      let hour = now.getHours(); //得到小时
      let minu = now.getMinutes(); //得到分钟
      for (let j = 8; j < 19; j++) {
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.text = `${j}:${arr[i]}`;
          obj.disabled = false;
          if (index == 0) {
            if (j < hour) {
              obj.disabled = true;
            } else if (j == hour) {
              if (Number(arr[i]) > minu) {
                obj.disabled = true;
              }
            }
          }
          this.columns[index].children.push(obj);
        }
      }
    },
    onConfirm(value,index) {
      console.info(value);
      console.info(index);
    },
    onChange(picker, value, index) {
      console.info(value);
      console.info(index);
    },
    onCancel() {
      this.show = false;
    },
  },
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