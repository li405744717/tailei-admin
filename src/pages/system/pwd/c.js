/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {} from '@/pages/user/login/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import {Input} from 'antd'
import utils from '@/common/utils'

export class SystemPwdEdit extends React.Component {
  state = {
    form: {
      oldPwd: null,
      newPwd: null,
      newPwd2: null
    }
  }


  onChangeInput(e, key) {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  render() {
    return <div className='flex_column'>
      <div className='flex_row align_center'>
        <span className='black'>旧密码：</span>
        <Input onChange={e => this.onChangeInput(e, 'oldPwd')} className='house_sale_input_view' placeholder='请输入旧密码'/>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>新密码：</span>
        <Input onChange={e => this.onChangeInput(e, 'newPwd')} className='house_sale_input_view' placeholder='请输入新密码'/>
      </div>


      <div className='flex_row align_center margin_top_48'>
        <span className='black'>确认密码：</span>
        <Input onChange={e => this.onChangeInput(e, 'newPwd2')} className='house_sale_input_view'
               placeholder='请再次输入密码'/>
      </div>

    </div>
  }
}


class Pwd extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    showEdit: false
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps, nexContext) {
    this.onLoad(nextProps)
  }

  onLoad(props) {

  }


  render() {
    return renderView(this)
  }

  setShowEdit(flag) {
    this.setState({
      showEdit: flag
    })
  }

  editCancel = (e) => {
    console.log(e)
    this.setShowEdit(false)
  }
  editOK = (e) => {
    let form = this.refs.pwdEdit.state.form
    if (form.oldPwd !== '123456') {
      utils.showToast('旧密码错误')
      return
    } else if (form.newPwd !== form.newPwd2) {
      utils.showToast('两次密码不一致,请确认')
      return
    }
    console.log(form)
    this.setShowEdit(false)
  }

}


const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}


export default connect(mapStateToProps, {})(Pwd)

