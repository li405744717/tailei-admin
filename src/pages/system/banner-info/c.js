/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {} from '../banner/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import systemAPI from '@/commAction/system'
import utils from "../../../common/utils";

class BannerInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '标题', type: 'input', key: 'title'},
      {
        title: '位置',
        type: 'radio',
        key: 'position',
        options: [
          {title: '顶部', key: 'top'},
          {title: '底部', key: 'bottom'}
        ]
      },
      {title: '链接', type: 'input', key: 'link'},
      {title: 'banner图', type: 'images', key: 'images', config: {limit: 1, remark: '建议尺寸：顶部749*386  底部710*360'}}
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
      form[1].value = 'bottom'
      form[2].value = 'https://www.baidu.com'
      form[3].value = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
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
    let form = this.state.form
    let param = {
      title: form[0].value,
      position: form[1].value,
      weight:1,
      status:'down'
    }
    systemAPI.banner_add(param).then(data => {
      utils.showToast('新建成功')
      this.clear()
    }).catch(e => {
      utils.showToast('新建失败,请重试')
    })
  }

  clear() {
    this.setState({
      form: [
        {title: '标题', type: 'input', key: 'title'},
        {
          title: '位置',
          type: 'radio',
          key: 'position',
          options: [
            {title: '顶部', key: 'top'},
            {title: '底部', key: 'bottom'}
          ]
        },
        {title: '链接', type: 'input', key: 'link'},
        {title: 'banner图', type: 'images', key: 'images', config: {limit: 1, remark: '建议尺寸：顶部749*386  底部710*360'}}
      ]
    })
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {})(BannerInfo)

