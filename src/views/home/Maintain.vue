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
      <div class="siteBox" @click="popupClick(0)">
        <img src="../../assets/img/home/dw.png" />
        <div>
          <p v-if="defaultsite">
            {{ defaultsite.linkman }} {{ defaultsite.phone }}
          </p>
          <p>
            {{
              defaultsite
                ? defaultsite.address + defaultsite.address_detail
                : "暂无"
            }}
          </p>
        </div>
        <img src="../../assets/img/home/jsb.png" />
      </div>
      <div class="natureBox">
        <p>待修类型</p>
        <van-dropdown-menu>
          <van-dropdown-item v-model="fixsid" :options="fixs" />
        </van-dropdown-menu>
      </div>
      <div class="natureBox">
        <p>待修名称</p>
        <van-field
          v-model="goodsName"
          placeholder="请输入商品名称"
          class="inputbox"
        />
      </div>
      <div class="natureBox">
        <p>设备型号</p>
        <van-field
          v-model="unitType"
          placeholder="请输入设备型号"
          class="inputbox"
        />
      </div>
      <div class="describeBox">
        <p>故障描述</p>
        <van-field
          v-model="detail"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="(必填)请填写设备的故障信息,协助师傅加快维修"
        />
      </div>
      <van-cell
        title="上传图片"
        is-link
        :value="fileList.length + '张图片'"
        @click="popupClick(1)"
      />
      <van-cell :value="hour" is-link class="visitBox" @click="show = true">
        <template #title>
          <img src="../../assets/img/home/sm.png" />
          <span class="custom-title">上门时间</span>
        </template>
      </van-cell>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '40%', width: '100%' }"
      >
        <van-picker
          show-toolbar
          title="选择时间"
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
      <div class="natureBox">
        <p>上门服务费</p>
        <span v-if="doorMoney != -1">{{ doorMoney }}元</span>
        <span v-else>超出服务范围</span>
      </div>
      <div class="natureBox">
        <!-- <p></p> -->
        <p class="msg">
          温馨提示:
          1.此费用包含服务：上门检测故障情况，1小时维修服务。不包含材料费，如需购买配件由师傅跟您协商处理。
          2.收费标准：仓库服务站10公里范围内50元，10-20公里200，20公里以上请联系客服!
        </p>
      </div>
    </div>
    <div class="btnBox">
      <van-button
        class="btnForm"
        type="default"
        size="small"
        @click="submitFixOrder"
        >下单</van-button
      >
    </div>
    <!-- 弹出框 -->
    <van-popup
      v-model="popupShow"
      :overlay="false"
      position="right"
      :style="{ height: height, width: '100%' }"
      class="popup"
    >
      <van-nav-bar
        left-arrow
        class="navBar"
        @click-left="retreat"
        :fixed="false"
        :title="popupid == 0 ? '地址选择' : '上传图片'"
      />
      <!-- 地址选择 -->
      <address_ @address="addressClick" v-if="popupid == 0" />
      <upimg v-else-if="popupid == 1" @addupimg="upimgClick" />
    </van-popup>
  </div>
