<template>
  <div class="addressRedact">
    <div id="map" style="width: 100%;height: 50%"></div>
    <ul>
      <van-radio-group v-model="radio">
        <div class="sitebox" v-for="(item,index) in sitelist" :key="index">
          <div>{{ item.title }}</div>
          <van-radio :name="index"></van-radio>
        </div>
      </van-radio-group>
    </ul>
    <img style="width: 24px" src="../../assets/img/dw.png" id="img" />
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-address-edit
        :address-info="addressInfo"
        :area-list="areaList"
        show-set-default
        save-button-text="完成"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </van-popup>
  </div>
</template>
<script>
import cityData from "../../assets/js/cityData";
export default {
  data() {
    return {
      show: false,
      sitelist: [], // 当前位置周边地址
      radio: 0,
      ak: "FMxNKCVYPKKweAKH5b5Drv31Kz6pOGAg", //密钥
      areaList: {
        province_list: cityData.province_list,
        city_list: cityData.city_list,
        county_list: cityData.county_list,
      },
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
    this.getbaiduMap();
    if (this.$route.query.linkman) {
      this.addressInfo.name = this.$route.query.linkman;
      this.addressInfo.tel = this.$route.query.phone;
      this.addressInfo.addressDetail = this.$route.query.address_detail;
      this.$route.query.address_default
        ? (this.addressInfo.isDefault = true)
        : (this.addressInfo.isDefault = false);
      let address = this.$route.query.address.split("/");
      // 地区的回显
      if (address.length > 2) {
        for (let item in this.areaList.county_list) {
          if (this.areaList.county_list[item] == address[2]) {
            this.addressInfo.areaCode = item;
          }
        }
      }
    }
  },
  methods: {
    // 生成百度地图实例
    getbaiduMap: function () {
      let this_ = this;
      let map = new BMap.Map("map");
      let point = new BMap.Point(108.840053, 34.129522);
      map.centerAndZoom(point, 14);
      // 启用双指缩放地图。
      map.enablePinchToZoom();
      // 中间钉子 位置
      let m_height = (map.getSize().height + 10) / 2;
      let m_width = (map.getSize().width - 24) / 2;
      let tack = document.querySelector("#img");
      let geolocation = new BMap.Geolocation();
      let Geocoder = new BMap.Geocoder(); //创建地理编码器
      geolocation.enableSDKLocation();
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
          map.addOverlay(marker);
          map.panTo(r.point);
          let pt = r.point;
          map.panTo(pt); //移动地图中心点

          Geocoder.getLocation(
            pt,
            function (rs) {
              let addComp = rs.addressComponents;
              this_.sitelist = rs.surroundingPois;
              console.info(rs);
              // alert(addComp.province + addComp.city + addComp.district);
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
      map.addControl(myZoomCtrl);

      // 拖动开始
      map.addEventListener("dragstart", function (evt) {
        console.log(evt);
        var cp = map.getBounds();
        tack.style.top = m_height - 15 + "px";
      });
      // 拖动结束
      map.addEventListener("dragend", function showInfo() {
        // 获取 中心位置坐标
        var cp = map.getCenter();
        // console.info(cp);
        tack.style.top = m_height + "px";
        Geocoder.getLocation(
          cp,
          function (rs) {
            let addComp = rs.addressComponents;
            this_.sitelist = rs.surroundingPois;
            console.info(rs);
            // alert(addComp.province + addComp.city + addComp.district);
          },
          { poiRadius: 1000 }
        );
        // alert(cp.lng + "," + cp.lat);
        // let LocalSearch = new BMap.LocalSearch(map, {
        //   renderOptions: {
        //     map: map,
        //     // panel : "content"
        //   },
        //   onMarkersSet: function (array) {
        //     console.log(array);
        //   },
        //   onInfoHtmlSet: function (LocalResultPoi) {
        //     console.log(LocalResultPoi);
        //   },
        //   onResultsHtmlSet: function (element) {
        //     console.log(element);
        //   },
        //   onSearchComplete: function (results) {
        //     // 需要获取当前搜索总共有多少条结果
        //     console.info(results)
        //   },
        //   pageCapacity: 10,
        // });
        // LocalSearch.searchNearby("广告", cp, 1000);
      });
    },
    // 修改 地址
    editAddress: function (data) {
      this.axios
        .post(this.$api.editAddress, {
          addressId: this.$route.query.id,
          linkman: data.name,
          phone: data.tel,
          address: `${data.province}/${data.city}/${data.county}`,
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
          address: `${data.province}/${data.city}/${data.county}`,
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
<style>
.sitebox {
  display: flex;
}
.sitebox > div:nth-child(1) {
  flex: 9;
}
.sitebox > div:nth-child(2) {
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.anchorBL {
  display: none;
}
.addressRedact {
  height: 100%;
}
.addressRedact .van-address-edit__buttons .van-button {
  border: none;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
/* 设置选择地址高度 */
.van-popup--bottom {
  height: 70%;
}
.van-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-picker__columns {
  flex: auto;
}
.van-picker__frame {
  top: 7rem;
}
.van-picker__toolbar > button {
  font-size: 1.1rem;
}
</style>