<template>
  <div class="addressRedact">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
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
      searchResult: []
    };
  },
  methods: {
    onSave(data) {
      this.axios
        .post(this.$api.addAddress, {
          linkman: data.name,
          phone: data.tel,
          address: `${data.province}/${data.city}/${data.county}`,
          address_detail: data.addressDetail,
          address_default: data.isDefault ? 1 : 0
        })
        .then(data => {
          if (data.code == 200) {
            this.$router.push("/manage/address");
            this.$toast("地址保存成功!");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
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