<!-- 收货地址列表 -->
<template>
  <div class="address">
    <div class="siteBox">
      <van-radio-group style="height: 100%" v-model="default_">
        <div
          class="site"
          :class="default_== index?'pitchon':''"
          v-for="(item,index) in address_"
          :key="index"
        >
          <p @click="addressClick(item)">{{ item.linkman }} {{ item.phone }}</p>
          <p @click="addressClick(item)">{{ item.address | site }}{{ item.address_detail }}</p>
          <div class="operationBox">
            <van-radio :name="index" @click="editAddress(item,index)">默认地址</van-radio>
            <div>
              <van-button type="default" size="small" @click="rut(item)">编辑</van-button>
              <van-button type="default" size="small" @click="deladdress(item)">删除</van-button>
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>
    <div class="btnBox">
      <van-button class="btnForm" type="default" @click="rut">新增地址</van-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: String,
  },
  data() {
    return {
      address_: [],
      default_: 0,
    };
  },
  mounted() {
    // if (this.address) {
    //   this.address_ = JSON.parse(this.address);
    //   this.getaddress();
    // } else {
    //   this.getAllAddress();
    // }
    this.getAllAddress();
  },
  methods: {
    rut: function (data) {
      if (data.address) {
        this.$router.push({
          path: "/manage/addressRedact",
          query: data,
        });
      } else {
        this.$router.push("/manage/addressRedact");
      }
    },
    // 获取用户所有地址
    getAllAddress: function () {
      this.axios
        .post(this.$api.getAllAddress)
        .then((data) => {
          if (data.code == 200) {
            this.address_ = data.data;
            for (let i = 0; i < this.address_.length; i++) {
              let item = this.address_[i];
              // 默认地址展示
              if (item.address_default == 1) {
                // this.default_ = i;
                // 排序 把默认地址第一个
                let obj = item;
                this.address_.splice(i, 1);
                this.address_.unshift(obj);
                break;
              }
            }
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    editAddress: function (item, index) {
      this.axios
        .post(this.$api.editAddress, {
          addressId: item.id,
          phone: item.phone,
          linkman: item.linkman,
          address: item.address,
          address_detail: item.address_detail,
          address_default: 1, //1 设置为默认地址
        })
        .then((data) => {
          if (data.code == 200) {
            this.default_ = index;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 删除地址
    deladdress: function (item) {
      this.$dialog
        .confirm({
          message: "确定退出吗?",
        })
        .then(() => {
          this.axios
            .post(this.$api.delAddress, {
              addressId: item.id,
            })
            .then((data) => {
              if (data.code == 200) {
                this.$toast("删除成功!");
                this.getAllAddress();
              } else {
                this.$toast(this.ErrCode(data.msg));
              }
            })
            .catch(() => {
              this.$toast.fail(this.$api.monmsg);
            });
        })
        .catch(() => {});
    },
    // 处理传过来的数据
    getaddress: function () {
      for (let i = 0; i < this.address_.length; i++) {
        let item = this.address_[i];
        // 默认地址展示
        if (item.address_default == "1") {
          // this.default_ = i;
          let obj = item;
          this.address_.splice(i, 1);
          this.address_.unshift(obj);
        }
      }
    },
    // 选择地址时候
    addressClick: function (data) {
      this.$emit("address", data);
    },
  },
  filters: {
    site: function (value) {
      // 替换地址 /
      return value.replace(/\//g, "");
    },
  },
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
  border: 1px dashed #fff;
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
.pitchon {
  border: 1px dashed #999!important;
  /* background-color: #123; */
}
</style>


