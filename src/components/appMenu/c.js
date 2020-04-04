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


class AppMenu extends React.Component {
  static defaultProps = {

  }
  static propTypes = {
    curRouteItem: PropTypes.object,
  }
  state = {}


  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(newVal) {

  }

  componentDidMount() {

  }

  render() {
    return renderView(this)
  }

  handleClick = (e) => {
    console.log(e)
    wx.navigateTo({
      page: this,
      url: e.key
    })
  }
}

export default withRouter(AppMenu)
