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
  }

  initColumns() {

    var contents = [
      [
        {data: [{text: '1'}]},
        {data: [{text: '业主'}, {text: '联系电话'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '顾问'}, {text: '13022229999'}]},
        {data: [{text: '停车位'}]},
        {data: [{text: '下架中'}]},
        {status: 'success'}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: '业主'}, {text: '联系电话'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '顾问'}, {text: '13022229999'}]},
        {data: [{text: '停车位'}]},
        {data: [{text: '下架中'}]},
        {status: 'fail'}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: '业主'}, {text: '联系电话'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '顾问'}, {text: '13022229999'}]},
        {data: [{text: '停车位'}]},
        {data: [{text: '下架中'}]},
        {status: 'waiting'}
      ]
    ]
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
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

