<template>
  <div class="address">
    <div class="siteBox">
      <div class="site" v-for="item in 4" :key="item">
        <p>张三 133****1698</p>
        <p>郑州市高新区科学大道瑞达路广告产业园2号8116室</p>
        <div class="operationBox">
          <van-radio-group v-model="radio">
            <van-radio :name="item">默认地址</van-radio>
          </van-radio-group>
          <div>
            <van-button type="default" size="small" @click="rut">编辑</van-button>
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
      radio: 0
    };
  },
  methods: {
    rut: function() {
      this.$router.push("/manage/addressRedact");
    }
  }
};
</script>
<style scoped>
.address {
  height: calc(100% - 46px);
  background-color: #f5f5f5;
}
/* .siteBox {
  
} */
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
  padding:0.5rem 1rem;
}
</style>


