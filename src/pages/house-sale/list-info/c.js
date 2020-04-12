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


class ListInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '标题', type: 'input', key: 'title'},
      {
        title: '房源类型',
        type: 'radio',
        key: 'house_type',
        options: [
          {title: '住宅/居民楼', key: 'zhuzhai'},
          {title: '办公楼/写字楼/商铺', key: 'bangonglou'},
          {title: '停车位', key: 'car'}
        ]
      },
      {title: '详细地址', type: 'input', key: 'address'},
      {title: '车位号', type: 'input', key: 'car_number', hide: true},
      {title: '房型', type: 'input', key: 'house_intro'},
      {title: '面积', type: 'input', key: 'area'},
      {title: '楼层', type: 'input', key: 'floor'},
      {title: '朝向', type: 'input', key: 'direction'},
      {title: '租金/支付方式', type: 'input', key: 'pay_way'},
      {title: '装修类型', type: 'input', key: 'renovation_way'},
      {title: '业主姓名', type: 'input', key: 'owner'},
      {title: '电话', type: 'input', key: 'phone'},
      {
        title: '顾问', type: 'select', key: 'adviser',
        options: [
          {title: '住宅/居民楼', key: 'zhuzhai'},
          {title: '办公楼/写字楼/商铺', key: 'bangonglou'},
          {title: '停车位', key: 'car'}
        ]
      },
      {title: '房屋详细图片', type: 'images', key: 'images'}
    ]
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

  }


  render() {
    return renderView(this)
  }

  setFormValue(key, value) {
    var {form} = this.state
    var formItem = form.find(item => {
      return item.key === key
    })
    formItem.value = value
    if (key === 'house_type' && value === 'car') {
      for (var index of [4, 5, 6, 7, 8, 9, 13]) {
        form[index].hide = true
      }
      form[2].hide = false
    } else {
      for (var index of [4, 5, 6, 7, 8, 9, 13]) {
        form[index].hide = false
      }
      form[2].hide = true
    }

    this.setState({
      form
    })


  }

  submit() {
    console.log(this.state.form)
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {})(ListInfo)

