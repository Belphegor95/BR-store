<!-- 购物车 -->
<template>
  <div class="shopping">
    <van-nav-bar class="navBar" :fixed="false" placeholder title="购物车">
      <template #right>
        <span @click="foldClick">{{ !fold ? "展开" : "折叠" }}</span>
        <span @click="operate = !operate">{{ operate ? "编辑" : "完成" }}</span>
      </template>
    </van-nav-bar>
    <div>
      <div class="shortofBox">
        <p>满{{ freeSend }}起送</p>
        <p v-if="freeSend - totalPrice / 100 > 0">
          还差{{ (freeSend - totalPrice / 100).toFixed(2) }}起送
        </p>
        <p v-else>起送</p>
      </div>
    </div>
    <van-checkbox-group
      class="checkboxBox"
      v-model="goodss"
      ref="checkboxGroup"
      checked-color="#feb35c"
    >
      <van-empty v-if="shoppings.length == 0" description="暂无数据" />
      <div class="van-card" v-for="(item, index) in shoppings" :key="index">
        <div class="van-card__header">
          <van-checkbox
            @click="checkedClural(item, index)"
            :name="item.plistId"
          ></van-checkbox>
          <a class="van-card__thumb">
            <div class="van-image" style="width: 100%; height: 100%">
              <img
                :src="item.picUrl"
                class="van-image__img"
                style="object-fit: cover"
              />
            </div>
          </a>
          <div class="van-card__content">
            <div class="contentbox">
              <div class="van-card__title van-multi-ellipsis--l2">
                {{ item.plistName }}
              </div>
              <van-button
                round
                @click="isfoldClick(item)"
                size="mini"
                type="info"
              >
                <p>{{ !item.isfold ? "展开" : "折叠" }}</p>
                <van-icon v-if="item.isfold" name="arrow-up" />
                <van-icon v-else name="arrow-down" />
              </van-button>
            </div>
            <div class="van-card__bottom">
              <div class="van-card__num">x{{ item.unit | totalNum }}</div>
            </div>
          </div>
        </div>
        <van-checkbox-group
          ref="checkboxGroup_"
          v-model="singles"
          checked-color="#feb35c"
        >
          <div
            class="van-card_content"
            v-show="item.isfold"
            v-for="(itemJ, indexJ) in item.unit"
            :key="indexJ"
          >
            <van-checkbox
              checked-color="#feb35c"
              :name="`${item.plistId}_${itemJ.cateId}_${itemJ.priceId}_${index}/${indexJ}`"
              @click="checkedSingle(item, index, indexJ)"
              >{{ itemJ.priceName }}</van-checkbox
            >
            <van-stepper
              v-model="itemJ.buyNum"
              :integer="true"
              :allow-empty="false"
              :min="1"
              theme="round"
              @change="stepperClick(itemJ.buyNum, itemJ)"
            />
          </div>
        </van-checkbox-group>
      </div>
    </van-checkbox-group>
    <van-submit-bar
      v-if="operate"
      :price="totalPrice"
      button-text="结算"
      @submit="goods(true)"
    >
      <van-checkbox
        checked-color="#feb35c"
        @click="checkedClick(checked)"
        v-model="checked"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <div v-else class="submitBar">
      <van-checkbox
        checked-color="#feb35c"
        @click="checkedClick(checked)"
        v-model="checked"
        >全选</van-checkbox
      >
      <p>{{ `种类${shoppings.length}数量${totalNum}` }}</p>
      <button
        @click="goods(false)"
        class="van-button van-button--danger van-button--normal van-button--round van-submit-bar__button van-submit-bar__button--danger"
      >
        <div class="van-button__content">
          <span class="van-button__text">删除</span>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodss: [], //选中的商品
      singles: [], //选中的商品规格
      checked: false, // 全选状态
      fold: false, // 展开折叠状态
      operate: true, // 编辑状态
      totalPrice: 0, // 总价格
      totalNum: 0, // 总数量
      shoppings: [], // 购物车商品
      freeSend: 0, // 多少包邮
    };
  },
  watch: {
    // 监听所有商品都被选中 全选状态打开
    goodss: function (arr) {
      arr.length == this.shoppings.length
        ? (this.checked = true)
        : (this.checked = false);
    },
  },
  mounted() {
    this.$store.commit("show_activeid", 2);
    this.getShoppingCart();
  },
  methods: {
    // 获取购物车商品
    getShoppingCart: function () {
      this.axios
        .post(this.$api.getShoppingCart)
        .then((data) => {
          if (data.code == 200) {
            this.shoppings = data.data;
            this.freeSend = data.freeSend;
            let num = 0;
            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i].unit;
              num = num + item.length;
            }
            this.$store.commit("show_count", num);
            // 选中全部
            this.$nextTick(() => {
              this.checkedClick(true);
              this.calctotalPrice();
            });
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 修改购物车商品数量
    shoppingCarCount: function (item) {
      this.axios
        .post(this.$api.editShoppingCarCount, {
          plistId: item.plistId,
          priceId: item.priceId,
          cateId: item.cateId,
          buyNum: item.buyNum,
        })
        .then((data) => {
          if (data.code == 200) {
            // 重新计算价格
            this.calctotalPrice();
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    // 删除商品
    delShopping: function (arr) {
      this.$dialog
        .confirm({
          message: "确认删除吗?",
        })
        .then(() => {
          this.axios
            .post(this.$api.delSelectShoppingCart, {
              plistIds: JSON.stringify(arr),
            })
            .then((data) => {
              if (data.code == 200) {
                this.getShoppingCart();
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
    // 下单
    downOrder: function (arr) {
      this.axios
        .post(this.$api.downOrder, {
          plistIds: JSON.stringify(arr),
        })
        .then((data) => {
          if (data.code == 200) {
            this.$store.commit("show_order", data.data);
            this.$router.push("/shopping/addOrder");
          } else {
            this.$toast(this.ErrCode(data.msg));
          }
        })
        .catch(() => {
          this.$toast.fail(this.$api.monmsg);
        });
    },
    goods: function (is) {
      let arr = [];
      for (let i = 0; i < this.singles.length; i++) {
        let item = this.singles[i].split("_");
        let obj = {
          plistId: Number(item[0]),
          unit: [],
        };
        let obj_ = {
          cateId: Number(item[1]),
          priceId: Number(item[2]),
        };
        let index_ = -1; // 重复位置索引
        for (let j = 0; j < arr.length; j++) {
          if (obj.plistId == arr[j].plistId) {
            index_ = j;
            break;
          }
        }
        if (index_ == -1) {
          obj.unit.push(obj_);
          arr.push(obj);
        } else {
          arr[index_].unit.push(obj_);
        }
      }
      if (arr.length == 0) return;
      if (is) {
        this.downOrder(arr);
      } else {
        this.delShopping(arr);
      }
    },
    // 单个商品
    checkedClural: function (item, index_I) {
      // 判断是否是添加
      if (this.goodss.indexOf(item.plistId) > -1) {
        // 把未添加的 添加进选中
        for (let i = 0; i < item.unit.length; i++) {
          let itemI = item.unit[i];
          if (
            this.singles.indexOf(
              `${item.plistId}_${itemI.cateId}_${itemI.priceId}_${index_I}/${i}`
            ) > -1
          ) {
          } else {
            this.singles.push(
              `${item.plistId}_${itemI.cateId}_${itemI.priceId}_${index_I}/${i}`
            );
          }
        }
      } else {
        // 删除 把已选中是 选中列表中删除
        for (let i = 0; i < item.unit.length; i++) {
          let itemI = item.unit[i];
          let index = this.singles.indexOf(
            `${item.plistId}_${itemI.cateId}_${itemI.priceId}_${index_I}/${i}`
          );
          if (index > -1) {
            this.singles.splice(index, 1);
          } else {
            this.singles.push(
              `${item.plistId}_${itemI.cateId}_${itemI.priceId}_${index_I}/${i}`
            );
          }
        }
      }
      this.calctotalPrice();
    },
    // 单个种类
    checkedSingle: function (item, index, indexJ) {
      let arr = this.singles.filter((id) => {
        // 判断 出现位置是否在 第一个位
        return id.indexOf(item.plistId + "_") == 0;
      });
      if (arr.length == item.unit.length) {
        // 如果全部添加  就把父级也添加选中
        this.goodss.push(item.plistId);
      } else {
        // 不是全选  取消父级选中
        this.goodss = this.goodss.filter((id) => {
          return id != item.plistId;
        });
      }
      this.calctotalPrice();
    },
    // 全选
    checkedClick: function (is) {
      if (is) {
        this.checked = is;
        this.$refs.checkboxGroup.toggleAll(true);
        this.for_checked(is);
      } else {
        this.checked = is;
        this.$refs.checkboxGroup.toggleAll();
        this.for_checked(is);
      }
      this.calctotalPrice();
    },
    // 单个商品种类全选
    for_checked: function (is) {
      this.singles = [];
      if (is) {
        for (let i = 0; i < this.shoppings.length; i++) {
          let itemI = this.shoppings[i];
          for (let j = 0; j < itemI.unit.length; j++) {
            let itemJ = itemI.unit[j];
            this.singles.push(
              `${itemI.plistId}_${itemJ.cateId}_${itemJ.priceId}_${i}/${j}`
            );
          }
        }
      }
    },
    // 商品个数改变
    stepperClick: function (value, item) {
      if (typeof value == "number") {
        this.shoppingCarCount(item);
      }
    },

    // 计算总价格
    calctotalPrice: function () {
      let data = this.shoppings;
      this.totalNum = 0;
      this.totalPrice = 0;
      for (let i = 0; i < this.singles.length; i++) {
        let item = this.singles[i].split("_");
        let indexes = item[3].split("/");
        let item_ = this.shoppings[indexes[0]].unit[indexes[1]];
        let num = item_.buyNum * item_.orderPrice * 100;
        // 总数量
        this.totalNum = this.totalNum + item_.buyNum;
        // 总价格
        this.totalPrice = this.totalPrice + num;
      }
    },
    // 点击折叠收起
    foldClick: function () {
      for (let i = 0; i < this.shoppings.length; i++) {
        let item = this.shoppings[i];
        this.$set(item, "isfold", !this.fold);
      }
      this.fold = !this.fold;
    },
    // 单条点击折叠收起
    isfoldClick: function (data) {
      if (data.isfold) {
        this.$set(data, "isfold", false);
      } else {
        this.$set(data, "isfold", true);
      }
    },
  },
  filters: {
    // 单个商品总个数
    totalNum: function (arr) {
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i].buyNum;
        if (typeof item == "number") {
          num = num + item;
        }
      }
      return num;
    },
  },
};
</script>
<style scoped>
.shopping {
  height: 1px;
  flex: auto;
  display: flex;
  flex-direction: column;
}
/* 列表 */
.checkboxBox {
  flex: auto;
  overflow-y: auto;
  background-color: #f5f5f5;
}
.shortofBox {
  display: flex;
  height: 2rem;
  background: #ffeee0;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  color: #e75858;
  font-size: 1rem;
}
.contentbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contentbox button {
  width: 4rem;
}
.van-card_content {
  display: flex;
  padding: 0.3rem 1.5rem;
  /* margin-top: 0.5rem;
  margin-left: 0.5rem; */
  align-items: center;
  background-color: #fafafa;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
}
.van-card__header {
  padding: 8px 16px;
}
/* 删除操作栏 */
.submitBar {
  height: 50px;
  display: flex;
  padding-left: 1rem;
  /* padding: 0 1rem; */
  align-items: center;
  background-color: #fff;
  justify-content: flex-end;
}
.submitBar p {
  flex: 1;
  padding-right: 0.5rem;
  text-align: right;
  /* color: #ee0a24; */
}
/* 删除按钮 */
.submitBar button {
  height: 100%;
  border-radius: 0;
  background: #e75858 !important;
}
</style>
<style  >
.shopping .van-submit-bar {
  /* bottom: 50px; */
  position: relative;
  background-color: #fff;
}
.shopping .van-card {
  margin-bottom: 8px;
  margin-top: 0;
  padding: 0;
}
/* 头部 按钮样式 */
.shopping .van-nav-bar__right span {
  color: #fff;
  margin-left: 1rem;
}
/* 折叠按钮 */
.shopping .checkboxBox .van-button--info {
  background-color: #f5f5f5;
  border: 1px solid #a3a3a1;
  color: #a3a3a1;
}
.van-button__text {
  display: flex;
}
.shopping .van-checkbox {
  margin-right: 0.5rem;
}
.van-card_content .van-checkbox__label {
  color: red !important;
  font-size: 1rem;
}
.shopping .van-checkbox__label {
  font-size: 0.9rem;
}
/* 步进器 */
/* .van-stepper {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
} */
.van-stepper--round .van-stepper__minus {
  border: none;
  color: #c8c9cc;
  background-color: #f4f4f4;
}
.van-stepper--round .van-stepper__plus {
  color: #feb35c;
  background-color: #f4f4f4;
}
.van-stepper {
  display: inline-block;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  background-color: #f4f4f4;
}
/* 底部右侧内边距取消 */
.shopping .van-submit-bar__bar {
  padding-right: 0;
}
/* 底部按钮样式 */
.shopping .van-submit-bar .van-submit-bar__button {
  height: 100%;
  border-radius: 0;
  background: #e75858 !important;
}
</style>
