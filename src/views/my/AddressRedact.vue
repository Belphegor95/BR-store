<template>
  <div class="addressRedact">
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-set-default
      save-button-text="完成"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<script>
import cityData from "../../assets/js/cityData";
export default {
  data() {
    return {
      areaList: {
        province_list: cityData.province_list,
        city_list: cityData.city_list,
        county_list: cityData.county_list
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
        isDefault: false //是否选择默认
      }
    };
  },
  mounted() {
    if (this.$route.query.linkman) {
      this.addressInfo.name = this.$route.query.linkman;
      this.addressInfo.tel = this.$route.query.phone;
      this.addressInfo.addressDetail = this.$route.query.address_detail;
      let address = this.$route.query.address.split("/");
      // 地区的回显
      if (address.length > 3) {
        for (let item in this.areaList.county_list) {
          if (this.areaList.county_list[item] == address[2]) {
            this.addressInfo.areaCode = item;
          }
        }
      }
    }
  },
  methods: {
    onSave(data) {
      console.info(data);
      // this.axios
      //   .post(this.$api.addAddress, {
      //     linkman: data.name,
      //     phone: data.tel,
      //     address: `${data.province}/${data.city}/${data.county}`,
      //     address_detail: data.addressDetail,
      //     address_default: data.isDefault ? 1 : 0
      //   })
      //   .then(data => {
      //     if (data.code == 200) {
      //       this.$router.push("/manage/address");
      //       this.$toast("地址保存成功!");
      //     } else {
      //       this.$toast(this.ErrCode(data.msg));
      //     }
      //   })
      //   .catch(() => {});
    }
  }
};
</script>
<style scoped>
</style>
<style>
.addressRedact .van-address-edit__buttons .van-button {
  border: none;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
</style>