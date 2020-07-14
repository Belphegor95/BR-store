<template>
  <div class="van-sidebar">
    <div v-for="item in 24" :key="item" @click="sidebarClick(item)">
      <a class="van-sidebar-item">
        <div class="van-sidebar-item__text">标签名{{ item }}</div>
      </a>
      <transition name="fade">
        <div class="van-sidebar_two" v-if="typeid  === item">
          <a v-for="item1 in 4" :key="item1">
            <div class="van-sidebar-item__text">二级标签{{ item1 }}</div>
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeid: 0
    };
  },
  methods: {
    sidebarClick: function(id) {
      this.typeid = id;
    }
  }
};
</script>
<style scoped>
.van-sidebar {
  /* height: 100%; */
  overflow-y: scroll;
  /* background-color: #f7f8fa; */
}

.van-sidebar-item {
  display: flex;
  justify-content: center;
  line-height: 2.5rem;
  padding: 0;
}
/* 二级样式 */
.van-sidebar_two {
  width: 4.7rem;
  background-color: #fff;
  border-radius: 0 0.2rem 0.2rem 0;
  box-shadow: 0.1rem 0px 0.1rem rgba(0, 0, 0, 0.2);
}
.van-sidebar_two > a {
  display: flex;
  line-height: 2.5rem;
  justify-content: center;
}
.van-sidebar_two > a > div {
  display: inline-block;
}
.van-sidebar-item {
  width: 4.5rem;
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
