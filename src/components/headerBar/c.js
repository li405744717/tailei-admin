import * as React from 'react';
import renderView from './view'
import utils from '@/common/utils'
import './view.scss'
import wx from '@/common/wx'
import Config from '@/common/config'
import {withRouter} from 'react-router-dom'
import {GData as app} from "../../common/global_data";
import PropTypes from "prop-types";


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

}

export default withRouter(HeaderBar)
