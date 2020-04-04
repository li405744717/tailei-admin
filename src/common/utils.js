import {GData as app} from "./global_data";
import wx from './wx'
import request from './../common/request'
import Config from './../common/config'
import _Object from "lodash/object";
import $ from 'jquery'

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  var year = this.getFullYear();
  var yearstr = year + '';
  yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
const utils = {
  toFixed(inputValue, fixed, negative) {
    if (negative) {
      return Math.abs(parseFloat(inputValue + '')).toFixed(fixed + 1).slice(0, -1)
    } else {
      if (fixed == 0) {
        return parseFloat(inputValue + '').toFixed(fixed + 1).slice(0, -2)
      } else {
        return parseFloat(inputValue + '').toFixed(fixed + 1).slice(0, -1)
      }

    }

  },
  computetDate(time1, time2) {
    var da = new Date()
    var time1 = time1.getTime();
    var time2 = time2.getTime();
    console.log(time1, time2, time1 - time2)
    return (time1 - time2) > 0
  },
  sendRequest() {
    for (var record of app.globalData.requestList) {
      for (var key in record) {
        if (!record[key]) record[key] = ''
      }
    }
    var _param = {
      data: app.globalData.requestList,
      logstore: 'request'
    }
    // console.log('log request', _param)
    wx.request({
      url: Config.KBURL + 'zhiyan/event/log/',
      method: 'POST',
      data: _param
    }).catch(e => {

    })
    app.globalData.requestList = []
  },
  sendRecord() {
    for (var record of app.globalData.recordList) {
      for (var key in record) {
        if (!record[key]) record[key] = ''
      }
    }
    var _param = {
      data: app.globalData.recordList,
      logstore: 'dot'
    }
    // console.log('log request', _param)
    wx.request({
      url: Config.KBURL + 'zhiyan/event/log/',
      method: 'POST',
      data: _param,
    }).catch(e => {

    })
    app.globalData.recordList = []
  },
  record(key, appid, path) {
    appid = appid || ''
    path = path || ''
    // TO DO 当前页面路径
    var currentPage = {pp: ''}
    var sendData = {
      openId: app.globalData.user.userInfo.openId,
      device_type: app.globalData.isIOS ? 'ios' : 'android',
      product_source: Config.PRODUCT_SOURCE,
      product_id: Config.PRODUCT_ID,
      channel_source: app.globalData.channel_source,
      version: Config.UATVERSION,
      event_name: key + '-' + path,
      timestamp: (new Date()).getTime() + '',
      entry_time: app.globalData.entry_time,
      present_url: currentPage.pp,
    }
    console.log('===================record===================', sendData.event_name)
    app.globalData.recordList.push(sendData)
    if (app.globalData.recordList.length > 19) {
      console.log('===================record 20===================', app.globalData.recordList)
      this.sendRecord()
    }
  },
  pushAndFind(textArr, _strArr, key, j) {
    let len = textArr.length
    _strArr.push(key)
    if (j < len - 1) {
      key = key + textArr[++j]
      this.pushAndFind(textArr, _strArr, key, j)
    }
  },
  getKeyStr(textArr) {
    let len = textArr.length
    let strArr = []
    for (let i = 0; i < len; i++) {
      let key = textArr[i]
      this.pushAndFind(textArr, strArr, textArr[i], i)
    }
    return strArr
  },
  containArr(key, arr) {
    if (arr && arr.length > 0) {
      for (let str of arr) {
        if (str === key) {
          return true
        }
      }
    } else {
      return false
    }
  },
  openNewsAnnouncement(news_id) {
    if (news_id && news_id.indexOf('http') > -1) {
      news_id = news_id.replace('http:', 'https:')
      if (news_id.indexOf('pdf') > -1 || news_id.indexOf('PDF') > -1) {
        wx.showLoading({
          title: "加载中..."
        })
        wx.downloadFile({
          url: news_id,
          success: (res) => {
            console.log(res)
            var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
            wx.hideLoading()
            wx.openDocument({
              filePath: Path,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          },
          fail: function (res) {
            wx.hideLoading()
            console.log(res)
          }
        })
      } else {
        wx.navigateTo({
          url: "/pages/webview/webview?url=" + encodeURIComponent(news_id)
        })
      }
    } else {
      wx.navigateTo({
        url: news_id
      })
    }
  },
  showToast(message, icon, duration) {
    wx.showToast({
      title: message || '',
      icon: icon || 'none',
      duration: duration || 2000
    })
  },
  setPropsState(page, callback) {
    var _props = _Object.omit(page.props, ['children'])
    page.setState({
      ..._props
    }, () => {
      if (callback) callback()
    })
  },
  reSetPropsState(page, newVal, callback) {
    var _old_props = _Object.omit(page.props, ['children'])
    var _props = _Object.omit(newVal, ['children'])
    if (JSON.stringify(_old_props) !== JSON.stringify(_props)) {
      page.setState({
        ..._props
      }, () => {
        if (callback) callback()
      })
    }
  },
  triggerEvent(key, param, param2, page) {
    if (page.props && page.props.bindAction && page.props.bindAction[key]) {
      var e = {
        detail: param
      }
      page.props.bindAction[key](e)
    }
  },
  lockPage() {
    document.getElementsByTagName("body")[0].style.overflow = 'hidden';
    document.getElementsByTagName("body")[0].style.position = 'fixed';
  },
  releasePage() {
    document.getElementsByTagName("body")[0].style.overflow = 'auto';
    document.getElementsByTagName("body")[0].style.position = 'relative';
  },

  getRange(props) {
    const {content, contentId} = props
    const options = content.options || []
    const contents = content.contents || []
    let startRange, endRange, ranges, rangeIndex
    //  ||
    if (contentId === 'fundRunTime' || contentId === 'fundScale' || contentId === 'fundRunRate') {
      startRange = options[options.length - 1].startRange
      endRange = options[options.length - 1].endRange
    }


    if (contentId === 'fundProfit' || contentId === 'fundVolatility' || contentId === 'fundMaxWithdraw' || contentId === 'fundSharpeRatio') {
      startRange = {}
      endRange = {}
      for (var childContent of contents) {
        var index = childContent.options.findIndex(item => {
          return item.selected
        })
        if (childContent.options[index]) {
          if (typeof  childContent.options[index].startRange === "string" || typeof  childContent.options[index].startRange === "number") {
            startRange[childContent.id] = childContent.options[index].startRange
          } else {
            startRange[childContent.id] = ''
          }

          if (typeof  childContent.options[index].endRange === "string" || typeof  childContent.options[index].endRange === "number") {
            endRange[childContent.id] = childContent.options[index].endRange
          } else {
            endRange[childContent.id] = ''
          }

        }
      }
    }
    // console.log('startRange, endRange, ranges, rangeIndex', startRange, endRange, ranges, rangeIndex)
    return {
      startRange, endRange, ranges, rangeIndex
    }
  },
  addScrollPage(onBottom, onScroll, pageId) {
    // console.log(window, window.addEventListener)
    onReachBottom = (event) => {
      var page = $("#" + pageId)
      var scrollTop = page.scrollTop();
      var scrollHeight = page[0].scrollHeight;
      var offsetHeight = page[0].offsetHeight;
      // console.log("navTop", scrollTop, scrollHeight, offsetHeight)

      if (onScroll) onScroll(scrollTop)
      //ios documentElement.scrollTop ,android body.scrollTop
      if (scrollTop + offsetHeight + 100 >= scrollHeight) {
        if (onBottom) onBottom()
        //这个位置去加载更多的数据；或者进一步判断是否有分页可以加载；
      }
    }
    console.log('pageId', pageId)
    var page = $('#' + pageId)
    page.scroll(onReachBottom);
  },
  removeScrollPage() {
    if (onReachBottom) {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', onReachBottom, false);
      } else {
        window.onscroll = null
      }
    }
  },
  get_key(_key, card) {
    var keys = {
      chart: [],
      table: [],
      explain: []
    }
    if (card.selectType) {
      for (var typeObj of card.selectType) {
        var _rangeName = typeObj[0]
        var type = typeObj[1]
        var menu = card.menus.find(item => {
          return item.rangeName === _rangeName
        })

        var rangeItem = menu.range.find(item => {
          return item.type === type
        })
        menu.selectName = rangeItem.title
        if (!rangeItem.noChart) {
          keys.chart.push(type)
        }
        if (!rangeItem.noTable) {
          keys.table.push(type)
        }
        if (!rangeItem.noExplain) {
          keys.explain.push(type)
        }
      }
      _key.chart = keys.chart.join('_')
      _key.table = keys.table.join('_')
      _key.explain = keys.explain.join('_')
    }
    return _key
  }
}
var onReachBottom
export default utils
