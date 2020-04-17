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
import {Modal} from 'antd'
import monent from 'moment'

class BannerInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {
        title: '选择小区', type: 'select', key: 'apartment',
        options: [
          {title: '小区1', key: '1'},
          {title: '小区2', key: '2'},
          {title: '小区3', key: '3'}
        ]
      },
      {title: '出账时间', type: 'date', key: 'send_date'}
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
    let options = props.match.params
    this.id = options.id
    this.htmlParam = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => this.htmlParam[k] = v);


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
    this.setState({
      form
    })


  }

  submit() {
    console.log(this.state.form)
    var {form} = this.state
    var apartment_item = form[0].options.find(item => {
      return item.key === form[0].value
    })
    var apartment_name, amount = 2000
    if (apartment_item && form[1].value.length === 2) {
      apartment_name = apartment_item.title
      var date_range = form[1].value[0].format('YYYY/MM') + '-' + form[1].value[0].format('YYYY/MM')

      const config = {
        title: '确认发起缴费',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.send(),
        content: (
          <div>
            <span>{apartment_name}{date_range}物业费,共计{amount}元</span>
          </div>
        ),
      };
      Modal.confirm(config);
    }

  }

  send() {
    console.log('send')
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {})(BannerInfo)

