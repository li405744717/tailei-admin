import * as React from 'react';
import renderView from './view'
import utils from '@/common/utils'
import './view.scss'
import wx from '@/common/wx'
import config from '@/common/config'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {setUser} from "@/pages/user/login/actions";

class HeaderBar extends React.Component {
  static defaultProps = {
    title: "理财师"
  }
  static propTypes = {
    title: PropTypes.string,
  }
  state = {}


  constructor(props) {
    super(props);

  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {

  }

  componentDidMount() {

  }

  render() {
    return renderView(this)
  }

  doAction(type) {
    if (type === 'logout') {
      this.props.setUser({})
      wx.setStorage({key: config.env + '_user', data: null})
      wx.relaunchTo({
        page: this,
        url: '/home/login'
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(withRouter(HeaderBar))
