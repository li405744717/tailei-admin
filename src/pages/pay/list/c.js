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
import {Input, Select} from "antd";
import filters from '@/common/filters'

const {Option} = Select;
export const PAY_SOURCE = [
  {title: '全部', key: 'all'},
  {title: '线下', key: 'downline'},
  {title: '线上', key: 'online'},
]

export const PAY_STATUS = [
  {title: '全部', key: 'all'},
  {title: '已缴费', key: 'success'},
  {title: '未缴费', key: 'fail'},
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
    title: '小区'
  },
  {
    title: '房屋'
  },
  {
    title: '缴费来源'
  },
  {
    title: '缴费状态'
  },
  {
    title: '出账时间'
  },
  {
    title: '金额(元)'
  },
  {
    title: '操作',
    renderId: 'buttons'
  }
]

export class PayListEdit extends React.Component {
  static defaultProps = {
    amount: undefined,
    status: undefined
  }
  static propTypes = {
    amount: PropTypes.string,
    status: PropTypes.string
  }
  state = {
    form: {
      amount: null,
      status: undefined
    }
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {amount, status} = props
    var {form} = this.state
    form.amount = amount
    form.status = status
    this.setState({
      form
    })
  }

  onChangeInput(e, key) {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  onChangeSelect(e, key) {
    var {form} = this.state
    form[key] = e
    this.setState({form});
  }

  render() {
    const {form} = this.state
    return <div className='flex_column'>
      <div className='flex_row align_center'>
        <span className='black'>缴费金额：</span>
        <Input value={form.amount} onChange={e => this.onChangeInput(e, 'amount')} className='house_sale_input_view'
               placeholder='请输入旧密码'/>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>缴费状态：</span>
        <Select
          showSearch
          value={form.status}
          style={{width: 240}}
          placeholder="全部"
          optionFilterProp="children"
          onChange={(e) => this.onChangeSelect(e, 'status')}
          filterOption={(input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {
            PAY_SOURCE.map((item, index) => {
              return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
            })
          }
        </Select>
      </div>
    </div>
  }
}

export class PayListEditAll extends React.Component {
  static defaultProps = {
    amount: undefined,
    count: 0
  }
  static propTypes = {
    amount: PropTypes.string,
    count: PropTypes.number
  }
  state = {
    form: {
      amount: null,
      count: 0,
      status: undefined
    }
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {amount, count} = props
    var {form} = this.state
    form.amount = amount
    form.count = count
    this.setState({
      form
    })
  }

  onChangeInput(e, key) {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  onChangeSelect(e, key) {
    var {form} = this.state
    form[key] = e
    this.setState({form});
  }

  render() {
    const {form} = this.state
    return <div className='flex_column'>
      <div className='flex_row align_center'>
        <span className=''>已选择 <span className='primary'>{form.count}</span> 项</span>
        <span className='margin_left_16'>金额共计 <span
          className='primary'>{filters.toFixed(form.amount, 2)}</span> 元</span>
      </div>
      <div className='flex_row align_center margin_top_48'>
        <span className='black'>缴费金额：</span>
        <Input value={form.amount} disabled={true} className='house_sale_input_view' placeholder='请输入旧密码'/>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>缴费状态：</span>
        <Select
          showSearch
          value={form.status}
          style={{width: 240}}
          placeholder="全部"
          optionFilterProp="children"
          onChange={(e) => this.onChangeSelect(e, 'status')}
          filterOption={(input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {
            PAY_SOURCE.map((item, index) => {
              return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
            })
          }
        </Select>
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
      phone: null,
      source: undefined
    },
    editItem: null,
    showEdit: false,
    showEditAll: false,
    totalAmount: 0,
    selectedRowKeys:[]
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
        {data: [{text: '134****1234'}]},
        {data: [{text: 'XX花园'}]},
        {data: [{text: '1单元-1号楼-302室'}]},
        {data: [{text: '线上'}]},
        {data: [{text: '已缴费'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {data: [{text: '300.00'}]},
        {id: 1, status: 'success'}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '134****1234'}]},
        {data: [{text: 'XX花园'}]},
        {data: [{text: '1单元-1号楼-302室'}]},
        {data: [{text: '-'}]},
        {data: [{text: '未交费'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {data: [{text: '300.00'}]},
        {id: 2, status: 'fail'}
      ],
      [
        {data: [{text: '1'}]},
        {data: [{text: 'XX'}]},
        {data: [{text: '134****1234'}]},
        {data: [{text: 'XX花园'}]},
        {data: [{text: '1单元-1号楼-302室'}]},
        {data: [{text: '线上'}]},
        {data: [{text: '已缴费'}]},
        {data: [{text: '2020-02-26  16:32:42'}]},
        {data: [{text: '230.90'}]},
        {id: 3, status: 'success'}
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
    var {table, totalAmount} = this.state
    totalAmount = 0
    for (var index of selectedRowKeys) {
      index = parseInt(index)
      totalAmount += parseFloat(table.contents[index][8].data[0].text)
    }
    this.setState({selectedRowKeys, totalAmount});
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
      return item[9].id === id
    })
    this.setState({
      showEdit: true,
      editItem
    })
  }

  setShowEditAll(flag) {
    this.setState({showEditAll: flag})
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
    this.setShowEdit(false)
    this.setShowEditAll(false)
  }
  editOK = (e) => {
    console.log(this.refs.payListEdit.state.form)
    this.setShowEdit(false)
  }
  editOKAll = (e) => {
    console.log(this.refs.payListEditAll.state.form)
    this.setShowEditAll(false)
  }

  setShowEdit(flag) {
    this.setState({
      showEdit: flag
    })
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.payList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

