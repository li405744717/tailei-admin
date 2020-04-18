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
import {INFORMATION_TYPES} from "../list/c";

class InformationInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '标题', type: 'input', key: 'title'},
      {
        title: '分类', type: 'select', key: 'type',
        options: INFORMATION_TYPES
      },
      {title: '列表图', type: 'images', key: 'images', config: {limit: 1, remark: '建议尺寸：顶部400*400'}},
      {title: '内容', type: 'input', key: 'content'},
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
    if (this.id) {
      let {form} = this.state
      form[0].value = 'xxxxxx'
      form[1].value = '1'
      form[2].value = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
      form[3].value = 'hhhhhh'
      this.setState({
        form
      })
    }
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
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {})(InformationInfo)

