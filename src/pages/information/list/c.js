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

export const INFORMATION_TYPES = [
  {title: 'yyy-134***0000', key: '1'},
  {title: 'zzz-134***0000', key: '2'},
  {title: 'ccc-134***0000', key: '3'},
  {title: 'xxx-134***0000', key: '4'}
]

export const INFORMATION_STATUS = [
  {title: '全部', key: 'all'},
  {title: '下架中', key: 'off'},
  {title: '上架中', key: 'on'},
]

let sections = [
  {
    title: '编号'
  },
  {
    title: '标题'
  },
  {
    title: '分类'
  },
  {
    title: '发布时间'
  },
  {
    title: '分享量'
  },
  {
    title: '点击量'
  },
  {
    title: '状态'
  },

  {
    title: '首页公告',
    renderId: 'switch'
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
      endRange: null
    },
    editItem: null,
    showEdit: false,
    uploadToast: false,
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
        {data: [{text: 'XXXXXXXXXXXXXXXX'}]},
        {data: [{text: '热点'}]},
        {data: [{text: '2020-04-14 16:56:33'}]},
        {data: [{text: '10'}]},
        {data: [{text: '1340'}]},
        {data: [{text: '下架中'}]},
        {home: true, status: 'off'},
        {id: 1, status: 'off'}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: 'XXXXXXXXXXXXXXXX'}]},
        {data: [{text: '热点'}]},
        {data: [{text: '2020-04-14 16:56:33'}]},
        {data: [{text: '10'}]},
        {data: [{text: '1340'}]},
        {data: [{text: '下架中'}]},
        {home: false, status: 'off'},
        {id: 2, status: 'off'}
      ],
      [
        {data: [{text: '3'}]},
        {data: [{text: 'XXXXXXXXXXXXXXXX'}]},
        {data: [{text: '热点'}]},
        {data: [{text: '2020-04-14 16:56:33'}]},
        {data: [{text: '10'}]},
        {data: [{text: '1340'}]},
        {data: [{text: '上架中'}]},
        {home: true, status: 'on'},
        {id: 3, status: 'on'}
      ],
      [
        {data: [{text: '4'}]},
        {data: [{text: 'XXXXXXXXXXXXXXXX'}]},
        {data: [{text: '热点'}]},
        {data: [{text: '2020-04-14 16:56:33'}]},
        {data: [{text: '10'}]},
        {data: [{text: '1340'}]},
        {data: [{text: '上架中'}]},
        {home: false, status: 'on'},
        {id: 4, status: 'on'}
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

  edit(id) {
    wx.navigateTo({
      page: this,
      url: `/home/information/list/edit/${id}`
    })
  }

  add() {
    wx.navigateTo({
      page: this,
      url: `/home/information/list/add`
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

  setUploadToast(flag) {
    this.setState({
      uploadToast: flag
    })
  }

  uploadOK = (e) => {
    console.log(this.refs.houseUpload.fundList)
    this.setUploadToast(false)
  }

  delete() {

  }

  goInfo() {

  }

  onChangeSwitch(e, index) {
    console.log(e, index)
  }
}


const
  mapStateToProps = (state) => {
    return {
      ...state.repairList
    }
  }


export default connect(mapStateToProps, {setShowFlag})

(
  List
)

