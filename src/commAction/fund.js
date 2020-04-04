import request from './../common/request'
import Config from './../common/config'
import $ from 'jquery'
import store from '@/Store'

var KbURL = Config.KBURL
var AnalystURL = Config.ANALYSTURL
var ConfigURL = Config.CONFIGURL
var AgentURL = Config.AGENTURL
export default {
  get_cards(code, id) {
    let url = AgentURL + `fund/fund/${id}/`
    return request.get(url, {code}, false, true).then(data => {
      return data
    })
  },
  get_basic(code) {
    let url = AgentURL + `fund/fund/pc_home/`
    return request.get(url, {code}, false, false).then(data => {
      return data
    })
  },
  get_fund_history_manager(code) {
    let url = AgentURL + `fund/fund/fund_history_manager/`
    return request.get(url, {code}, false, true).then(data => {
      return data
    })
  },
  add_delete_favor(param) {
    let url = AgentURL + `portfolio/portfolio/create_optionfund/`
    return request.get(url, param, false, false).then(data => {
      return data
    })
  },
  add_delete_favor_list(params) {
    let url = AgentURL + `portfolio/portfolio/create_optionfund/`
    return request.post(url, params, false, false).then(data => {
      return data
    })
  },
  get_fund_profit_chart(params) {
    let url = AnalystURL + `product/consultant/chart/fund_profit/`
    return request.get(url, params, false, true).then(data => {
      return data
    })
  },
  get_favor_index() {
    let url = AgentURL + `portfolio/portfolio/indicator_choice/`
    return request.get(url, {}).then(data => data)
  },
  get_favor_list(params) {
    let url = AgentURL + `portfolio/portfolio/judge_favor/`
    return request.post(url, params, false, false).then(data => {
      return data
    }).catch(err => {
      return {}
    })
  },
  export_all_fund(name) {
    // let url = AgentURL + `portfolio/portfolio/down_file/`

    var xhr = new XMLHttpRequest();
    var str = AgentURL + `portfolio/portfolio/down_file/`;
    xhr.open('GET', str, true);    //也可以使用POST方式，根据接口
    try {
      let user = store.getState().user
      var token = user.token
    } catch (e) {
      var token = null
    }
    var he
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", 'Token ' + token);
    xhr.responseType = "blob";   //返回类型blob
    xhr.onload = function () {
      //定义请求完成的处理函数
      if (this.status === 200) {
        var blob = this.response;
        if (blob.size > 0) {
          var reader = new FileReader();
          reader.readAsDataURL(blob);   // 转换为base64，可以直接放入a标签href
          reader.onload = function (e) {
            // 转换完成，创建一个a标签用于下载
            var a = document.createElement('a');
            a.download = name;
            a.href = e.target.result;
            a.click();
          }
        } else {
        }
      }
    };
    xhr.send();

    // return request.get(url, {}).then(data => {
    //   return data
    // }).catch(err => {
    //   return {}
    // })
  }
}