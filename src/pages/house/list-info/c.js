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


let sections = [
  {
    title: '编号'
  },
  {
    title: '头像',
    renderId: 'avatar'
  },
  {
    title: '微信名'
  },
  {
    title: '电话'
  },
  {
    title: '标签'
  }
]

class ListInfo extends Page {
  static propTypes = {}

  static defaultProps = {}
  state = {
    username: '',
    password: '',

    table: {
      sections: sections,
      contents: []

    },
    form: {
      name: 'xxx',
      phone: '123****3344',
      address: '聊城-冠县-XX街道',
      apartment: 'XX花园',
      house: '1单元-1号楼-302室',
      house_type: 'zhuzhai',
      house_intro: '两室一厅',
      area: '100平',
      floor: '6层',
      direction: '朝南',
      pay_way: '2000/月,押一付三',
      renovation_way: '毛坯房',
      images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',],
      roles: [
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '爸爸'
        },
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '妈妈'
        },
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '儿子'
        },
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '姐姐'
        },
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '租户'
        },
        {
          id: 1,
          avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          name: 'XX',
          phone: '13400001234',
          role: '租户'
        }
      ]

    }
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

    var {form, table} = this.state
    var roles = form.roles
    var contents = []
    for (var item of roles) {
      contents.push([
        {data: [{text: item.id}]},
        {avatarUrl: item.avatar},
        {data: [{text: item.name}]},
        {data: [{text: item.phone}]},
        {data: [{text: item.role}]}
      ])
    }
    table.contents = contents
    this.setState({
      table
    })
  }


  render() {
    return renderView(this)
  }

}


const mapStateToProps = (state) => {
  return {
    ...state.houseSaleInfo
  }
}


export default connect(mapStateToProps, {})(ListInfo)

