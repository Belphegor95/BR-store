<!-- 收货地址列表 -->
<template>
  <div class="address">
    <div class="siteBox">
      <div class="site" v-for="(item,index) in address" :key="index">
        <p @click="addressClick(item)">{{ item.linkman }} {{ item.phone }}</p>
        <p @click="addressClick(item)">{{ item.address | site }}{{ item.address_detail }}</p>
        <div class="operationBox">
          <van-radio-group v-model="default_">
            <van-radio :name="index">默认地址</van-radio>
          </van-radio-group>
          <div>
            <van-button type="default" size="small" @click="rut(item)">编辑</van-button>
            <van-button type="default" size="small">删除</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default" @click="rut">新增地址</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: [],
      default_: 0
    };
  },
  mounted() {
    this.getAllAddress();
  },
  methods: {
    rut: function(data) {
      // console.info(data.address)
      if (data.address) {
        this.$router.push({
          path: "/manage/addressRedact",
          query: data
        });
      } else {
        this.$router.push("/manage/addressRedact");
      }
    },
    // 获取用户所有地址
    getAllAddress: function() {
      this.axios
        .post(this.$api.getAllAddress)
        .then(data => {
          if (data.code == 200) {
            this.address = data.data;
            for (let i = 0; i < this.address.length; i++) {
              let item = this.address[i];
              // 默认地址展示
              if (item.address_default == "1") {
                this.default_ = i;
              }
            }
          }
        })
        .catch(() => {});
    },
    // 选择地址时候
    addressClick: function(data) {
      this.$emit("address", data);
    }
  },
  filters: {
    site: function(value) {
      // 替换地址 /
      return value.replace(/\//g, "");
    }
  }
};
</script>
<style scoped>
.address {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}
.siteBox {
  flex: auto;
  height: 1px;
  overflow-y: auto;
}
.site {
  padding-top: 1rem;
  background: #fff;
  margin-bottom: 1rem;
}
.site > p {
  padding: 0 1rem 1rem;
}
/* 管理操作盒子 */
.operationBox {
  display: flex;
  border-top: 1px solid #f5f5f5;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: space-between;
}
.operationBox button {
  border-radius: 1rem;
  padding: 0 2rem;
  color: #999999;
}
.btnBox {
  padding: 0.5rem 1rem;
}
</style>


