var api = api || {};
api.baseUrl = "http://192.168.1.189:3000"   // 孙飞请求地址

api.regist = "/api/regist"  // 注册

api.login = "/api/login"  // 登录

api.slideshow = "/api/slideshow"  // 轮播图

api.homeRecommend = "/api/homeRecommend"  // 推荐商品

api.cate = "/api/cate"  // 分类

api.getCatePlist = "/api/getCatePlist"  // 获取分类商品

api.getVerificationCode = "/api/getVerificationCode"  // 获取验证码


export { api };