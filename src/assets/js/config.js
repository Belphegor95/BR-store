var api = api || {};

api.isApp = true // 是app包 还是 网页包
// api.isApp = false // 是app包 还是 网页包

// api.baseUrl = "http://121.196.123.181:3000"

// api.baseUrl = "http://192.168.0.189:3000"   // 孙飞请求地址

// api.baseUrl = "http://39.105.230.213:3000"   // 孙飞请求地址

// api.baseUrl = "http://8.131.87.240:3000"   // 孙飞请求地址

api.baseUrl = "https://www.kaixintu.cn:3000"   // 孙飞请求地址

api.masterUrl = "https://www.kaixintu.cn:3002"   // 公告请求地址

api.monmsg = "网络遇到问题,请重试!";

api.regist = "/api/regist"  // 注册

api.login = "/api/login"  // 登录

api.selectAcc = "/api/selectAcc"  // 登录角色

api.slideshow = "/api/slideshow"  // 轮播图

api.homeRecommend = "/api/homeRecommend"  // 推荐商品

api.cate = "/api/cate"  // 分类

api.getCatePlist = "/api/getCatePlist"  // 获取分类商品

api.getHomeCate = "/api/getHomeCate"  // 首页分类入口 

api.getYzm = "/api/getYzm"  // 获取验证码

api.addAddress = "/api/addAddress"  // 保存收货地址

api.getAllAddress = "/api/getAllAddress"  // 获取所有收货地址

api.editAddress = "/api/editAddress"  // 设置为默认地址

api.delAddress = "/api/delAddress"  // 删除收货地址

api.search = "/api/search"  // 搜索商品

api.addToShoppingCart = "/api/addToShoppingCart"  // 添加购物车

api.getShoppingCart = "/api/getShoppingCart"  // 购物车商品

api.getShoppingCartPlistCount = "/api/getShoppingCartPlistCount"  // 购物车物品个数

api.editShoppingCarCount = "/api/editShoppingCarCount"  // 修改购物车商品的数量

api.delSelectShoppingCart = "/api/delSelectShoppingCart"  // 删除购物车商品

api.downOrder = "/api/downOrder"  // 购物车下单

api.submitOrder = "/api/submitOrder"  // 提交订单

api.getOrderList = "/api/getOrderList"  // 获取订单

api.getTicket = "/api/getTicket"  // 获取优惠券

api.submitSuggest = "/api/submitSuggest"  // 提交意见建议

api.getYzmForChangePhone = "/api/getYzmForChangePhone"  // 换绑手机号--获取验证码

api.applyChangePhone = "/api/applyChangePhone"  // 申请更换手机号

api.changePhone = "/api/changePhone"  // 换绑手机号

api.logout = "/api/logout"  // 退出登录

api.uploadFixImg = "/api/uploadFixImg"  // 上传图片

api.getYzmForFindPwd = "/api/getYzmForFindPwd"  // 忘记密码 验证码

api.resetPwd = "/api/resetPwd"  //  重置密码

api.getYzmForLogin = "/api/getYzmForLogin"  // 登录验证码

api.loginByYzm = "/api/loginByYzm"  // 验证码登录

api.submitFixOrder = "/api/submitFixOrder" // 提交维修订单

api.editAccOrderName = "/api/editAccOrderName"  // 修改用户名

api.getFixOrder = "/api/getFixOrder"  //  获取维修单

api.getServerNotice = "/api/master/getServerNotice"  // 获取公告  单独端口 3002

api.getFixDoorMoney = "/api/getFixDoorMoney"  // 获取上门维修费用

api.editOrder = "/api/editOrder"  // 修改订单

api.pay = "/api/pay"  // 修改订单

export { api };