<!-- 我的 -->
<template>
  <div class="personage">
    <van-nav-bar class="navBar" fixed placeholder title="我的">
      <template #right>
        <van-icon @click="popupClick('setting')" style="margin:0.5rem" name="setting-o" size="20" />
        <van-icon @click="popupClick('information')" name="chat-o" size="20" />
      </template>
    </van-nav-bar>
    <div class="userImg">
      <!-- <img @click="popupClick('center')" src="../../assets/img/my/tx.png" />
      <p @click="popupClick('center')">昵称</p>-->
      <img src="../../assets/img/my/tx.png" />
      <p>{{ $store.state.user.companyName ? $store.state.user.companyName: '暂无' }}</p>
    </div>
    <van-cell title="我的订单" @click="rutClick(0)" is-link />
    <div>
      <van-grid>
        <van-grid-item
          class="navigationBox"
          v-for="(item,index) in navigations"
          :key="index"
          @click="rutClick(index + 1)"
        >
          <img :src="item.img"  />
          <p>{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="物流信息" is-link @click="rutlogisticsList" />
    <div class="sitelist">
      <div v-for="item in 2" :key="item" class="list" :class="item == 2?'list_active':''">
        <img src="../../assets/img/product/particulars/chanpin.png"  />
        <div class="site">
          <p>
            <span>未发货</span>
            <span>11:00</span>
          </p>
          <p>由[郑州市高新区]发往[郑州市高新区瑞达路]</p>
        </div>
      </div>
    </div>
    <van-cell @click="popupClick('coupon')" is-link>
      <template #title>
        <van-icon style="margin-right: 0.4rem;" name="coupon-o" />
        <span class="custom-title">优惠券</span>
      </template>
    </van-cell>
    <van-cell @click="popupClick('address')" is-link>
      <template #title>
        <img
          style="width: 0.8rem;vertical-align:middle;margin-right:0.4rem"
          src="../../assets/img/my/shdz.png"
        />
        <span class="custom-title">常用收货地址</span>
      </template>
    </van-cell>
    <van-cell value="0371-123456">
      <template #title>
        <img
          style="width: 0.8rem;vertical-align:middle;margin-right:0.4rem"
          src="../../assets/img/my/kf.png"
        />
        <span class="custom-title">客服电话</span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import daifuk from "../../assets/img/my/daifuk.png";
import dpl from "../../assets/img/my/dpl.png";
import dsk from "../../assets/img/my/dsk.png";
import sh from "../../assets/img/my/sh.png";
export default {
  data() {
    return {
      popupShow: false,
      tarbarType: 1,
      navigations: [
        {
          img: daifuk,
          name: "待付款",
        },
        {
          img: dpl,
          name: "待收货",
        },
        {
          img: dsk,
          name: "意见建议",
        },
        // {
        //   img: dsk,
        //   name: "待评论"
        // },
        // {
        //   img: sh,
        //   name: "退货/售后"
        // }
      ],
    };
  },
  mounted() {
    this.$store.commit("show_activeid", 3);
  },
  methods: {
    popupClick: function (rutname, id) {
      if (this.$store.state.user.companyName) {
        this.$router.push(`/manage/${rutname}`);
      } else {
        this.$router.push({
          path: "/login",
          query: this.$router.currentRoute.fullPath,
        });
        this.$toast("未登录或登录信息失效！");
      }
    },
    // 物流信息跳转
    rutlogisticsList: function () {
      if (this.$store.state.user.companyName) {
        this.$router.push("/manage/logisticsList");
      } else {
        this.$router.push({
          path: "/login",
          query: this.$router.currentRoute.fullPath,
        });
        this.$toast("未登录或登录信息失效！");
      }
    },
    rutClick: function (id) {
      if (!this.$store.state.user.companyName) {
        this.$router.push({
          path: "/login",
          query: this.$router.currentRoute.fullPath,
        });
        this.$toast("未登录或登录信息失效！");
        return;
      }
      if (id == 4) {
        this.$router.push("/shopping/aftermarket");
      } else if (id == 3) {
        this.$router.push("/personage/idea");
      } else {
        this.$router.push(`/shopping/orderForm?formid=${id}`);
      }
    },
  },
};
</script>
<style scoped>
.personage {
  flex: auto;
  height: 1px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
.userImg {
  height: 10rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
.userImg > img {
  width: 5rem;
}
.userImg > p {
  color: #fff;
  padding: 1rem 0.5rem;
  font-size: 1.2rem;
}

.navigationBox img {
  width: 2rem;
  padding: 0.8rem 0;
}

/* 用户收货列表 */
.sitelist {
  display: flex;
  flex-direction: column;
}
.sitelist img {
  width: 3rem;
  border-radius: 0.3rem;
}
.list {
  padding: 1rem 1rem 1rem 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.list_active {
  background-color: #fff;
  -webkit-box-shadow: #f1f1f1 0px 0px 0.2rem;
  -moz-box-shadow: #f1f1f1 0px 0px 0.2rem;
  box-shadow: #f1f1f1 0px 0px 0.2rem;
  /* background: #eeff99; */
}
.list_active p {
  color: #feb35c !important;
}
.site {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
}
.site > p {
  color: #9f9f9f;
  padding: 0 0.5rem;
  font-size: 0.9rem;
}
.site > p:nth-child(1) {
  display: flex;
  justify-content: space-between;
}
.personage > div {
  background-color: #fbfcfd;
}
</style>
<style>
.personage [class*="van-hairline"]::after {
  border: none;
}
.personage .van-grid-item__content {
  background-color: #fbfcfd;
}
/* 物流信息 */
.personage .van-cell:nth-child(5)::after {
  border: none !important;
}
</style>
