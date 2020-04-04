import request from './../common/request'
import Config from './../common/config'

var KbURL = Config.KBURL
var AnalystURL = Config.ANALYSTURL
var ConfigURL = Config.CONFIGURL
var AgentURL = Config.AGENTURL
export default {
  fund_search(search) {
    let url = AnalystURL + `product/portfolio_search/`
    return request.get(url, {search}, false, true).then(data => data.data)
  },
  comb_list(page, ordering) {
    console.log(page)
    let url = AgentURL + `portfolio/portfolio/portfolio_list/`
    if (page) return request.get(url, ordering ? {page, ordering} : {page}).then(data => data)
    return request.get(url).then(data => data)
  },
  comb_analysis(list_str) {
    let url = AgentURL + `portfolio/portfolio/composition_analysis/`
    return request.post(url, {fund_list: list_str}).then(data => data)
  },
  favor_fund_list() {
    let url = AgentURL + `portfolio/portfolio/optionfund_list/`
    return request.get(url, {}).then(data =>
      data.data
    )
  },
  get_favor_list_data(params, ordering, page) {
    let url = AgentURL + `portfolio/portfolio/pc_optional_fund/?page_size=15&page=${page}`
    if (ordering) url += `&ordering=${ordering}`
    // console.log(url, params)
    return request.post(url, params || {}).then(data => {
      return data
    })
  },
  get_favor_list_data_mobile(params, ordering, page) {
    let url = AgentURL + `portfolio/portfolio/m_optional_fund/?page_size=15&page=${page}`
    if (ordering) url += `&ordering=${ordering}`
    // console.log(url, params)
    return request.post(url, params || {}).then(data => {
      return data
    })
  },
  get_combination_detail(id) {
    let url = AgentURL + `portfolio/portfolio/portfolio_detail/`
    return request.get(url, {id}).then(data =>
      data.data
    )
  },
  portfolio_home(id) {
    let url = AgentURL + `portfolio/portfolio/portfolio_home/?portfolio_id=${id}`
    return request.get(url, {}).then(data =>
      data
    )
  },
  get_cards(id, key) {
    let url = AgentURL + `portfolio/portfolio/${key}/?portfolio_id=${id}`
    return request.get(url, {}, false, true).then(data =>
      data
    )
  },
  cal_task(id, task_type, level, year, limit, date) {  //获取taskid，图表
    let url = AgentURL + `portfolio/portfolio/cal_task/`
    if (level) {
      let v_min = limit[0]
      let v_max = limit[1]
      return request.get(url, {portfolio_id: id, task_type, level, year, v_min, v_max, date}).then(data => data.task_id)
    }
    else
      return request.get(url, {portfolio_id: id, task_type}).then(data => data.task_id)
  },
  get_data_by_recommand_rate(id, level, year) {  //点击推荐比例获得的数据
    let url = AgentURL + `portfolio/portfolio/cal_recommend_ratio/`
    return request.get(url, {portfolio_id: id, level, year}).then(data => data.data)
  },
  get_data_by_self_rate(id) {  //自己设置比例获得的数据
    let url = AgentURL + `portfolio/portfolio/init_recommend_ratio/`
    return request.get(url, {portfolio_id: id}).then(data => data.data)
  },
  get_pk_result(ids) {
    let url = AgentURL + `portfolio/portfolio/comparison/?portfolio_ids=${ids}`
    return request.get(url, {}, false, true).then(data =>
      data
    )
  },
  cal_task2(id) {  //获取taskid,详情
    let url = AgentURL + `portfolio/portfolio/cal_portfolio_data/`
    return request.get(url, {portfolio_id: id}).then(data => data.task_id)
  },
  task_result(id) {  //根据taskid，轮询该接口，获得status
    let url = AgentURL + `portfolio/portfolio/task_status/`
    return request.get(url, {task_id: id}).then(data => data)
  },
  get_r_up_down() {
    let url = AgentURL + `portfolio/portfolio/r_up_down/`
    return request.get(url, {}).then(data => data)
  },
  get_profit_chart(params) {
    let url = AgentURL + `portfolio/portfolio/profit_chart/`
    return request.get(url, params).then(data => data)
  },
  get_drawdown_chart(params) {
    let url = AgentURL + `portfolio/portfolio/drawdown_chart/`
    return request.get(url, params).then(data => data)
  },
  get_base_option() {
    let url = AnalystURL + `product/portfolio/benchmark/options`
    return request.get(url, {}, false, true).then(data => data)
  },
  get_auto_rate(year_profit) {
    let url = AnalystURL + `product/portfolio/benchmark/smart?year_profit=${year_profit}`
    return request.get(url, {}, false, true).then(data => data)
  },
  set_base(params) {
    let url = AnalystURL + `product/portfolio/benchmark/set`
    return request.post(url, params, false, true).then(data => data)
  },
  save_benchmark(params) {
    let url = AgentURL + `portfolio/portfolio/benchmark/`
    return request.post(url, params, false, true).then(data => data)
  },

  // 调仓所用到的接口
  get_portfolio_adjust(id) {
    let url = AgentURL + `portfolio/portfolio/portfolio_adjust/`
    return request.get(url, {id}, false, true).then(data => data)
  },

  comb_delete_or_create(operation, list, options) {
    let url = AgentURL + `portfolio/portfolio/create_portfolio/`
    var data = {}
    if (operation === 'DELETE')
      data = {action: operation, portfolio_list: list}
    else if (operation === 'CHANGE')
      data = {action: operation, hold_record: list, ...options}
    else {
      data = {action: operation, fund: list, ...options}
      return request.post(url, data).then(data => data)
    }
    return request.post(url, data).then(data => data)
  },
  set_favor_index(params) {
    let url = AgentURL + `portfolio/portfolio/favor_indicator/`
    return request.post(url, params).then(data => data)
  }
}