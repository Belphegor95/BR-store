<template>
  <div class="addressRedact">
    <div class="searchbox">
      <p>
        郑州
        <van-icon name="arrow-down" />
      </p>
      <van-search v-model="searchKey" placeholder="请输入您的收货地址" @input="searchchange" />
      <p @click="delsearchc">取消</p>
    </div>
    <div v-show="!issearch" style="height: 93%;min-height:30rem">
      <div id="map" style="width: 100%;height: 50%"></div>
      <ul>
        <van-radio-group v-model="siteindex">
          <div class="sitebox" v-for="(item,index) in sitelist" :key="index" @click="siteclick(index,item)">
            <div>
              <p>{{ item.title }}</p>
              <p>{{ item.address }}</p>
            </div>
            <van-radio :name="index"></van-radio>
          </div>
        </van-radio-group>
      </ul>
      <img style="width: 24px" src="../../assets/img/dw.png" id="img" />
    </div>
    <ul v-show="issearch">
      <li v-for="(item,index) in searchlist" :key="index" @click="siteclick(0,item)">
        <p>{{ item.title }}</p>
        <p>{{ item.address }}</p>
      </li>
    </ul>
    <van-popup v-model="siteshow" :close-on-click-overlay="false" round position="bottom" :style="{ height: '70%' }">
      <div class="sitebtnbox">
        <div>
          <p>{{ site? site.title : ""}}</p>
          <p>{{ site? site.address: "" }}</p>
        </div>
        <van-button plain type="primary" class="sitebtn" @click="altersite">修改地址</van-button>
      </div>
      <van-address-edit
        :address-info="addressInfo"
        :show-area="false"
        show-set-default
        save-button-text="完成"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: null, // 百度地图实例
      sitelist: [], // 当前位置周边地址
      siteshow: false, //地址详细信息弹窗
      site: null, // 选中的位置
      searchKey: "",
      searchlist: [], // 搜索结果
      issearch: false,
      siteindex: 0,
      currentsite: {}, // 用户当前用位置信息
      addressInfo: {
        //收货人信息初始值
        name: "", //姓名
        tel: "", //电话
        province: "", //省份
        city: "", //城市
        country: "", //区县
        areaCode: "", //地址code：ID
        addressDetail: "", //详细地址
        isDefault: false, //是否选择默认
      },
    };
  },
  mounted() {
    // let height = window.innerHeight - 46;
    // let box = document.querySelector(".addressRedact");
    // box.style.height = height + "px";
    this.getbaiduMap();
    if (this.$route.query.linkman) {
      this.addressInfo.name = this.$route.query.linkman;
      this.addressInfo.tel = this.$route.query.phone;
      this.addressInfo.addressDetail = this.$route.query.address_detail;
      this.$route.query.address_default
        ? (this.addressInfo.isDefault = true)
        : (this.addressInfo.isDefault = false);
    }
  },
  methods: {
    // 搜索位置
    searchchange: function (input) {
      let this_ = this;
      let LocalSearch = new BMap.LocalSearch(this.map, {
        onSearchComplete: function (results) {
          // 需要获取当前搜索总共有多少条结果
          this_.searchlist = results.Hr;
          this_.issearch = true;
        },
        pageCapacity: 50,
      });
      if (input != "")
        LocalSearch.search(input, {
          forceLocal: true,
        });
    },
    // 取消 搜索
    delsearchc: function () {
      this.searchKey = "";
      this.searchlist = [];
      this.issearch = false;
    },
    // 生成百度地图实例
    getbaiduMap: function () {
      let this_ = this;
      this_.map = new BMap.Map("map");
      let point = new BMap.Point(108.840053, 34.129522);
      this_.map.centerAndZoom(point, 18);
      // 启用双指缩放地图。
      this_.map.enablePinchToZoom();
      // 中间钉子 位置
      let m_height = (this_.map.getSize().height + 120) / 2;
      let m_width = (this_.map.getSize().width - 24) / 2;
      let tack = document.querySelector("#img");
      let geolocation = new BMap.Geolocation();
      let Geocoder = new BMap.Geocoder(); //创建地理编码器
      geolocation.enableSDKLocation(); // 开启精准定位
      // 获取用户当前位置
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //  修改默认覆盖物图标
          let ico = new BMap.Icon(
            require("../../assets/img/present.png"),
            new BMap.Size(23, 23), // 视窗大小
            {
              imageSize: new BMap.Size(23, 23), // 引用图片实际大小
            }
          );
          var marker = new BMap.Marker(r.point, { icon: ico });
          this_.map.addOverlay(marker);
          let pt = null;
          // 判断修改还是 新添加
          if (this_.$route.query.linkman) {
            pt = new BMap.Point(this_.$route.query.lng, this_.$route.query.lat);
            this_.map.panTo(pt); //移动地图中心点
          } else {
            pt = r.point;
            this_.map.panTo(pt); //移动地图中心点
          }
          this_.currentsite = pt;
          Geocoder.getLocation(
            pt,
            function (rs) {
              let addComp = rs.addressComponents;
              this_.sitelist = rs.surroundingPois;
              this_.addsite(rs);
            },
            { poiRadius: 1000 }
          );
        } else {
          alert("failed" + this.getStatus());
        }
      });
      // 创建 中间图钉
      // 定义一个控件类,即function
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(m_width, m_height);
      }
      ZoomControl.prototype = new BMap.Control();
      ZoomControl.prototype.initialize = function (map) {
        let tack = document.querySelector("#img");
        return tack;
      };
      var myZoomCtrl = new ZoomControl();
      this_.map.addControl(myZoomCtrl);

      // 拖动开始
      this_.map.addEventListener("dragstart", function (evt) {
        tack.style.top = m_height - 15 + "px";
      });
      // 拖动结束
      this_.map.addEventListener("dragend", function showInfo() {
        // 获取 中心位置坐标
        var pt = this_.map.getCenter();
        tack.style.top = m_height + "px";
        Geocoder.getLocation(
          pt,
          function (rs) {
            let addComp = rs.addressComponents;
            this_.sitelist = rs.surroundingPois;
            this_.addsite(rs);
            this_.siteindex = 0;
          },
          { poiRadius: 1000 }
        );
      });
    },
    // 单选地址
    siteclick: function (index, item) {
      this.siteindex = index;
      this.site = item;
      this.map.panTo(this.site.point);
      this.issearch = false;
      this.siteshow = true;
    },
    // 修改单选位置
    altersite: function () {
      this.siteshow = false;
    },
    // 添加当前位置信息
    addsite: function (data) {
      let site = data.addressComponents;
      let obj = new Object();
      obj.point = data.point;
      obj.address = `${site.province}${site.streetNumber}${site.district}`;
      // obj.city = data.addressComponents.city;
      obj.title = data.address;
      this.sitelist.unshift(obj);
    },
    // 修改 地址
    editAddress: function (data) {
      this.axios
        .post(this.$api.editAddress, {
          addressId: this.$route.query.id,
          linkman: data.name,
          phone: data.tel,
          lat: this.site.point.lat,
          lng: this.site.point.lng,
          address: this.site.title,
          address_detail: data.addressDetail,
          address_default: data.isDefault ? 1 : 0,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$router.go(-1);
            this.$toast("地址修改成功!");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    onSave(data) {
      // 判断是否是修改
      if (this.$route.query.linkman) {
        this.editAddress(data);
        return;
      }
      this.axios
        .post(this.$api.addAddress, {
          linkman: data.name,
          phone: data.tel,
          lat: this.site.point.lat,
          lng: this.site.point.lng,
          address: this.site.title,
          address_detail: data.addressDetail,
          address_default: data.isDefault ? 1 : 0,
        })
        .then((data) => {
          if (data.code == 200) {
            this.$router.go(-1);
            this.$toast("地址保存成功!");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
  },
};
</script>
<style scoped>
.searchbox {
  display: flex;
  height: 7%;
  align-items: center;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}
.searchbox > p {
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  /* padding: 0 1rem; */
  white-space: nowrap;
}
.searchbox > p:nth-child(3) {
  color: #999;
}
.searchbox > div {
  border-radius: 10rem;
  background-color: #eee;
}
.addressRedact > ul {
  height: 93%;
  min-height: 30rem;
  overflow-y: auto;
  padding: 0 1rem;
}
.addressRedact > ul > li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.addressRedact > ul > li > p:nth-child(2) {
  font-size: 0.8rem;
  /* color: #999; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.addressRedact > div > ul {
  height: 50%;
  overflow-y: auto;
}
.sitebox {
  display: flex;
  border-bottom: 1px solid #eee;
}
.sitebox > div:nth-child(1) {
  flex: 9;
  padding: 0.5rem;
}
/* .sitebox > div:nth-child(1) > p:nth-child(1) {
} */
.sitebox > div:nth-child(1) > p:nth-child(2) {
  font-size: 0.9rem;
  color: #999;
}
.sitebox > div:nth-child(2) {
  flex: 1;
  display: flex;
  justify-content: center;
}
/* 修改地址 */
.sitebtnbox {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  /* margin-bottom: 0.5rem; */
}
.sitebtnbox > div:nth-child(1) {
  flex: 5;
  padding: 0.5rem 1rem;
}
.sitebtnbox > div:nth-child(1) > p:nth-child(2) {
  /* display: flex; */
  font-size: 0.9rem;
  color: #999;
}

.addressRedact {
  height: 100%;
  overflow: hidden;
}
</style>

<style>
body {
  overflow: hidden;
}
.anchorBL {
  display: none;
}
.addressRedact .van-address-edit__buttons .van-button {
  border: none;
  background-image: linear-gradient(to right, #ffc474, #ff855a);
}
/* 设置选择地址高度 */
.addressRedact .van-popup--bottom {
  height: 70%;
}
.addressRedact .van-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.addressRedact .van-picker__columns {
  flex: auto;
}
.addressRedact .van-picker__frame {
  top: 7rem;
}
.addressRedact .van-picker__toolbar > button {
  font-size: 1.1rem;
}
.addressRedact .sitebtn {
  flex: 1;
  padding: 0;
  white-space: nowrap;
  border-radius: 0.8rem;
  color: #fcaa8d !important;
  border: 1px solid #fcaa8d !important;
}
</style>