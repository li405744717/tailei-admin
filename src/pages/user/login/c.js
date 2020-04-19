/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setUser} from './actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import config from '@/common/config'

class Login extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: ''
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
  }

  componentDidMount() {
    // this.props.getFilters()
    this.initData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps)
    // utils.reSetPropsState(this, nextProps)
  }

  initData(props) {
    var {user} = props
    this.handleAction(user.token)
  }

  setInputValue(val, key) {
    console.log(val, key)
    this.setState({
      [key]: val
    })
  }

  onPass() {
    // this.props.login()
    wx.showLoading({title: '请稍后...', mask: true})
    var params = {
      username: '13479186301',
      password: '123456'
    }
    UserAPI.login(params).then(data => {
      wx.hideLoading()
      this.props.setUser(data)
      if (data.token && this.autoLogin) {
        wx.setStorage({key: config.env + '_user', data: data})
      } else {
        wx.setStorage({key: config.env + '_user', data: null})
      }
      this.handleAction(data.token)
    })
    // app.globalData.token = '4313120545a40d6355ab736e9e6566b0cb709170'
  }

  handleAction(token) {
    if (token) {
      let RedirectUrl = this.props.location.state ? this.props.location.state.from.pathname : null
      let RedirectUrlSearch = this.props.location.state ? this.props.location.state.from.search : ''
      // console.log('RedirectUrl', RedirectUrl + RedirectUrlSearch)
      if (RedirectUrl) {
        // 登陆成功之后的跳转
        this.props.history.replace(RedirectUrl + RedirectUrlSearch)
      } else {
        this.props.history.replace('/')
      }
    }
  }

  render() {
    return renderView(this)
  }

  onChange(e) {
    console.log(e.target.checked)
    this.autoLogin = e.target.checked
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(Login)

