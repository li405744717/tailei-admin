/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setShowFlag} from '../list/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import moment from 'moment';
import {Input, Select} from "antd";
import filters from '@/common/filters'

const {Option} = Select;

let sections = [
  {
    title: '编号'
  },
  {
    title: '小区'
  },
  {
    title: '物业费单价(元)'
  },
  {
    title: '操作',
    renderId: 'buttons'
  }
]

export class PaySetEdit extends React.Component {
  static defaultProps = {
    apartment: undefined,
    price: undefined
  }
  static propTypes = {
    apartment: PropTypes.string,
    price: PropTypes.string
  }
  state = {
    form: {
      apartment: '',
      price: undefined
    }
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {apartment, price} = props
    var {form} = this.state
    form.apartment = apartment
    form.price = price
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
        <span className='black'>小区：{form.apartment}</span>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>物业费单价：</span>
        <Input value={form.price} onChange={e => this.onChangeInput(e, 'price')} className='house_sale_input_view'
               placeholder='请输入物业费单价'/>
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
    selectedRowKeys: []
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
        {data: [{text: 'XX花园'}]},
        {data: [{text: '3.00'}]},
        {id: 1}
      ],
      [
        {data: [{text: '2'}]},
        {data: [{text: 'XX花园'}]},
        {data: [{text: '3.00'}]},
        {id: 2}
      ],
      [
        {data: [{text: '3'}]},
        {data: [{text: 'XX花园'}]},
        {data: [{text: '1.35'}]},
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
      return item[3].id === id
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
    console.log(this.refs.paySetEdit.state.form)
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
    ...state.payList
  }
}


export default connect(mapStateToProps, {setShowFlag})(List)

