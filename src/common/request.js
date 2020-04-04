import wx from './wx'
import {GData as app, get as getGData, set as setGData} from './global_data'
import Config from "./config";
import store from '@/Store'
import utils from "./utils";

var CODE = {
  SUCCESS: 200,
  SUCCESS2: 0,
  AUTHENTICATION_FAILED: 401,
  MEMBER_FAILED: 403
}
var fundebug = {}
if (!Config.dev) {
  console.log('加载FunDebug')
  fundebug = require("fundebug-javascript");
}
var KbURL = Config.KBURL
var requestQueen = []
var requestCount = 0


function clearUserInfo() {
  wx.setStorage({
    key: "isVip_" + Config.env,
    data: false
  });
}

function request(method, url, data, third, noToken, noToast) {
  return new Promise((resolve, reject) => {
    if (requestCount < Config.REQUEST_LIMIT) {
      // console.log('requestAction', url, 'requestCount', requestCount)
      return requestAction(method, url, data, third, noToken, noToast).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } else {
      // console.log('requestQueen', url, 'requestCount', requestCount)
      requestQueen.push(() => {
        // console.log('requestQueen', url)
        return requestAction(method, url, data, third, noToken, noToast).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  })
}

function requestAction(method, url, data, third, noToken, noToast) {
  var startTime = new Date()
  var option = {
    url,
    method,
    data
  }
  try {
    let user = store.getState().user
    var token = user.token
  } catch (e) {
    var token = null
  }
  var header = {
    'content-type': 'application/json', // 默认值,
    'Authorization': 'Token ' + token,
  }
  if (noToken) delete header.Authorization
  if (!token) delete  header.Authorization
  let userInfo = getGData('userInfo')
  option.header = header

  var completeAction = () => {
    requestCount--
    var endTime = new Date()
    var param = {};
    // console.log('url', url)
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);
    var index = url.indexOf('?')
    if (index > -1) {
      url = url.slice(0, index)
    }
    var requestInfo = {
      url: url,
      param: {
        ...data,
        ...param
      },
      method: method,
      openId: '',
      requestDate: startTime.Format('yyyy-MM-dd HH:mm:ss'),
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      requestTime: endTime.getTime() - startTime.getTime(),
    }
    if (app) {
      for (var key in requestInfo) {
        if (typeof requestInfo[key] == 'number') requestInfo[key] = requestInfo[key] + ''
        if (typeof requestInfo[key] == 'object') requestInfo[key] = JSON.stringify(requestInfo[key])
      }
      app.globalData.requestList.push(requestInfo)
      if (app.globalData.requestList.length > 39) {
        var _param = {
          data: app.globalData.requestList,
          logstore: 'request'
        }
        // console.log('log request', _param)
        wx.request({
          url: KbURL + 'zhiyan/event/log/',
          method: 'POST',
          data: _param,
          header: header,
        }).catch(e => {

        })
        app.globalData.requestList = []
      }
    }

    // console.log('complete ', url, 'shift', 'requestCount', requestCount)
    var nextRequest = requestQueen.shift()
    if (nextRequest) nextRequest()
  }
  return new Promise(function (resolve, reject) {
    return Promise.race([
      wx.request({
        url: option.url || '',
        method: option.method || 'GET',
        data: option.data,
        header: option.header
      }),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject({errMsg: 'request:fail timeout'}), Config.TIMEOUT)
      })])
      .then((res) => {
        console.log('请求成功', option.url, res)
        completeAction()
        if (!third) {
          if (res.code == CODE.SUCCESS || res.code == CODE.SUCCESS2) {
            return resolve(res)
          } else if (res.detail && typeof res.detail == 'string' && res.code != 401) {
            if (!noToast) {
              wx.showToast({
                title: res.detail,
                icon: 'none',
                duration: 2000
              })
            }
          }
          reject(res)
        } else {
          resolve(res)
        }
      })
      .catch(res => {
        console.log('请求失败', url, res)
        reject(res)
        completeAction()
        var errTitle = '请求失败'
        if (res && res.errMsg) errTitle = res.errMsg.indexOf('out') > -1 ? '对不起，您的手机网络正常吗？' : '请求失败'
        if (errTitle == '对不起，您的手机网络正常吗？') {
          if (!Config.dev) {
            fundebug.notify(errTitle, url, {
              metaData: {
                name: errTitle,
                errMsg: res.errMsg,
                url: url,
                response: res
              }
            })
          }
        }
        if (!noToast) {
          utils.showToast(errTitle)
        }

      })
  })
}

function configRequest(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "GET"
    }).then((data) => {
      console.log('config:', url, data)
      resolve(data)
    })
  }).then(data => {
    return data
  })
}

function put(url, data, third, noToast) {
  return request('PUT', url, data, third, noToast)
}

function post(url, data, third, token, noToast) {
  return request('POST', url, data, third, token, noToast)
}

function get(url, data, third, noToken, noToast) {
  return request('GET', url, data, third, noToken, noToast)
}

function timeOverRequest(duration, request) {
  // console.log('timeOverRequest start')
  // console.time('timeOverRequest')
  return new Promise(((resolve, reject) => {
    var done = false
    setTimeout(() => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest 超时,catch err')
        done = true
        reject('time over')
      }
    }, duration)
    request().then(data => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest request success')
        done = true
        resolve(data)
      }
    }).catch(err => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest request fail')
        done = true
        reject(err)
      }
    })
  }))
}

const Request = {
  request: request,
  config: configRequest,
  post: post,
  get: get,
  put: put,
  timeOverRequest: timeOverRequest,
  CODE: CODE
}
export default Request