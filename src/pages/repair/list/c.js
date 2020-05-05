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
import repairAPI from '@/commAction/repair'

export const REPAIR_MAN = [
  {title: 'yyy-134***0000', key: 1},
  {title: 'zzz-134***0000', key: 2},
  {title: 'ccc-134***0000', key: 3},
  {title: 'xxx-134***0000', key: 4}
]

export const REPAIR_STATUS = [
  {title: '待分配', key: 'distribute'},
  {title: '待维修', key: 'repairing'},
  {title: '已维修', key: 'complete'},
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
    title: '时间'
  },
  {
    title: '维修状态'
  },
  {
    title: '支付状态'
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
      repair_man_id: undefined
    },
    editItem: null,
    showEdit: false,
    uploadToast: false,

    repair_man_list: []
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
    this.initRepairManList()
  }

  initRepairManList() {
    repairAPI.repair_man_list().then(data => {
      this.setState({
        repair_man_list: data.data.map(item => {
          return {title: item.name + '-' + item.phone, key: item.id}
        })
      })
    })
  }

  initColumns() {

    let {filter} = this.state
    console.log('filter', filter)
    let status_item = REPAIR_STATUS.find(item => {
      return item.key === filter.status
    })
    var param = {
      contact: filter.phone,
    }
    if (status_item) {
      param.repair_status = status_item.title
    }

    var contents = []
    repairAPI.repair_list(param).then(data => {
      for (var item of data.data) {
        contents.push([
          {data: [{text: '1'}]},
          {data: [{text: item.name}, {text: item.contact}]},
          {data: [{text: item.address}, {text: '-'}]},
          {data: [{text: item.reserve_time || '--'}, {text: item.order_time || '--'}]},
          {
            data: [{text: item.repair_status}, {text: item.worker}],
            status: item.repair_status === '待处理' ? 'distribute' : 'repairing',
            repair_man_id: 1
          },
          {data: [{text: item.charge_status}, {text: item.repair_free || '--'}]},
          {id: 1}
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
    filter.repair_man_id = value
    this.setState({filter}, () => {
      this.search()
    });
  }

  onChangeInput(e, key) {
    var {filter} = this.state
    filter[key] = e.target.value
    this.setState({filter});
  }


  goInfo(id) {
    wx.navigateTo({
      page: this,
      url: `/home/repair/list/${id}`
    })
  }

  editCancel = (e) => {
    console.log(e)
    this.setShowEdit(false)
  }
  editOK = (e) => {
    console.log(this.refs.houseEdit.state.form)
    this.setShowEdit(false)
    var param = {
      "ids": [
        1
      ],
      "action": "UPDATE",
      "paras": {
        "contact": "18321337553"
      }
    }
    repairAPI.repair_update().then(data => {

    })
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

  search() {
    this.initColumns()
  }

  reset() {
    this.setState({
      filter: {
        status: 'all',
        repair_man_id: undefined
      }
    }, () => {
      this.search()
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

