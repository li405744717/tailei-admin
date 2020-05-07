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
import suggestAPI from '@/commAction/suggest'

export const HOUSE_TYPES = [
  {title: '全部类型', key: 'all'},
  {title: '住宅/居民楼', key: 'zhuzhai'},
  {title: '办公楼/写字楼/商铺', key: 'bangonglou'},
  {title: '停车位', key: 'car'}
]

export const HOUSE_STATUS = [
  {title: '待审核', key: 'waiting'},
  {title: '已通过', key: 'success'},
  {title: '未通过', key: 'fail'},
]

let sections = [
  {
    title: '编号'
  },
  {
    title: '姓名'
  },
  {
    title: '电话'
  },
  {
    title: '城市'
  },
  {
    title: '小区'
  },
  {
    title: '房屋'
  },
  {
    title: '反馈时间'
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
      apartment: undefined,
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

  initColumns(page) {
    let {filter} = this.state
    console.log('filter', filter)
    var param = {
      name: filter.name,
      contact: filter.phone,
      page
    }

    var contents = []
    suggestAPI.suggest_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.name}]},
          {data: [{text: item.contact}]},
          {data: [{text: item.city}]},
          {data: [{text: item.court}]},
          {data: [{text: item.house}]},
          {data: [{text: item.create_time}]},
          {id: item.id}
        ])
      }
      let {table} = this.state
      table.contents = contents
      table.count = data.count
      this.setState({
        table,
        current_page: page
      })
    })
  }

  initCourtList() {

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
        apartment: undefined,
        startRange: null,
        endRange: null,
        name: null,
        phone: null,
      }
    }, () => {
      this.search()
    })
  }

}


const mapStateToProps = (state) => {
  return {
    ...state.suggestList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

