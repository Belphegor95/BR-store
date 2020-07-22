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
    path: '/shopping/aftermarket',
    name: 'aftermarket',
    component: () => import('../views/shopping/Aftermarket.vue'),
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
    path: '/maintain',
    name: 'Maintain',
    component: () => import('../views/home/Maintain.vue'),
  },
  {
    path: '/ball',
    name: 'ball',
    component: () => import('../views/ball.vue'),
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
