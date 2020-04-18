/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {} from '../list/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import moment from 'moment';


let sections = [
  {
    title: '编号'
  },
  {
    title: '名称'
  },
  {
    title: '权重'
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
        {data: [{text: '1'}]},
        {id: 1}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '3'}]},
        {id: 2}
      ],
      [
        {data: [{text: '3'}]},
        {data: [{text: '官致'}]},
        {data: [{text: '2'}]},
        {id: 3}
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


  add() {
    wx.navigateTo({
      page: this,
      url: '/home/set/right/role/add'
    })
  }


  setShowFilter(flag) {
    this.props.setShowFlag({flag})
  }

  edit(id) {
    var {table} = this.state
    var editItem = table.contents.find(item => {
      return item[3].id === id
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
}


const mapStateToProps = (state) => {
  return {
    ...state.suggestList
  }
}


export default connect(mapStateToProps, {})(List)

