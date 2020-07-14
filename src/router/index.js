import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import HomePage from '../views/home/HomePage.vue'
import Register from '../views/Register.vue'
import Password from '../views/Password.vue'
import Particulars from '../views/product/Particulars.vue'  //产品详情
import Shopping from '../views/shopping/Shopping.vue'  //购物车
import Order from '../views/shopping/Order.vue'  //结算订单
import Classification from '../views/classify/Classification.vue'  //分类

import Personage from '../views/my/Personage.vue'  // 我的
import Manage from '../views/my/Manage.vue'  // 我的  公共路由
import Address from '../views/my/Address.vue'  // 地址列表
import AddressRedact from '../views/my/AddressRedact.vue'  // 地址列表
import Center from '../views/my/Center.vue'  // 个人中心
import Setting from '../views/my/Setting.vue'  // 设置
import Information from '../views/my/Information.vue'  // 消息


import OrderForm from '../views/orderForm/OrderForm.vue'  // 订单
import Maintain from '../views/home/Maintain.vue'  // 订单
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: '/homePage',
      component: HomePage
    },
    {
      path: '/shopping',
      component: Shopping
    },
    {
      path: '/classification',
      component: Classification
    },
    {
      path: '/personage',
      component: Personage,
    },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/password',
    name: 'password',
    component: Password
  },
  {
    path: '/product/particulars',
    name: 'particulars',
    component: Particulars
  },
  {
    path: '/shopping/order',
    name: 'order',
    component: Order
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    children: [{
      path: '/manage/address',
      component: Address
    },
    {
      path: '/manage/addressRedact',
      component: AddressRedact
    },
    {
      path: '/manage/center',
      component: Center
    },
    {
      path: '/manage/setting',
      component: Setting
    },
    {
      path: '/manage/information',
      component: Information
    },
    ]
  },
  {
    path: '/orderForm',
    name: 'OrderForm',
    component: OrderForm,
  },
  {
    path: '/maintain',
    name: 'Maintain',
    component: Maintain,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
