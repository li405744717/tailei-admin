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


let sections = [
  {
    title: '编号'
  },
  {
    title: '头像',
    renderId: 'avatar'
  },
  {
    title: '微信名'
  },
  {
    title: '电话'
  },
  {
    title: '标签'
  }
]

class ListInfo extends Page {
  static propTypes = {}

  static defaultProps = {}
  state = {
    username: '',
    password: '',

    form: {
      name: 'xxx',
      phone: '123****3344',
      repair_status_name: '待分配',
      pay_num: 45.6,
      pay_status_name: '--',
      address: '聊城-冠县-XX街道',
      apartment: 'XX花园',
      house: '1单元-1号楼-302室',
      repair_man: 'xxx-199****1234',
      create_time: '2020-04-14 17:21:07',
      date_time: '2020-04-14 17:21:07',

      desc: '遇到了惺惺惜惺惺想寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻问题',
      images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
    }
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

}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleInfo
  }
}


export default connect(mapStateToProps, {})(ListInfo)

