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
import informationAPI from '@/commAction/information'
import utils from "../../../common/utils";

class InformationInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '标题', type: 'input', key: 'title'},
      {
        title: '分类', type: 'select', key: 'type'
      },
      {title: '列表图', type: 'images', key: 'images', config: {limit: 1, remark: '建议尺寸：顶部400*400'}},
      {title: '内容', type: 'edit', key: 'content'},
    ],
    informationTypes: []
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
    this.initInformationType()

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
    var form = this.state.form
    var edit = this.refs.edit
    if (this.refs && this.refs.edit) {
      // console.log('this.refs && this.refs.edit', this.refs.edit.editor.txt.html())
    }
    var image_paths = (form[2].value || []).map(item => {
      return item.response.link
    }) || []
    var param = {
      title: form[0].value,
      label_id: parseInt(form[1].value),
      cover: image_paths[0],
      content: `${edit.editor.txt.html()}`
    }
    // console.log('param', param)
    informationAPI.information_create(param).then(data => {
      utils.showToast(data.detail)
    }).catch(e => {
      utils.showToast('新建失败')
    })
  }

  initInformationType() {
    informationAPI.information_type_list({}).then(data => {
      var contents = []
      for (var item of data.data) {
        contents.push({title: item.name, key: item.id + ''})
      }
      this.setState({
        informationTypes: contents
      })
    })
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleList
  }
}


export default connect(mapStateToProps, {})(InformationInfo)

