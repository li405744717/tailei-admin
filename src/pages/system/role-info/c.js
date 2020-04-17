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


class BannerInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '标题', type: 'input', key: 'title'},
      {
        title: '权限选择',
        type: 'table',
        key: 'right',
        tables: [
          {
            sections: [
              {
                title: '系统设置',
                renderId: 'sysRight'
              },
            ],
            contents: [
              [
                {title: 'banner管理', key: 'banner管理'}
              ],
              [
                {title: '分享设置', key: '分享设置'}
              ],
              [
                {title: '推送设置', key: '推送设置'}
              ],
              [
                {title: '权限设置', key: '权限设置'}
              ]
            ]
          },
          {
            sections: [
              {
                title: '缴费管理',
                renderId: 'sysRight'
              },
            ],
            contents: [
              [
                {title: '缴费列表', key: '缴费列表'}
              ],
              [
                {title: '发起缴费', key: '发起缴费'}
              ],
              [
                {title: '缴费设置', key: '缴费设置'}
              ]
            ]
          },
          {
            sections: [
              {
                title: '房屋管理',
                renderId: 'sysRight'
              },
            ],
            contents: [
              [
                {title: '房屋列表', key: '房屋列表'}
              ],
              [
                {title: '批量导入房屋信息', key: '批量导入房屋信息'}
              ],
              [
                {title: '租赁列表', key: '租赁列表'}
              ],
              [
                {title: '租赁信息', key: '租赁信息'}
              ]
            ]
          },
          {
            sections: [
              {
                title: '意见报修',
                renderId: 'sysRight'
              },
            ],
            contents: [
              [
                {title: '家具报修', key: '家具报修'}
              ],
              [
                {title: '维修人员', key: '维修人员'}
              ],
              [
                {title: '意见反馈', key: '意见反馈'}
              ]
            ]
          },
          {
            sections: [
              {
                title: '文章管理',
                renderId: 'sysRight'
              },
            ],
            contents: [
              [
                {title: '文章列表', key: '文章列表'}
              ],
              [
                {title: '文章分类管理', key: '文章分类管理'}
              ]
            ]
          }
        ]
      }
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
      form[1].value = [
        ["0", "1", "2"],
        undefined,
        ["0"],
        undefined,
        ["1"]
      ]
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


export default connect(mapStateToProps, {})(BannerInfo)

