// components/navbar/c.js
import * as React from 'react';
import renderView from './view'
import utils from '@/common/utils'
import './view.scss'
import wx from '@/common/wx'
import Config from '@/common/config'
import {withRouter} from 'react-router-dom'
import {GData as app} from "../../common/global_data";
import PropTypes from "prop-types";


class NavBar extends React.Component {
  static defaultProps = {
    title: "理财师"
  }
  static propTypes = {
    title: PropTypes.string,
  }
  state = {
    title: '叮当雷达',
    bgColor: '#E44444',
    textColor: '#ffffff',
    showHome: false,
    showBack: true,
    backText: '',
    backTextColor: "#000000",
    homeAction: false,
    firstPage: false,
    style: '',
    navStyle: '',
    statusBarHeight: app.globalData.window.statusBarHeight + 'px',
    isIpX: app.globalData.isIpX,
  }


  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(newVal) {
    utils.reSetPropsState(this, newVal, () => {
      document.getElementById('navTitle').innerText = this.props.title
    })
  }

  componentDidMount() {
    utils.setPropsState(this, () => {
      document.getElementById('navTitle').innerText = this.state.title
      try {
        var systemInfo = app.globalData.window.origin
        this.computeNavigateBarHeight(systemInfo);
      } catch (e) {
        // 获取系统信息失败
        app.globalData.window.navbarHeight = 68
        this.setState({
          totalTopHeight: 68,
          statusBarHeight: 20,
          titleBarHeight: 48,
        });
      }
      // console.log('getCurrentPages()', getCurrentPages(), getCurrentPages().length, getCurrentPages().length == 1)
      if (this.state.firstPage) {
        // this.setState({
        //   firstPage: getCurrentPages().length == 1 && (this.state.backText == '')
        // })
      }
    })
  }

  render() {
    return renderView(this)
  }

  computeNavigateBarHeight(systemInfo) {
    let totalTopHeight = 68;
    let statusBarHeight = 20
    if (Config.IS_IPX) {
      totalTopHeight = 88;
      statusBarHeight = 44
    } else if (Config.IS_IOS) {
      totalTopHeight = 64;
    }
    app.globalData.window.navbarHeight = 0 //totalTopHeight
    app.globalData.window.statusBarHeight = 0 //statusBarHeight
    this.setState({
      totalTopHeight: totalTopHeight,
      statusBarHeight: statusBarHeight,
      titleBarHeight: totalTopHeight - statusBarHeight
    });
  }

  //返回
  handleBack() {
    console.log(this.props.history)
    if (this.props.history.length > 1) {//没有文字,默认返回上一页
      wx.navigateBack({page: this})
    } else {//其他操作
      console.log('返回APP')
    }
  }
}

export default withRouter(NavBar)
