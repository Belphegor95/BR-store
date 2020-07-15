<template>
  <div class="classification">
    <van-nav-bar class="navBar" title="分类" :fixed="false" :placeholder="true" />
    <div class="nav">
      <sidebar />
      <div class="contentBox">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
        <ul>
          <li v-for="item in 8" :key="item">
            <h4>得力打印机456201(12345)</h4>
            <div class="tagBox" @click="rutClick">
              <img src="../../assets/img/product/particulars/chanpin.png" />
              <div class="tagRight">
                <p>蓝</p>
                <p>市场价: 19.8/个</p>
                <p>商品标签:</p>
                <p>15.86/个</p>
              </div>
            </div>
            <div class="stepperBox" @click="addGoods($event)">
              <van-stepper v-model="value" theme="round" />
              <div class="ball-wrapper" v-for="(ball, index) of balls" :key="index">
                <transition
                  name="drop"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                >
                  <div class="ball" v-show="ball.show">
                    <!--这里为了做两个维度的动画，因此需要多包一层，外层做Y轴，内层做X轴动画-->
                    <div class="inner inner-hook"></div>
                  </div>
                </transition>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    sidebar
  },
  data() {
    return {
      value: 0,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      addShow: false,
      balls: [
        // 这里定义了多个ball,是因为可能同时有多个小球在动画中（快速点击多次或者多个商品）
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [] // 在动画中的小球集合
    };
  },
  mounted() {
    // this.$store.commit("show_activeid", 1);
    this.getcate()
  },
  methods: {
    rutClick: function() {
      this.$router.push("/product/particulars");
    },
    getcate: function() {
      this.axios
        .get(this.$api.cate)
        .then(data => {
          if (data.code == 200) {
            console.info(data);
          } else {
          }
        })
        .catch(() => {});
    },
    // 购物车动画
    addGoods(e) {
      // 利用事件冒泡  获取 组件的+号点击event对象
      if (e.path[0].classList[0] != "van-stepper__plus") return; //判断你是否是+号
      let el = e.target;
      this.balls.forEach(v => {
        if (!v.show) {
          v.show = true; // 当切换元素的display:block/none时，会触发vue的动画
          v.el = el; // 将触发点击事件的“+”号保定道小球对象上，方便获取动画初始时的位置
          this.dropBalls.push(v); // 取一个小球加入动画队列
          return;
        }
      });
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        // 将动画队列中的小球，依次处理
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //拿到点击的“+”号的位置,这里不直接取值（我是用的绝对定位，当然可以直接取值）的原因是，商品列表中每个加号的位置是不固定的，如果上下滑动了，这个位置就不确定
          let x = rect.left - 70; // 需要偏移的x向距离
          let y = -(window.innerHeight - rect.top - 65); // 需要偏移的y向距离
          el.style.display = ""; // 当前状态下，display值为none，将其置空。

          // 这里需要注意了，小球飞入的动画分两个维度，X轴和Y轴，因此
          el.style.webkitTransform = `translate3d(0px, ${y}px, 0px)`; // 首先将“ball”Y向移动至“+”好位置
          el.style.transform = `translate3d(0px, ${y}px, 0px)`;
          // 接着将“inner-hook”X向移动至“+”号处，其实此时外层“ball”的X位置没有动，但因为背景色等等样式只应用于“inner-hook”上，因此，视觉效果上，这个小球是移动到了“+”号的位置
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    enter(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; // 主动触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0, 0, 0)"; //接着将小球位置置为初始值，但css中设置了transition .8s,因此，动画效果就出来了
        el.style.transform = "translate3d(0, 0, 0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        // console.info(inner.style.webkitTransform)
        inner.style.webkitTransform = "translate3d(175px, 0, 0)";
        el.style.transform = "translate3d(0, 0, 0)";
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift(); //结束后，将这个活动中的小球删除
      if (ball) {
        ball.show = false;
        el.style.display = "none"; // 并且将其设为不可见
      }
    }
  }
};
</script>
<style scoped>
.classification {
  height: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.nav {
  height: 100%;
  display: flex;
  overflow-y: hidden;
}
/* 右侧内容 */
.contentBox {
  flex: auto;
  overflow-y: auto;
}
li {
  display: flex;
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
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  flex-direction: row-reverse;
}
/* 过度动画 */
.ball {
  position: fixed;
  z-index: 100;
  left: 80px;
  bottom: 45px;
}
.drop-enter-active {
  transition: all 0.2s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.inner {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: red;
  transition: all 0.2s;
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
</style>

