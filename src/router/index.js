import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
// import HomePage from '../views/home/HomePage.vue'
// import Register from '../views/Register.vue'
// import Password from '../views/Password.vue'
// import Particulars from '../views/product/Particulars.vue'  //产品详情
// import Shopping from '../views/shopping/Shopping.vue'  //购物车
// import Order from '../views/shopping/Order.vue'  //结算订单
// import Classification from '../views/classify/Classification.vue'  //分类

// import Personage from '../views/my/Personage.vue'  // 我的
// import Manage from '../views/my/Manage.vue'  // 我的  公共路由
// import Address from '../views/my/Address.vue'  // 地址列表
// import AddressRedact from '../views/my/AddressRedact.vue'  // 地址列表
// import Center from '../views/my/Center.vue'  // 个人中心
// import Setting from '../views/my/Setting.vue'  // 设置
// import Information from '../views/my/Information.vue'  // 消息


// import OrderForm from '../views/orderForm/OrderForm.vue'  // 订单
// import Maintain from '../views/home/Maintain.vue'  // 订单
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: '/homePage',
    children: [{
      path: '/homePage',
      component: () => import('../views/home/HomePage.vue'),
    },
    {
      path: '/shopping',
      component: () => import('../views/shopping/Shopping.vue'),
    },
    {
      path: '/classification',
      component: () => import("../views/classify/Classification.vue"),
    },
    {
      path: '/personage',
      component: () => import("../views/my/Personage.vue"),
    },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('../views/Password.vue')
  },
  {
    path: '/product/particulars',
    name: 'Particulars',
    component: () => import('../views/product/Particulars.vue')
  },
  {
    path: '/shopping/order',
    name: 'Order',
    component: () => import('../views/shopping/Order.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/my/Manage.vue'),
    children: [{
      path: '/manage/address',
      component: () => import('../views/my/Address.vue'),
    },
    {
      path: '/manage/addressRedact',
      component: () => import('../views/my/AddressRedact.vue'),
    },
    {
      path: '/manage/center',
      component: () => import('../views/my/Center.vue'),
    },
    {
      path: '/manage/setting',
      component: () => import('../views/my/Setting.vue'),
    },
    {
      path: '/manage/information',
      component: () => import('../views/my/Information.vue'),
    },
    ]
  },
  {
    path: '/orderForm',
    name: 'OrderForm',
    component: () => import('../views/orderForm/OrderForm.vue'),
  },
  {
    path: '/maintain',
    name: 'Maintain',
    component: () => import('../views/home/Maintain.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
