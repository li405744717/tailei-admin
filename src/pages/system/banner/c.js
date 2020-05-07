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
import systemAPI from '@/commAction/system'
import utils from "../../../common/utils";

export const BANNER_STATUS = [
  {title: '全部', key: 'all'},
  {title: '上架中', key: 'up'},
  {title: '下架中', key: 'down'},
]

export const BANNER_TYPES = [
  {title: '全部', key: 'all'},
  {title: '顶部', key: 'top'},
  {title: '底部', key: 'bottom'},
]

let sections = [
  {
    title: '编号'
  },
  {
    title: '标题'
  },
  {
    title: '位置'
  },
  {
    title: '权重'
  },
  {
    title: '状态'
  },
  {
    title: '发布时间'
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
      status: 'all',
      startRange: null,
      endRange: null,
      title: null,
      position: undefined
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
    console.log('did')
    this.onLoad(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps, nexContext) {
    console.log('will')
    this.onLoad(nextProps)
    // utils.reSetPropsState(this, nextProps)
  }

  onLoad(props) {
    this.initColumns()
  }

  initColumns(page) {
    let {filter} = this.state
    console.log('filter', filter)
    var param = {
      title: filter.title,
      position: filter.position === 'all' ? undefined : filter.position,
      status: filter.status === 'all' ? undefined : filter.status,
      page
    }

    var contents = []
    systemAPI.banner_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.title}]},
          {data: [{text: item.position}]},
          {data: [{text: item.weight}]},
          {data: [{text: item.status}]},
          {data: [{text: item.create_time}]},
          {id: item.id, status: item.status === '上架中' ? 'up' : 'down'}
        ])
      }
      let {table} = this.state
      table.contents = contents
      table.count = data.count
      this.setState({
        table,
        current_page:page
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
      url: '/home/set/banner/add'
    })
  }


  setShowFilter(flag) {
    this.props.setShowFlag({flag})
  }

  edit(id) {
    wx.navigateTo({
      page: this,
      url: `/home/set/banner/edit/${id}`
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
    filter.position = value
    this.setState({filter});
  }

  onChangeInput(e, key) {
    var {filter} = this.state
    filter[key] = e.target.value === '' ? null : e.target.value
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

  reset() {
    this.setState({
      filter: {
        status: 'all',
        startRange: null,
        endRange: null,
        title: null,
        position: undefined
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
      api = (param) => systemAPI.banner_delete(param)
    } else {
      api = (param) => systemAPI.banner_edit(param)
    }
    api(param).then(data => {
      utils.showToast('操作成功')
      this.initColumns()
    }).catch(e => {
      utils.showToast('操作失败,请重试')
    })
  }

  editItemsAll(key, value) {
    var {selectedRowKeys, table} = this.state
    var ids = selectedRowKeys.map((item, index) => {
      return table.contents[item][6].id
    })
    this.editItems(ids, key, value)
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.suggestList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

