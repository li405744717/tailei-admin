/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {} from '../banner/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import moment from 'moment';
import systemAPI from '@/commAction/system'
import utils from "../../../common/utils";

export const ROLES = [
  {title: '全部', key: 'all'},
  {title: '房屋顾问', key: 'consultant'},
  {title: '后台管理', key: 'admin'},
  {title: '后台运营', key: 'operator'},
  {title: '维修人员', key: 'worker'},
]

let sections = [
  {
    title: '编号'
  },
  {
    title: '角色'
  },
  {
    title: '姓名'
  },
  {
    title: '手机号'
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
      status: undefined,
      role: undefined,
      startRange: null,
      endRange: null,
      name: null,
      phone: null
    },
    editItem: null,
    showEdit: false,
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
    var param = {
      name: filter.name,
      role: filter.role === 'all' ? undefined : filter.role
    }

    var contents = []
    systemAPI.account_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.role}]},
          {data: [{text: item.name}]},
          {data: [{text: item.phone}]},
          {data: [{text: item.status}]},
          {id: item.id, status: item.status === '正常' ? 'on' : 'off'}
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


  add() {
    wx.navigateTo({
      page: this,
      url: '/home/set/account/add'
    })
  }


  setShowFilter(flag) {
    this.props.setShowFlag({flag})
  }

  edit(id) {
    wx.navigateTo({
      page: this,
      url: `/home/set/account/edit/${id}`
    })
  }

  handleSizeChange = (e) => {
    var {filter} = this.state
    filter.status = e.target.value
    this.setState({filter});
  }

  onChangeDate(date) {
    var {filter} = this.state
    filter.startRange = moment(date[0])
    filter.endRange = moment(date[1])
    this.setState({filter})
  }

  onChangeSelect = (value) => {
    var {filter} = this.state
    filter.role = value
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
      url: `/home/suggest/list/${id}`
    })
  }

  editCancel = (e) => {
    console.log(e)
    this.setShowEdit(false)
  }
  editOK = (e) => {
    console.log(this.refs.houseEdit.state.form)
    this.setShowEdit(false)
  }

  setShowEdit(flag) {
    this.setState({
      showEdit: flag
    })
  }

  search() {
    this.initColumns()
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
      api = (param) => systemAPI.account_delete(param)
    } else {
      api = (param) => systemAPI.account_edit(param)
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
    ...state.suggestList
  }
}


export default connect(mapStateToProps, {})(List)

