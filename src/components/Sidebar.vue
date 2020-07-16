<template>
  <div class="van-sidebar">
    <div v-for="(item,index) in cateList.cateOneList" :key="index" @click="sidebarClick(item)">
      <a class="van-sidebar-item" v-show="cateOne != item.id">
        <div class="van-sidebar-item__text">{{ item.title }}</div>
      </a>
      <transition name="list-complete">
        <div class="van-sidebar_two" v-if="cateOne  == item.id">
          <a>
            <div class="van-sidebar-item__text">{{ item.title }}</div>
          </a>
          <a
            v-for="(item1,index1) in item.twolist"
            :key="index1"
            @click.stop="sidebarTwoClick(item1)"
          >
            <div
              class="van-sidebar-item__text van-sidebar-item_two"
              :class="cateTwo== item1.id?'two_pitch':''"
            >
              <i v-if="cateTwo== item1.id">·</i>
              {{ item1.title }}
            </div>
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
      cateOne: 0,
      cateTwo: -1,
      cateList: []
    };
  },
  mounted() {
    this.getcate();
  },
  methods: {
    sidebarClick: function(item) {
      this.cateOne = item.id;
      item.twolist ? (this.cateTwo = item.twolist[0].id) : (this.cateTwo = -1);
      let obj = {};
      obj.one = this.cateOne;
      obj.two = this.cateTwo;
      this.$emit("cateid", obj);
    },
    sidebarTwoClick: function(item) {
      this.cateTwo = item.id;
      let obj = {};
      obj.one = this.cateOne;
      obj.two = this.cateTwo;
      this.$emit("cateid", obj);
    },
    getcate: function() {
      this.axios
        .get(this.$api.cate)
        .then(data => {
          if (data.code == 200) {
            let data_ = data.data;
            for (let i = 0; i < data_.cateOneList.length; i++) {
              let cateoneid = data_.cateOneList[i].id;
              for (let key in data_.cateTwoList) {
                if (cateoneid == key) {
                  data_.cateOneList[i].twolist = data_.cateTwoList[key];
                }
              }
            }
            this.cateList = data_;
          } else {
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.van-sidebar {
  overflow-y: scroll;
  background-color: #f7f8fa;
}

.van-sidebar-item {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  text-align: center;
}
/* 二级样式 */
.van-sidebar_two {
  width: 4.7rem;
  margin: 0.1rem 0.2rem 0.2rem 0;
  background-color: #fff;
  border-radius: 0 0.2rem 0.2rem 0;
  box-shadow: 0rem 0px 0.2rem rgba(0, 0, 0, 0.4);
}
.van-sidebar_two > a {
  display: flex;
  padding: 0.5rem 0;
  text-align: center;
  justify-content: center;
}
.van-sidebar_two > a > div {
  display: inline-block;
}
.van-sidebar-item {
  width: 4.5rem;
}
.van-sidebar-item_two {
  font-size: 0.8rem;
  line-height: 2rem;
}
/* 二级选中样式 */
.two_pitch {
  color: red;
}
.two_pitch i {
  font-weight: 700;
}
/* 过度动画 */
.van-sidebar_two {
  transition: all .5s;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

</style>
