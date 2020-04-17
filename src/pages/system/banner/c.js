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

export const BANNER_STATUS = [
  {title: '全部', key: 'all'},
  {title: '上架中', key: 'on'},
  {title: '下架中', key: 'off'},
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
      status: undefined,
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

    var contents = [
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '顶部'}]},
        {data: [{text: '1'}]},
        {data: [{text: '下架中'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {id: 1, status: 'off'}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '顶部'}]},
        {data: [{text: '1'}]},
        {data: [{text: '上架中'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {id: 2, status: 'on'}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '顶部'}]},
        {data: [{text: '1'}]},
        {data: [{text: '下架中'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {id: 3, status: 'off'}
      ]
    ]
    contents = []
    let {table} = this.state
    table.contents = contents
    this.setState({
      table
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
}


const mapStateToProps = (state) => {
  return {
    ...state.suggestList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

