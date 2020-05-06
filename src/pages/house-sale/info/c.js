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
import moment from 'moment';
import saleAPI from '@/commAction/sale'
import utils from "../../../common/utils";

export const HOUSE_TYPES = [
  {title: '全部类型', key: 'all'},
  {title: '住宅/居民楼', key: 'house'},
  {title: '办公楼/写字楼/商铺', key: 'work'},
  {title: '停车位', key: 'park'}
]

export const HOUSE_STATUS = [
  {title: '待审核', key: 'uncensored'},
  {title: '已通过', key: 'published'},
  {title: '未通过', key: 'rejected'},
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
    title: '房源类型'
  },
  {
    title: '发布时间'
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
      status: 'all',
      startRange: null,
      endRange: null,
      name: null,
      phone: null
    },
    editItem: null,
    showEdit: false
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
  }

  initColumns() {
    let {filter} = this.state
    console.log('filter', filter)

    var timeRange = (filter.startRange || filter.endRange) ? ((filter.startRange || '').format('YYYY-MM-DD') + '::' + (filter.endRange || '').format('YYYY-MM-DD')) : null
    var param = {
      pubilsher: filter.name,
      contact: filter.phone,
      rent_type: filter.house_type === 'all' ? undefined : filter.house_type,
      consultant: filter.consultant,
      status: filter.status === 'all' ? undefined : filter.status,
      // publish_time: timeRange
    }

    var contents = []
    saleAPI.sale_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.publisher}, {text: item.contact}]},
          {data: [{text: item.address}, {text: '--'}]},
          {data: [{text: item.rent_type}]},
          {data: [{text: item.publish_time}]},
          {data: [{text: item.status}]},
          {status: item.status === '已发布' ? 'published' : item.status === '待审核' ? 'uncensored' : 'rejected', id: item.id}
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

  edit(id) {
    var {table} = this.state
    var editItem = table.contents.find(item => {
      return item[6].id === id
    })
    this.setState({
      showEdit: true,
      editItem
    })
  }

  handleSizeChange = (e) => {
    var {filter} = this.state
    filter.status = e.target.value
    this.setState({filter}, () => {
      this.search()
    });
  }

  onChangeDate(date) {
    var {filter} = this.state
    filter.startRange = moment(date[0])
    filter.endRange = moment(date[1])
    this.setState({filter})
  }

  onChangeSelect = (value) => {
    var {filter} = this.state
    filter.house_type = value
    this.setState({filter});
  }

  onChangeInput(e, key) {
    var {filter} = this.state
    filter[key] = e.target.value
    this.setState({filter});
  }


  goInfo(id) {
    wx.navigateTo({
      page: this,
      url: `/home/house-sale/info/${id}`
    })
  }

  editCancel = (e) => {
    console.log(e)
    this.setShowEdit(false)
  }
  editOK = (e) => {
    console.log(this.refs.houseEdit.state.form)
    var form = this.refs.houseEdit.state.form
    this.setShowEdit(false)
    this.editItems(this.state.editItem[6].id, ['status', 'cause'], [form.status, form.cause])
  }

  setShowEdit(flag) {
    this.setState({
      showEdit: flag
    })
  }

  search() {
    this.initColumns()
  }

  reset() {
    this.setState({
      filter: {
        status: undefined,
        startRange: null,
        endRange: null,
        name: null,
        phone: null
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
    var paras = {}
    if (Array.isArray(key)) {
      for (var index in key) {
        var _key = key[index]
        paras[_key] = value[index]
      }
    } else {
      paras[key] = value
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
    ...state.houseSaleInfo
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

