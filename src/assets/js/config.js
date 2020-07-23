var api = api || {};

api.baseUrl = "http://192.168.1.189:3000"   // 孙飞请求地址

api.regist = "/api/regist"  // 注册 1

api.login = "/api/login"  // 登录 1

api.slideshow = "/api/slideshow"  // 轮播图 1

api.homeRecommend = "/api/homeRecommend"  // 推荐商品 1

api.cate = "/api/cate"  // 分类 1

api.getCatePlist = "/api/getCatePlist"  // 获取分类商品 1

api.getYzm = "/api/getYzm"  // 获取验证码

api.addAddress = "/api/addAddress"  // 保存地址

api.getAllAddress = "/api/getAllAddress"  // 获取所有地址

api.search = "/api/search"  // 搜索商品

api.addToShoppingCart = "/api/addToShoppingCart"  // 添加购物车

api.getShoppingCart = "/api/getShoppingCart"  // 购物车物品个数

export { api };