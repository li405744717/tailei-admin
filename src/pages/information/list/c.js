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
import informationAPI from '@/commAction/information'
import utils from "../../../common/utils";

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
      endRange: null,
      information_type: undefined
    },
    editItem: null,
    showEdit: false,
    uploadToast: false,
    informationTypes: []
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
    this.initInformationType()
  }

  initColumns(page) {

    let {filter} = this.state
    console.log('filter', filter)
    var param = {
      label: filter.information_type === 'all' ? null : filter.information_type,
      publish_time__gte: filter.startRange && filter.startRange.format('YYYY-MM-DD'),
      publish_time__lte: filter.endRange && filter.endRange.format('YYYY-MM-DD'),
      page
    }

    var contents = []
    informationAPI.information_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: item.id}]},
          {data: [{text: item.title}]},
          {data: [{text: item.label}]},
          {data: [{text: item.publish_time}]},
          {data: [{text: item.shares}]},
          {data: [{text: item.reads}]},
          {data: [{text: item.status}]},
          {home: item.main_page, status: item.status === '上架中' ? 'on' : 'off'},
          {id: item.id, status: item.status === '上架中' ? 'on' : 'off'}
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

  initInformationType() {
    informationAPI.information_type_list({}).then(data => {
      var contents = [{title: '全部', key: 'all'}]
      for (var item of data.data) {
        contents.push({title: item.name, key: item.name})
      }
      this.setState({
        informationTypes: contents
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
    filter.information_type = value
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

  search() {
    this.initColumns()
  }

  reset() {
    this.setState({
      filter: {
        status: 'all',
        startRange: null,
        endRange: null,
        information_type: undefined
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
      api = (param) => informationAPI.information_delete(param)
    } else {
      api = (param) => informationAPI.information_edit(param)
    }
    api(param).then(data => {
      utils.showToast('操作成功')
      this.initColumns()
    }).catch(e => {
      utils.showToast('操作失败,请重试')
    })
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

