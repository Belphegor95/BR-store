<template>
  <div class="homePage">
    <!-- 头部 -->
    <div class="head">
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <div class="icoBox">
        <van-icon :name="lingdang" badge="1" />
      </div>
    </div>
    <div class="content">
      <div class="bgc"></div>
      <!-- 轮播 -->
      <div class="swipeBox">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in picUrls" :key="index">
            <img :src="item.picUrl" style="width:100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品导航 -->
      <div>
        <van-grid>
          <van-grid-item
            @click="gridClick(index)"
            class="navigationBox"
            v-for="(item,index) in navigations"
            :key="index"
          >
            <img :src="item.img" alt />
            <p>{{ item.name }}</p>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 商品列表 -->
      <topic name="推荐商品" color="#3ba8fa" />
      <ul>
        <li v-for="(item,index) in 8" :key="index">
          <div class="goodsList">
            <img :src="item" @click="($router.push('/product/particulars'))" />
            <p class="goodsName">超级无敌 办公桌办公桌办公桌</p>
            <div class="goodsPrice">
              <!-- <p class="three">市场价: 90.00￥</p> -->
              <p>会员价: 90.00￥</p>
            </div>
            <div class="moneyBox" v-if="item%2 != 0">
              <span>库存充足</span>
              <div class="stepperBox">
                <van-stepper v-model="value1" theme="round" />
              </div>
            </div>
            <div class="moneyBox" v-else>
              <span>
                ￥
                <i>27</i>
              </span>
              <span>
                <img class="shoppingCart" src="../../assets/img/home/gouwu.png" />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import bangong from "../../assets/img/home/bangong.png";
import shuxiegongju from "../../assets/img/home/shuxiegongju.png";
import bangongyongzhi from "../../assets/img/home/bangongyongzhi.png";
import tiyuyongpin from "../../assets/img/home/tiyuyongpin.png";
import xueshengyongpin from "../../assets/img/home/xueshengyongpin.png";
import wenjianguanli from "../../assets/img/home/wenjianguanli.png";
import zhuomianbangong from "../../assets/img/home/zhuomianbangong.png";
import shouhou from "../../assets/img/home/shouhou.png";

// 组件
import topic from "@/components/Topic.vue";
export default {
  components: {
    topic
  },
  data() {
    return {
      lingdang: require("../../assets/img/home/lingdang.png"),
      value: "",
      value1: 0,
      option1: [
        { text: "郑州", value: 0 },
        { text: "北京", value: 1 },
        { text: "上海", value: 2 }
      ],
      active: 0,
      navigations: [
        {
          img: bangong,
          name: "办公用品"
        },
        {
          img: shuxiegongju,
          name: "书写工具"
        },
        {
          img: bangongyongzhi,
          name: "办公用纸"
        },
        {
          img: tiyuyongpin,
          name: "体育用品"
        },
        {
          img: xueshengyongpin,
          name: "学生用品"
        },
        {
          img: wenjianguanli,
          name: "文件管理"
        },
        {
          img: zhuomianbangong,
          name: "桌面办公"
        },
        {
          img: shouhou,
          name: "售后及维修"
        }
      ],
      picUrls: [], //轮播图
      recommend: [] //推荐商品
    };
  },
  created() {
    this.getswipeImg();
  },
  mounted() {
    this.gethomeRecommend();
  },
  methods: {
    getswipeImg: function() {
      this.axios
        .get(this.$api.slideshow)
        .then(data => {
          if (data.code == 200) {
            this.picUrls = data.data;
          } else {
            // this.$toast(data.msg);
          }
        })
        .catch(() => {
          console.info(500);
          //   this.$toast.fail(this.$api.monmsg);
        });
    },
    gethomeRecommend: function() {
      this.axios
        .get(this.$api.cate)
        .then(data => {
          if (data.code == 200) {
            this.recommend = data.data;
          } else {
            // this.$toast(data.msg);
          }
        })
        .catch(() => {
          console.info(500);
          //   this.$toast.fail(this.$api.monmsg);
        });
    },
    gridClick: function(index) {
      if (index == 0) {
        console.info(index);
      } else if (index == 7) {
        // console.info(index);
        this.$router.push("/maintain");
      }
    },
    onSearch: function(val) {
      Toast(val);
    },
    onCancel: function() {
      Toast("取消");
    },
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    }
  }
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
  position: relative;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}
.head {
  display: flex;
  width: 100%;
  height: 3rem;
  /* position: fixed;
  top: 0;
  left: 0; */
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
  /* margin-bottom: 0; */
  /* overflow: hidden; */
  /* border-radius: 1.2rem; */
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  /* background-color: #39a9ed; */
}
/* 商品导航 */
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
  /* boder-top-left-radius: 30px; */
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
}
/* .goodsName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
} */
.goodsList > img {
  width: 100%;
}
.goodsPrice {
  font-size: 0.7rem;
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
  /* font-size: 1rem; */
  align-items: center;
  padding: 0.1rem 0.2rem;
  justify-content: space-between;
}
.moneyBox i {
  font-size: 1.4rem;
}
.numBox {
  width: 4.5rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-around;
  /* 阴影 */
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.numBox img {
  width: 1rem;
}
.numBox div {
  display: flex;
  align-items: center;
}
.numBox b {
  display: flex;
  color: #000;
  align-items: center;
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
.homePage .van-search {
  flex: auto;
}
.homePage .van-search__content {
  border-radius: 5rem;
}
.homePage .van-dropdown-menu {
  width: 4rem;
}
.homePage .van-search {
  background-color: transparent;
}
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
</style>
