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
      repair_man_id:undefined
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
        {data: [{text: 'XX'}, {text: '134****1234'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '报修时间:2020-04-14 16:56:33'}, {text: '预约时间:2020-04-14 16:56:33'}]},
        {data: [{text: '待分配'}, {text: '--'}], status: 'distribute', repair_man_id: 1},
        {data: [{text: '--'}, {text: '--'}]},
        {id: 1}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: 'XX'}, {text: '134****1234'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '报修时间:2020-04-14 16:56:33'}, {text: '预约时间:2020-04-14 16:56:33'}]},
        {data: [{text: '待维修'}, {text: 'XXX:199****1234'}], status: 'repairing', repair_man_id: 1},
        {data: [{text: '--'}, {text: '--'}]},
        {id: 2}
      ],
      [
        {data: [{text: '3'}]},
        {data: [{text: 'XX'}, {text: '134****1234'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '报修时间:2020-04-14 16:56:33'}, {text: '预约时间:2020-04-14 16:56:33'}]},
        {data: [{text: '已维修'}, {text: 'XXX:199****1234'}], status: 'complete', repair_man_id: 1},
        {data: [{text: '--'}, {text: '--'}]},
        {id: 3}
      ],
      [
        {data: [{text: '4'}]},
        {data: [{text: 'XX'}, {text: '134****1234'}]},
        {data: [{text: '聊城-冠县-XX街道'}, {text: 'XX花园 1单元-1号楼-302室'}]},
        {data: [{text: '报修时间:2020-04-14 16:56:33'}, {text: '预约时间:2020-04-14 16:56:33'}]},
        {data: [{text: '已维修'}, {text: 'XXX:199****1234'}], status: 'complete', repair_man_id: 1},
        {data: [{text: '已支付'}, {text: '线下支付:200'}]},
        {id: 4}
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

