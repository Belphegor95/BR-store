<!-- 分类 -->
<template>
  <div class="classification">
    <!-- 头部 -->
    <div class="head">
      <van-search disabled @click="searchShow= true" placeholder="请输入搜索关键词" />
      <div class="icoBox" @click="$router.push('/manage/information')">
        <van-icon :name="lingdang" badge="1" />
      </div>
    </div>
    <!-- <van-nav-bar class="navBar" title="分类" :fixed="false" :placeholder="true" /> -->
    <div class="nav">
      <sidebar :cate="cate_" @cateid="getcatePlist" />
      <div class="contentBox">
        <!-- 排序方法 -->
        <!-- <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option1" />
          <van-dropdown-item v-model="value1" :options="option2" />
        </van-dropdown-menu> -->
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>-->
          <van-empty v-if="catePlist.length == 0" description="暂无数据" />
          <ul v-else>
            <li v-for="(item,index) in catePlist" :key="index">
              <h4>{{ item.plist_name }}</h4>
              <div class="tagBox" @click="rutClick(item)">
                <img :src="item.plist_img_url.length !=0? item.plist_img_url[0]: '' " />
                <div class="tagRight">
                  <p>蓝</p>
                  <p>市场价: 19.8/个</p>
                  <p>商品标签:</p>
                  <p>15.86/个</p>
                </div>
              </div>
              <div class="stepperBox">
                <span @click="shoppingclick(item)">
                  <img class="shoppingCart" src="../../assets/img/home/gouwu.png" />
                </span>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </div>
    </div>
    <search :popUpShow="searchShow" @showClick="searchShow = false" />
    <popUp :popUpShow="popUpShow" :popUpData="popUpData" @showClick="showClick" />
  </div>
</template>
<script>
import sidebar from "@/components/Sidebar.vue";
import search from "@/components/Search.vue";
import PopUp from "@/components/PopUp.vue";
export default {
  components: {
    sidebar,
    search,
    PopUp,
  },
  data() {
    return {
      isRefresh: false,
      lingdang: require("../../assets/img/home/lingdang.png"),
      searchShow: false,
      popUpShow: false,
      popUpData: {},
      cate: {},
      cate_: {},
      value: 0,
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: 0 },
        { text: "好评排序", value: 1 },
        { text: "销量排序", value: 2 },
      ],
      catePlist: [], // 分类商品列表
    };
  },
  mounted() {
    this.$store.commit("show_activeid", 1);
    this.cate_ = this.$route.query;
  },
  methods: {
    // 跳转 商品详情
    rutClick: function (data) {
      this.$store.commit("show_commodity", data);
      this.$router.push("/particulars");
    },
    // 获取分类商品
    getcatePlist: function (obj) {
      this.cate = obj;
      this.axios
        .post(this.$api.getCatePlist, {
          cateone: obj.one,
          catetwo: obj.two,
        })
        .then((data) => {
          if (data.code == 200) {
            this.catePlist = data.data;
            this.isRefresh = false;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 下拉刷新
    onRefresh: function () {
      this.getcatePlist(this.cate);
    },
    // 点击购物车 弹出购物车弹窗
    shoppingclick: function (data) {
      // 设置购买数量 和选择 类型的默认值
      for (let i = 0; i < data.price_lv.cate.length; i++) {
        let item = data.price_lv.cate[i];
        let rateType = data.price_lv.unitList[0].priceId;
        let order = data.price_lv.unitList[0].orderPrice;
        item.rateType = rateType;
        item.order = order;
        item.num = 0;
      }
      this.popUpData = data;
      this.popUpShow = true;
    },
    showClick: function (is) {
      this.popUpShow = is;
    },
  },
};
</script>
<style scoped>
.classification {
  height: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
/* 头部 */
.head {
  display: flex;
  width: 100%;
  height: 46px;
  z-index: 1;
  background-image: linear-gradient(to right, #ffc474, #ff855a);
}
.icoBox {
  display: flex;
  width: 1.2rem;
  padding-right: 1rem;
  align-items: center;
}
.nav {
  height: 100%;
  display: flex;
  overflow-y: hidden;
}
/* 右侧内容 */
.contentBox {
  flex: auto;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}
ul {
  height: 100%;
}
li {
  display: flex;
  padding: 0 0.5rem;
  flex-direction: column;
  border-bottom: 1px solid #f3f3f3;
}
li > h4 {
  padding: 0.6rem 0.2rem;
  font-weight: 400;
}
.tagBox {
  display: flex;
}
.tagBox > img {
  width: 5rem;
  height: 5rem;
  margin-right: 0.7rem;
}
.tagRight {
  font-size: 0.8rem;
  color: #888888;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
/* 步进器 */
.stepperBox {
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: row-reverse;
}
.shoppingCart {
  height: 2rem;
}
</style>

<style>
/* 下拉边框 */
.classification .van-dropdown-menu__bar {
  border-bottom: 1px solid #fafafa;
}
.classification .van-dropdown-menu {
  width: auto;
}
/* 下拉刷新盒子大小 */
.classification .van-pull-refresh {
  flex: auto;
  height: 1px;
}
/* 下拉弹窗位置 */
.classification .van-dropdown-item--down {
  top: 45px !important;
  z-index: 12;
}
</style>

