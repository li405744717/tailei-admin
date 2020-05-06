/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setShowFlag} from './actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import saleAPI from '@/commAction/sale'
import systemAPI from '@/commAction/system'
import utils from "../../../common/utils";

export const SALE_STATUS = [
  {title: '全部', key: 'all'},
  {title: '上架中', key: 'up'},
  {title: '下架中', key: 'down'},
]

let sections = [
  {
    title: '编号'
  },
  {
    title: '联系方式'
  },
  {
    title: '地址'
  },
  {
    title: '顾问'
  },
  {
    title: '房源类型'
  },
  {
    title: '状态'
  },
  {
    title: '操作',
    renderId: 'buttons'
  }
]

class List extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',
    table: {
      sections: sections,
      contents: []

    },
    filter: {
      house_type: undefined,
      consultant: undefined,
    },
    consultants: [],
    status: 'all'
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
  }

  componentDidMount() {
    // this.props.getFilters()
    this.onLoad(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps, nexContext) {
    this.onLoad(nextProps)
    // utils.reSetPropsState(this, nextProps)
  }

  onLoad(props) {
    this.initColumns()
    this.initConsultant()
  }

  initColumns() {
    let {filter} = this.state
    console.log('filter', filter)
    var param = {
      pubilsher: filter.name,
      contact: filter.phone,
      rent_type: filter.house_type === 'all' ? undefined : filter.house_type,
      consultant: filter.consultant
    }

    var contents = []
    saleAPI.sale_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.publisher}, {text: item.contact}]},
          {data: [{text: item.address}, {text: '--'}]},
          {data: [{text: '顾问'}, {text: '13022229999'}]},
          {data: [{text: item.rent_type}]},
          {data: [{text: item.status}]},
          {status: item.status === '已发布' ? 'up' : 'down'}
        ])
      }
      let {table} = this.state
      table.contents = contents
      table.count = data.count
      this.setState({
        table
      })
    })
  }

  initConsultant() {
    var param = {
      role: 'consultant'
    }
    systemAPI.account_list(param).then(data => {
      var contents = []
      for (var item of data.data) {
        contents.push({title: item.name, key: item.id})
      }
      this.setState({
        consultants: contents
      })
    })
  }

  render() {
    return renderView(this)
  }


  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  }

  cleanSelect() {
    this.setState({
      selectedRowKeys: []
    })
  }

  setShowFilter(flag) {
    this.props.setShowFlag({flag})
  }

  add() {
    wx.navigateTo({
      page: this,
      url: '/home/house-sale/list/add'
    })
  }

  handleSizeChange = (e) => {
    this.setState({status: e.target.value});
  }

  onChangeInput(e, key) {
    var {filter} = this.state
    filter[key] = e.target.value
    this.setState({filter});
  }

  onChangeSelect = (value, key) => {
    var {filter} = this.state
    filter[key] = value
    this.setState({filter});
  }

  search() {
    this.initColumns()
  }

  reset() {
    this.setState({
      filter: {
        name: null,
        phone: null,
        consultant: undefined,
        house_type: 'all'
      }
    }, () => {
      this.search()
    })
  }
  editItems(id, key, value) {
    var ids = []
    if (Array.isArray(id)) {
      ids = id
    } else {
      ids = [id]
    }
    var paras = {
      [key]: value
    }
    var param = {
      paras,
      ids
    }
    var api
    if (value === 'delete') {
      api = (param) => saleAPI.sale_delete(param)
    } else {
      api = (param) => saleAPI.sale_edit(param)
    }
    api(param).then(data => {
      utils.showToast('操作成功')
      this.initColumns()
    }).catch(e => {
      utils.showToast('操作失败,请重试')
    })
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

