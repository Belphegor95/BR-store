<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 通用样式 */
* {
  padding: 0;
  margin: 0;
}
*::-webkit-scrollbar {
  display: none;
}
/* 去除默认样式 */
i {
  font-style: normal;
}
ul,
li {
  list-style: none;
}
button {
  border: 0;
  background-color: transparent;
  outline: none;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
.btnForm {
  width: 100%;
  border: none;
  overflow: hidden;
  border: none !important;
  color: #fff !important;
  font-size: 1.2rem !important;
  border-radius: 0.3rem !important;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
/* 计时按钮 */
.btnloadClass {
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  color: #000;
  font-size: 12px;
  border: 1px solid #ebedf0;
}
/* 头部 */
.navBar,
.van-nav-bar--fixed {
  height: 3rem;
  line-height: 3rem !important;
  background-image: linear-gradient(to right, #ffd8a4, #fcaa8d);
}
.navBar .van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__left .van-icon {
  color: #fff !important;
}
/* 字体颜色 */
.van-nav-bar__title {
  font-size: 1.2rem !important;
  color: #fff !important;
}
/* 单选颜色 */
.van-radio__icon--checked .van-icon {
  background-color: #feb35c !important;
  border-color: #feb35c !important;
}
/* 步进器 */
.van-stepper {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.stepperBox .van-stepper--round .van-stepper__minus {
  border: none;
  color: #c8c9cc;
  background-color: #f4f4f4;
}
.stepperBox .van-stepper--round .van-stepper__plus {
  color: #feb35c;
  background-color: #f4f4f4;
}
.stepperBox .van-stepper {
  display: inline-block;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  background-color: #f4f4f4;
}
/* 首页-分类  顶部 */
.van-search {
  flex: auto !important;
}
.van-search__content {
  border-radius: 5rem !important;
}
.van-search {
  background-color: transparent !important;
}
/* 头部标签栏右侧字体颜色 */
.van-nav-bar__right .van-nav-bar__text {
  color: #fff;
}
/* 下拉刷新 */
.van-pull-refresh {
  overflow: auto !important;
  height: 100%;
}
</style>
