<template>
  <div class="add">
    <div class="content">
      <div class="list" v-for="item in 1" :key="item">
        <div @click="add($event)">
          加入
          <transition
            name="drop"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div v-show="is" class="ball"></div>
          </transition>
        </div>
      </div>
    </div>
    <div class="box1">
      <div>1</div>
      <div>2</div>
      <div>购物车</div>
      <div>4</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is: false
    };
  },
  methods: {
    add: function(e) {
      this.is = true;
      console.info(e.target);
    },
    beforeEnter(el) {
      console.info(el);
      el.style.webkitTransform = `translate3d(0px, 100px, 0px)`;
    },
    enter(el) {
      console.info(el);
    },
    afterEnter(el) {
      this.is = true;
      console.info(el);
    }
  }
};
</script>
<style scoped>
.add {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: auto;
  overflow-y: auto;
}
.list {
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;
  /* justify-content: space-around; */
}
.box1 {
  /* position: fixed;
  bottom: 0;
  right: 0; */
  display: flex;
  width: 100%;
}
.box1 > div {
  flex: 1;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
}
.box1 > div:nth-child(3) {
  background-color: #999;
}
.ball {
  width: 10px;
  height: 10px;
  background-color: red;
  transition: all 1s;
  /* transform: translate3d(10px, 10px, 0); */
}
.drop-enter-active {
  transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
</style>