</template>
<script>
import address_ from "../my/Address";
import upimg from "../../components/Upimg";
import { Info } from "vant";
export default {
  components: {
    address_,
    upimg,
  },
  data() {
    return {
      hour: "请选择", // 展示用小时
      detail: "", // 故障描述
      show: false,
      columns: [],
      popupShow: false,
      height: null,
      popupid: 0,
      address: [], // 用户收货地址
      defaultsite: null, // 默认地址
      unitType: "", // 型号名称
      // unitType: [], // 型号图片
      fileList: [], // 用户上传的图片
      doorTime: {}, // 上门时间戳
      goodsName: "", // 商品名称
      fixsid: -1,
      fixs: [
        { text: "请选择", value: -1 },
        { text: "电脑", value: 0 },
        { text: "打印机", value: 1 },
        { text: "监控", value: 2 },
        { text: "弱电", value: 3 },
        { text: "其他", value: 4 },
      ],
      doorMoney: 0, // 上门服务费
    };
  },
  mounted() {
    this.height = window.innerHeight;
    this.height % 2 != 0 ? this.height-- : "";
    this.height = this.height + "px";
    this.getweek();
    this.getAllAddress();
    // if (this.orderdata.popupid) {
    //   this.popupShow = true;
    //   this.popupid = this.orderdata.popupid;
    // }
    // this.gethour();
  },
  methods: {
    // 页内转跳(打开弹窗)
    popupClick: function (id) {
      this.popupid = id;
      this.popupShow = true;
      if (this.$route.query.popupid == id) {
        return;
      }
      this.$router.push({
        path: `/maintain?popupid=${id}`,
        // query: this.$route.query,
      });
    },
    // 地址选择
    addressClick: function (data) {
      this.$router.go(-1);
      this.defaultsite = data;
      this.popupShow = false;
      this.getFixDoorMoney();
    },
    // 获取上门服务费
    getFixDoorMoney: function () {
      this.axios
        .post(this.$api.getFixDoorMoney, {
          addressId: this.defaultsite.id,
        })
        .then((data) => {
          if (data.code == 200) {
            this.doorMoney = data.data.doorMoney;
          } else {
            this.$toast(this.$api.monmsg);
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    // 上传图片
    upimgClick: function (data) {
      this.$router.go(-1);
      this.fileList = data;
      this.popupShow = false;
    },
    // 返回
    retreat: function () {
      this.$router.go(-1);
      this.popupShow = false;
    },
    // 获取用户所有地址
    getAllAddress: function () {
      this.axios
        .post(this.$api.getAllAddress)
        .then((data) => {
          if (data.code == 200) {
            this.address = data.data;
            for (let i = 0; i < this.address.length; i++) {
              let item = this.address[i];
              // 默认地址展示
              if (item.address_default == 1) {
                // 排序 把默认地址第一个
                this.defaultsite = item;
                this.address.splice(i, 1);
                this.address.unshift(this.defaultsite);
                // 获取当前地址的上门费
                this.getFixDoorMoney();
                break;
              }
            }
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 下单
    submitFixOrder: function () {
      if (this.defaultsite == null) {
        this.$toast("未选择地址!");
        return;
      } else if (this.goodsName == "") {
        this.$toast("未输入待修商品名!");
        return;
      } else if (this.unitType == "") {
        this.$toast("未输入设备型号!");
        return;
      } else if (this.detail == "") {
        this.$toast("未输入故障描述!");
        return;
      } else if (this.fileList.length == 0) {
        this.$toast("未上传描述图片!");
        return;
      } else if (Object.keys(this.doorTime).length == 0) {
        this.$toast("未选择上门时间!");
        return;
      } else if (this.fixsid == -1) {
        this.$toast("待修类型未选择!");
        return;
      }
      let attachPic = [];
      for (let i = 0; i < this.fileList.length; i++) {
        let item = this.fileList[i].content;
        attachPic.push({
          path: item,
        });
      }
      this.axios
        .post(this.$api.submitFixOrder, {
          addressId: this.defaultsite.id, // 地址id
          fixType: this.fixsid, // 维修类型
          goodsName: this.goodsName, // 待修商品名
          unitType: this.unitType, // 设备型号
          detail: this.detail, // 故障描述
          attachPic: JSON.stringify(attachPic), // 描述图片数组 9张以内
          doorTimeStart: this.doorTime.doorTimeStart, // 上门时间
          doorTimeEnd: this.doorTime.doorTimeEnd, // 上门时间
        })
        .then((data) => {
          if (data.code == 200) {
            this.$toast("维修下单成功!");
            this.onPay(data.data);
            // this.$router.go(-1);
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast(this.$api.monmsg);
        });
    },
    onPay: function (data) {
      let url = `http://kzf.banruogame.com/wxPay/pay/jsapi.php?tradeNo=${data.tradeNo}1&money=${data.money}&orderType=1&baseUrl=${this.$api.baseUrl}`;
      window.location.href = url;
    },
    // 点击确定
    onConfirm: function (value, index) {
      let nianyue = this.columns[index[0]].date;
      // 时间区间
      let section = this.columns[index[0]].children[index[1]];
      this.hour = section.text;
      // 取零点
      let ri = new Date(new Date(nianyue).toLocaleDateString()).getTime();
      this.doorTime.doorTimeStart = ri + section.doorTimeStart;
      this.doorTime.doorTimeEnd = ri + section.doorTimeEnd;
      // 取 时 分
      this.show = false;
    },
    //  点击取消
    onCancel: function () {
      this.show = false;
    },
    // 处理月天
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
        obj.date = index.getTime();
        this.columns.push(obj);
        this.gethour(i);
      }
    },
    // 处理时分区间
    gethour: function (index) {
      let now = new Date();
      let arr = [9, 11, 13, 15, 17];
      let msec = 60 * 60 * 1000; // 一个小时多少毫秒
      let hour = now.getHours(); //得到小时
      for (let i = 0; i < arr.length - 1; i++) {
        let xiaoshi = arr[i];
        let xiaoshi_ = arr[i + 1];
        let obj = {};
        obj.text = `${xiaoshi}:00-${xiaoshi_}:00`;
        obj.doorTimeStart = msec * xiaoshi;
        obj.doorTimeEnd = msec * xiaoshi_;
        obj.disabled = false;
        if (index == 0) {
          if (xiaoshi_ < hour) {
            obj.disabled = true;
          }
        }
        this.columns[index].children.push(obj);
      }
    },
  },
};
</script>
<style scoped>
/* 弹出层 */
.popup {
  width: 100%;
  display: flex;
  flex-direction: column;
}
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
.siteBox > div {
  width: 100%;
}
.natureBox {
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
}
.natureBox > p {
  display: flex;
  align-items: center;
}
.natureBox .msg {
  font-size: 0.8rem;
  color: #999;
}
.inputbox {
  width: 8rem;
  padding: 0.1rem 0 0.1rem 0.5rem;
  /* border: 1px solid #eee; */
}
.describeBox > p {
  padding: 0.5rem 1rem 0 1rem;
}
.visitBox {
  margin-top: 1rem;
  /* margin: 1rem 0; */
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
.maintain .van-dropdown-menu__bar {
  height: auto;
  box-shadow: none;
  background-color: #fff;
}
.maintain .van-uploader__upload {
  width: auto;
  height: auto;
  background-color: #fff;
}
</style>