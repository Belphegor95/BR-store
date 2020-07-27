import Vue from 'vue'
import VueRouter from 'vue-router'
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
    path: '/switchoverUser',
    name: 'SwitchoverUser',
    component: () => import('../views/SwitchoverUser.vue')
  },
  {
    path: '/particulars',
    name: 'Particulars',
    component: () => import('../views/Particulars.vue')
  },
  {
    path: '/shopping/order',
    name: 'Order',
    component: () => import('../views/shopping/Order.vue')
  },
  {
    path: '/shopping/addOrder',
    name: 'AddOrder',
    component: () => import('../views/shopping/AddOrder.vue')
  },
  {
    path: '/shopping/orderForm',
    name: 'OrderForm',
    component: () => import('../views/shopping/OrderForm.vue'),
  },
  {
    path: '/shopping/aftermarket', // 退货/售后
    name: 'aftermarket',
    component: () => import('../views/shopping/Aftermarket.vue'),
  },
  {
    path: '/shopping/refund', // 退货/售后 详情
    name: 'refund',
    component: () => import('../views/shopping/Refund.vue'),
  },
  { 
    path: '/personage/idea', // 我的  意见建议
    name: 'idea',
    component: () => import('../views/my/Idea.vue'),
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
    {
      path: '/manage/logistics',  // 物流信息
      component: () => import('../views/my/Logistics.vue'),
    },
    {
      path: '/manage/coupon',  // 优惠券
      component: () => import('../views/my/Coupon.vue'),
    },
    ]
  },

  {
    path: '/maintain',
    name: 'Maintain',
    component: () => import('../views/home/Maintain.vue'),
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/Comment.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
