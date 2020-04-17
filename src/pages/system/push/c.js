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
import {Input} from 'antd'

const {TextArea} = Input;

let sections = [
  {
    title: '编号'
  },
  {
    title: '标题'
  },
  {
    title: '内容'
  },
  {
    title: '操作',
    renderId: 'buttons'
  }
]

export class SystemPushEdit extends React.Component {
  static defaultProps = {
    content: undefined
  }
  static propTypes = {
    content: PropTypes.string
  }
  state = {
    form: {
      content: null,
    }
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {content} = props
    var {form} = this.state
    form.content = content
    this.setState({
      form
    })
  }

  onChangeInput(e, key) {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  render() {
    const {form} = this.state
    return <div className='flex_column'>
      <div className='flex_row align_center'>
        <TextArea value={form.content} onChange={e => this.onChangeInput(e, 'content')}
                  className='house_sale_input_area_view'
                  placeholder='请输入内容'/>
      </div>

    </div>
  }
}

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
        {data: [{text: '保修人员将会在2小时内上门维修,请保持电话畅通'}]},
        {id: 1}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '您保修的订单已完成'}]},
        {id: 2}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '您有一项物业费需缴费,点击完成缴费呗'}]},
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
      url: '/home/set/banner/add'
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
    console.log(this.refs.pushEdit.state.form)
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

