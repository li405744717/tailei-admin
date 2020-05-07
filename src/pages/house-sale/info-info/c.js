/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {} from '../info/actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";
import Page from "../../basic/page/Page";
import saleAPI from '@/commAction/sale'

class ListInfo extends Page {
  static propTypes = {}

  static defaultProps = {}
  state = {
    username: '',
    password: '',

    form: {
      name: 'xxx',
      phone: '123****3344',
      address: '聊城-冠县-XX街道' + ' ' + 'XX花园 1单元-1号楼-302室',
      house_type: 'zhuzhai',
      house_intro: '两室一厅',
      area: '100平',
      floor: '6层',
      direction: '朝南',
      pay_way: '2000/月,押一付三',
      renovation_way: '毛坯房',
      images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',]
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
    let options = props.match.params
    this.code = options.code
    this.htmlParam = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => this.htmlParam[k] = v);

    var param = {
      id: this.code
    }
    saleAPI.sale_info(param).then(data => {
      var item = data.data
      this.setState({
        form: {
          name: item.publisher || '--',
          phone: item.contact,
          address: item.address,// + ' ' + 'XX花园 1单元-1号楼-302室',
          house_type: item.rent_type,
          house_intro: item.room_type,//'两室一厅',
          area: item.area + '平',
          floor: item.floor + '层',
          direction: item.direction,
          pay_way: item.pay_way,
          renovation_way: item.furniture,
          images: item.photos
        }
      })
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

