import request from './../common/request'
import Config from './../common/config'

var KbURL = Config.KBURL
var AnalystURL = Config.ANALYSTURL
var ConfigURL = Config.CONFIGURL
export default {
  get_filters(params) {
    let url = AnalystURL + 'product/fund/filter/options/'
    return request.get(url, params || {}, false, true).then(data => {
      return data
    })
  },
  get_auto_filters(params) {
    let url = AnalystURL + 'product/fund/filter/options/shortcuts/'
    return request.get(url, params || {}, false, true).then(data => {
      return data
    })
  },
  get_list_data(params, ordering, page) {
    let url = AnalystURL + `product/fund/filter/?page_size=15&page=${page}`
    if (ordering) url += `&ordering=${ordering}`
    // console.log(url, params)
    return request.post(url, params || {}, false, true).then(data => {
      return data
    }).catch(err => {
      return {}
    })
  }
}