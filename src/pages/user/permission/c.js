/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setUser} from '../login/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";

class Permission extends React.Component {
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
    this.initData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.initData(nextProps)
  }

  initData(props) {

  }



  render() {
    return renderView(this)
  }


}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {setUser})(Permission)

