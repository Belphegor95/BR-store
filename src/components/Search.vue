<!-- 头部搜索功能 -->
<template>
  <van-popup
    class="search"
    v-model="popUpShow"
    duration="0"
    :style="{ height: '100%',width: '100%' }"
  >
    <!-- 头部 -->
    <div class="head">
      <div @click="shotClick" class="btnbox">
        <van-icon name="arrow-left" />
      </div>
      <van-search @focus="onfocus" :autofocus="true" v-model="searchKey" placeholder="请输入搜索关键词" />
      <div class="searchbtn" @click="searchClick">搜索</div>
    </div>
    <div class="recordbox" v-if="is_search">
      <div class="recordHead">
        <span>历史搜索</span>
        <span @click="delbrowsings">删除</span>
      </div>
      <div class="recordbtnbox">
        <div v-for="(item,index) in browsings" :key="index" @click="btnClick(item)">{{ item }}</div>
        <!-- <div @click="btnClick('名片')">名片</div>
        <div @click="btnClick('铅笔')">铅笔</div>-->
      </div>
    </div>
    <div v-else>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
      <ul>
        <li class="goodsList" v-for="(item,index) in recommend" :key="index">
          <img :src="item.plist_img_url[0]" @click="rutparClick(item)" />
          <div class="goodsContent">
            <p class="goodsName">{{ item.plist_name }}</p>
            <div
              class="goodsPrice"
              v-for="(unitList,index1) in item.price_lv.unitList"
              :key="index1"
            >
              <p v-if="unitList.rate == 1">会员价: ￥{{ `${unitList.orderPrice}/${unitList.unitName}` }}</p>
            </div>
            <div
              class="moneyBox"
              v-if="item.price_lv.cate.length > 1 || item.price_lv.unitList.length > 1"
            >
              <span>{{ item.price_lv.cate.length }}个规格可选</span>
              <span @click="shoppingclick(item)">
                <img class="shoppingCart" src="../assets/img/home/gouwu.png" />
              </span>
            </div>
            <div class="moneyBox" v-else>
              <span>库存充足</span>
              <div class="stepperBox">
                <van-stepper v-model="value1" theme="round" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <popUp :popUpShow="cartShow" :popUpData="popUpData" @showClick="cartShowClick" />
  </van-popup>
</template>
<script>
import PopUp from "@/components/PopUp.vue";
export default {
  components: {
    PopUp,
  },
  name: "Search",
  props: {
    popUpShow: Boolean,
  },
  data() {
    return {
      cartShow: false,
      popUpData: {}, //购物车种类信息
      searchKey: "",
      is_search: true,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
      recommend: [], // 商品列表
      browsings: [], // 搜索历史记录
    };
  },
  mounted() {
    let arr = localStorage.getItem("browsings");
    if (arr) {
      this.browsings = JSON.parse(arr);
    }
  },
  methods: {
    //  关闭
    shotClick: function () {
      this.$emit("showClick", false);
    },
    // 点击搜索 切换到 历史搜索
    onfocus: function () {
      this.is_search = true;
    },
    // 点击搜索历史的按钮
    btnClick: function (name) {
      this.searchKey = name;
      this.searchClick();
    },
    // 点击购物车 弹出购物车弹窗
    shoppingclick: function (data) {
      this.popUpData = data;
      this.cartShow = true;
    },
    // 关闭购物车弹窗
    cartShowClick: function (is) {
      this.cartShow = is;
    },
    // 点击搜索
    searchClick: function () {
      if (!this.searchKey) return;
      this.isbrowsing();
      this.axios
        .post(this.$api.search, {
          searchKey: this.searchKey.trim(),
        })
        .then((data) => {
          if (data.code == 200) {
            this.recommend = data.data;
            this.is_search = false;
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {});
    },
    // 删除历史记录
    delbrowsings: function () {
      this.browsings = [];
      localStorage.removeItem("browsings");
      this.$toast("清除成功!");
    },
    // 浏览记录是否存在
    isbrowsing: function () {
      if (this.browsings.indexOf(this.searchKey.trim()) == -1) {
        this.browsings.unshift(this.searchKey.trim());
        localStorage.setItem("browsings", JSON.stringify(this.browsings));
      }
    },
  },
};
</script>
<style scoped>
/* 搜索历史弹出层 */
.head {
  display: flex;
  width: 100%;
  height: 3rem;
  z-index: 1;
  background-image: linear-gradient(to right, #ffc474, #ff855a);
}
.btnbox {
  width: 2rem;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
}
.searchbtn {
  display: flex;
  color: #fff;
  padding-right: 0.5rem;
  align-items: center;
}
/* 搜索历史盒子 */
.recordbox {
  padding: 0.5rem;
}
.recordHead {
  display: flex;
  font-size: 0.8rem;
  color: #999;
  justify-content: space-between;
}
/* 按钮盒子 */
.recordbtnbox {
  display: flex;
  padding: 0.5rem 0;
}
.recordbtnbox > div {
  font-size: 0.8rem;
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  background-color: #f5f5f5;
}
/* 搜索商品 */
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem 0;
}
/* li:nth-child(odd) {
  padding: 0.6rem 0.3rem 0.6rem 0.6rem;
}
li:nth-child(even) {
  padding: 0.6rem 0.6rem 0.6rem 0.3rem;
} */
.goodsList {
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  border-bottom: 1px solid #f5f5f5;
}
.goodsList > img {
  width: 8rem;
}
/* 商品名字 */
.goodsName {
  font-weight: 700;
}
.goodsContent {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
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
.moneyBox img {
  width: 2rem;
}
</style>

<style>
.search {
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
}
</style>
