// 配置所有api
const api = {
  getSubjectList:'/course/product/list',//获取课程列表
  getshopdetail: '/course/product/detail',//获取课程详情
  getCode: '/course/index/captcha',//获取手机验证码  
  creatOrder:'/course/order/create',//创建订单
  registered:'/course/index/memberRegister',//注册
  orderList:'/course/order/list',//我的订单列表
  create:'/course/order/create',//创建订单
  payment:'/course/payment/index',//生成支付事务
  pay:'/course/payment/pay',//支付
  getCourseOrder:'/course/code/getCourseOrder',//获取用户订单
  getSign: '/course/order/getSign',//签到
  
}

var appID = {
  appid: 'wxde505d50928a5ee0'
}
var appSecret = {
  appsecret:'113d6b456a474b8570de28adc2d7609a'
}

module.exports.api = api;
module.exports.appSecret = appSecret;
module.exports.appID = appID;