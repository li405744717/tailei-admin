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
import {ROLES} from "../account/c";
import systemAPI from '@/commAction/system'
import utils from "../../../common/utils";

let RightTables = [
  {
    sections: [
      {
        title: '系统设置',
        renderId: 'sysRight'
      },
    ],
    contents: [
      [
        {title: 'banner管理', key: 'banner'}
      ],
      [
        {title: '分享设置', key: 'share'}
      ],
      [
        {title: '推送设置', key: 'push'}
      ],
      [
        {title: '权限设置', key: 'right'}
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
        {title: '缴费列表', key: 'pay_list'}
      ],
      [
        {title: '发起缴费', key: 'pay_send'}
      ],
      [
        {title: '缴费设置', key: 'pay_set'}
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
        {title: '房屋列表', key: 'house_list'}
      ],
      [
        {title: '批量导入房屋信息', key: 'house_import_list'}
      ],
      [
        {title: '租赁列表', key: 'house_sale_list'}
      ],
      [
        {title: '租赁信息', key: 'house_sale_info'}
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
        {title: '家具报修', key: 'repair'}
      ],
      [
        {title: '维修人员', key: 'worker'}
      ],
      [
        {title: '意见反馈', key: 'suggest'}
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
        {title: '文章列表', key: 'information_list'}
      ],
      [
        {title: '文章分类管理', key: 'information_type'}
      ]
    ]
  }
]

class BannerInfo extends Page {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',

    form: [
      {title: '账户名(手机号)', type: 'input', key: 'phone'},
      {title: '账户密码', type: 'input', key: 'pwd'},
      {title: '确认密码', type: 'input', key: 'pwd2'},
      {title: '姓名', type: 'input', key: 'name'},
      // {title: '联系方式', type: 'input', key: 'phone'},
      {
        title: '账户角色', type: 'select', key: 'role',
        options: ROLES
      },
      {
        title: '所属小区', type: 'select', key: 'apartment',
        options: [
          {title: '小区1', key: '1'},
          {title: '小区2', key: '2'},
          {title: '小区3', key: '3'}
        ]
      },
      {
        title: '权限选择',
        type: 'table',
        key: 'right',
        tables: RightTables
      }
    ]
  }

  constructor(props, context) {
    super(props)
    console.log('props', props)
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
      form[0].value = '134****1234'
      form[1].value = '123456'
      form[2].value = '123456'
      form[3].value = 'xxxx'
      // form[4].value = '134****1234'
      form[4].value = 'admin'
      form[5].value = '2'
      form[6].value = [
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
    var {form} = this.state
    var rightIndexs = form[6].value
    var permissions = []
    for (var index in rightIndexs) {
      index = parseInt(index)
      var rights = rightIndexs[index]
      var rightKeys = []
      for (var _index of rights) {
        rightKeys.push(RightTables[index].contents[_index][0].key)
      }
      permissions = permissions.concat(rightKeys)
    }
    console.log('permission', permissions)

    let param = {
      name: form[3].value,
      password: form[1].value,
      phone: form[0].value,
      role: form[4].value,
      permissions
    }
    systemAPI.account_add(param).then(data => {
      utils.showToast('新建成功')
      this.clear()
    }).catch(e => {
      utils.showToast('新建失败,请重试')
    })

  }

  clear() {
    this.setState({
      form: [
        {title: '账户名(手机号)', type: 'input', key: 'phone'},
        {title: '账户密码', type: 'input', key: 'pwd'},
        {title: '确认密码', type: 'input', key: 'pwd2'},
        {title: '姓名', type: 'input', key: 'name'},
        // {title: '联系方式', type: 'input', key: 'phone'},
        {
          title: '账户角色', type: 'select', key: 'role',
          options: ROLES
        },
        {
          title: '所属小区', type: 'select', key: 'apartment',
          options: [
            {title: '小区1', key: '1'},
            {title: '小区2', key: '2'},
            {title: '小区3', key: '3'}
          ]
        },
        {
          title: '权限选择',
          type: 'table',
          key: 'right',
          tables: RightTables
        }
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

