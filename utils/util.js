const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//时间戳开始时间转换
function beginData(shareList, i) {
  var date = new Date(shareList[i].beginDate);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  shareList[i].date = Y + M + D;
  return shareList[i].date
}
//时间戳结束时间转换
function endData(shareList, i) {
  var date = new Date(shareList[i].endDate);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  shareList[i].date = Y + M + D;
  return shareList[i].date
}
//函数节流
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
//接口路径
//var testurl = 'http://192.168.1.105:8080/redsunMall'
var testurl = 'http://47.100.193.21:80'
//var testurl = 'https://mallserver02.gvg666.com/redsunMall'
//var testurl = 'https://wx1989.gvg666.com/redsunMall'
//封装接口
function getData(url, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: testurl + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  beginData: beginData,
  getData: getData,
  endData: endData,
  throttle: throttle
}


