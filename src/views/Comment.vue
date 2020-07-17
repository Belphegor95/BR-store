<template>
  <!-- 评论 -->
  <div class="comment">
    <van-nav-bar left-arrow class="navBar" @click-left="$router.go(-1)" :fixed="false" title="评论" />
    <div class="contentbox">
      <div class="btnbox">
        <div class="btn">
          <van-button
            type="default"
            size="small"
            round
            v-for="(item,index) in btns"
            :key="index"
            :class="btnid == index? 'btnpitch':''"
            @click="btnid = index"
          >{{ item }}</van-button>
        </div>
        <van-icon name="arrow-down" @click="foldClick" />
      </div>
      <ul class="commentlist">
        <li>
          <img src="../assets/img/tx.png" alt />
          <div class="informationbox">
            <p>用户名字132456</p>
            <p>2020-7-17 11:52 366666蓝色</p>
            <p>东西到了很好,配送很快,宝贝和图片一样</p>
            <div class="imgbox">
              <img src="../assets/img/pl.png" alt />
              <img src="../assets/img/pl.png" alt />
              <img src="../assets/img/pl.png" alt />
            </div>
            <div>
              <p>
                <span>客服:</span>东西到了很好,配送很快,宝贝和图片一样,宝贝和图片一样
              </p>
              <p>查看更多回复</p>
            </div>
            <div>
              <span>浏览3万</span>
              <span>评论</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btns: ["全部", "最新", "有图(246)", "视频(10)", "追加(10)"],
      btnid: 0
    };
  },
  methods: {
    foldClick: function() {
      this.btns = this.btns.concat(this.btns);
    }
  }
};
</script>
<style scoped>
.comment {
  height: 100%;
}
.btnbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #fafafa;
}
.btn {
  display: flex;
  width: 100%;
  padding-top: 0.8rem;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.btn > button {
  margin-left: 0.7rem;
  margin-bottom: 0.5rem;
}
.btnpitch {
  color: #faa062;
  border: 1px solid #faa062;
}
/* 评论列表 */
/* .commentlist {
    
} */
.commentlist li {
  display: flex;
  align-items: flex-start;
}
/* .commentlist li > img {
    width: 2rem;
} */
/* 信息展示盒子 */
.informationbox {
    display: flex; 
    flex-direction: column;
}
.imgbox {
    display: flex;
}
.imgbox img {
    width: 5.5rem;
}
</style>
