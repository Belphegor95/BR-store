<!-- 首页 -->
<template>
  <div class="homePage">
    <!-- 头部 -->
    <div class="head">
      <van-search disabled @click="searchShow= true" placeholder="请输入搜索关键词" />
      <div class="icoBox" @click="$router.push('/manage/information')">
        <van-icon :name="lingdang" badge="1" />
      </div>
    </div>
    <div class="content">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <div class="bgc" v-if="picUrls.length != 0"></div>
        <!-- 轮播 -->
        <div class="swipeBox">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in picUrls" :key="index">
              <img :src="item.picUrl" style="width:100%" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 商品导航 -->
        <div class="navigation">
          <van-grid>
            <van-grid-item @click="gridClick(index,item)" class="navigationBox" v-for="(item,index) in navigations" :key="index">
              <img :src="item.img_url" />
              <p>{{ item.name }}</p>
            </van-grid-item>
            <van-grid-item @click="gridClick( -1)" class="navigationBox">
              <img src="../../assets/img/home/shouhou.png" />
              <p>售后及维修</p>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 商品列表 -->
        <topic name="推荐商品" color="#3ba8fa" />
        <van-empty v-if="recommend.length == 0" description="暂无数据" />
        <ul v-else>
          <li v-for="(item,index) in recommend" :key="index">
            <div class="goodsList">
              <img :src="item.plist_img_url[0]" @click="rutparClick(item)" />
              <p class="goodsName">{{ item.plist_name }}</p>
              <div class="goodsPrice" v-for="(unitList,index1) in item.price_lv.unitList" :key="index1" v-show="unitList.rate == 1">
                <!-- <p v-if="unitList.rate == 1">会员价: ￥{{ `${unitList.orderPrice}/${unitList.unitName}` }}</p> -->
                <p>{{ unitList.orderPrice }}/{{ unitList.unitName }}</p>
              </div>
              <div class="moneyBox">
                <span>{{ item.price_lv.cate.length }}个规格可选</span>
                <span @click="shoppingclick(item)">
                  <img class="shoppingCart" src="../../assets/img/home/gouwu.png" />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </van-pull-refresh>
    </div>
    <search :popUpShow="searchShow" @showClick="searchShow = false" v-if="searchShow" />
    <popUp :popUpShow="popUpShow" :popUpData="popUpData" @showClick="showClick" />
  </div>
</template>
<script>
// 组件
import topic from "@/components/Topic.vue";
import PopUp from "@/components/PopUp.vue";
import search from "@/components/Search.vue";
export default {
  components: {
    topic,
    PopUp,
    search,
  },
  data() {
    return {
      isRefresh: false,
      lingdang: require("../../assets/img/home/lingdang.png"),
      searchShow: false,
      active: 0,
      navigations: [],
      picUrls: [], //轮播图
      recommend: [], //推荐商品
      popUpShow: false, //购物车详情弹窗
      popUpData: {}, //购物车种类信息
    };
  },
  mounted() {
    this.$store.commit("show_activeid", 0);
    this.getswipeImg();
    this.gethomeRecommend();
    this.getHomeCate();

    // 保存第一次进入
    let isloading = sessionStorage.getItem("isloading");
    if (!isloading) this.announcement();
  },
  methods: {
    // 公告
    announcement: function () {
      this.axios
        .post(this.$api.masterUrl + this.$api.getServerNotice, {
          type: 0,
        })
        .then((data) => {
          if (data.code == 200) {
            if (data.data.content == "") return;
            this.$dialog
              .alert({
                title: "公告",
                message: data.data.content,
                theme: "round-button",
              })
              .then(() => {
                sessionStorage.setItem("isloading", "true");
              });
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    getswipeImg: function () {
      this.axios
        .get(this.$api.slideshow)
        .then((data) => {
          if (data.code == 200) {
            this.picUrls = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    gethomeRecommend: function () {
      this.axios
        .get(this.$api.homeRecommend)
        .then((data) => {
          if (data.code == 200) {
            this.recommend = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 首页分类入口
    getHomeCate: function () {
      this.axios
        .post(this.$api.getHomeCate)
        .then((data) => {
          if (data.code == 200) {
            this.navigations = data.data;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    gridClick: function (index, item) {
      if (index != -1) {
        this.$router.push({
          path: "/classification",
          query: item,
        });
      } else {
        this.$router.push("/maintainRecord");
      }
    },
    // 跳转 商品详情
    rutparClick: function (data) {
      this.$store.commit("show_commodity", data);
      this.$router.push("/particulars");
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
    // 下拉刷新
    onRefresh: function () {
      this.getswipeImg();
      this.gethomeRecommend();
      this.isRefresh = false;
    },
  },
};
</script>
<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  height: 1px;
  flex: 1;
}
/* 头部以下内容 */
.content {
  height: 100%;
  position: relative;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}
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
.swipeBox {
  width: 90%;
  margin: 0.5rem auto;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
/* 商品导航 */
.navigation {
  margin-bottom: 1rem;
  border-bottom: 1px solid #f6f7f8;
}
.navigationBox img {
  width: 2.5rem;
}
.navigationBox p {
  margin-top: 0.2rem;
  font-size: 0.9rem;
}
/* 商品列表 */
.topicBox {
  color: #3ba8fa;
  display: flex;
  padding: 0.4rem 0.6rem;
  align-items: center;
  font-size: 1rem;
}
.topicBox > div {
  height: 100%;
  width: 0.3rem;
  border-radius: 0.15rem;
  background: #3ba8fa;
  margin-right: 0.3rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 50%;
  box-sizing: border-box;
}
li:nth-child(odd) {
  padding: 0.6rem 0.3rem 0.6rem 0.6rem;
}
li:nth-child(even) {
  padding: 0.6rem 0.6rem 0.6rem 0.3rem;
}
.goodsList {
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
}
.goodsList > img {
  width: 100%;
}
.goodsName {
  height: 3rem;
}
.goodsPrice {
  text-indent: 0.5rem;
  font-size: 0.9rem;
  color: #a3a3a3;
}
.goodsPrice > p {
  margin: 0.2rem 0;
}
.three {
  text-decoration: line-through;
}

.moneyBox {
  display: flex;
  height: 2rem;
  color: #feb35c;
  align-items: center;
  padding: 0.1rem 0.2rem;
  justify-content: space-between;
}
.moneyBox i {
  font-size: 1.4rem;
}
.shoppingCart {
  height: 2rem;
}
/* 底部导航 */
.tabbarBox img {
  width: 1rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.3rem;
}
/* 单背景 */
.bgc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  z-index: -1;
  background-image: linear-gradient(to right, #ffc474, #ff855a);
}
</style>
<style >
.homePage .van-dropdown-menu__bar {
  background-color: transparent !important;
  box-shadow: none !important;
}
/* 去除轮播图高度 */
.homePage .my-swipe .van-swipe-item {
  line-height: 0 !important;
}
/* 去除 宫格边框 */
.homePage .van-grid-item__content::after {
  border-width: 0;
}
/* 宫格高度调整 */
.homePage .van-grid-item__content {
  padding: 0.5rem 0.4rem;
}
/* 底部导航选中颜色 */
.homePage .van-tabbar-item--active {
  color: #feb35c;
}
/* 下拉刷新 */
.homePage .van-pull-refresh__track {
  display: flex;
  flex-direction: column;
}
</style>
