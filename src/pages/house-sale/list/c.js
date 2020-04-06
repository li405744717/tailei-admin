/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import {connect} from 'react-redux'
import "./view.scss"
import {setUser} from './actions'
import UserAPI from '@/commAction/user'
import PropTypes from 'prop-types'
import wx from '@/common/wx'
import renderView from "./view";

class List extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    username: '',
    password: '',
    columns:[]
  }

  constructor(props, context) {
    super(props)
    this.isPad = this.props.isPad
  }

  componentDidMount() {
    // this.props.getFilters()
    this.onLoad(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps,nexContext) {
    this.onLoad(nextProps)
    // utils.reSetPropsState(this, nextProps)
  }

  onLoad(props) {

  }

  initColumns(){
    var sections = [
      {
        title:'编号'
      },
      {
        title:'联系方式'
      },
      {
        title:'地址'
      },
      {
        title:'顾问'
      },
      {
        title:'房源类型'
      },
      {
        title:'状态'
      },
      {
        title:'操作'
      }
    ]
    var contents = [
      [
        {data:[{text:'1'}]},
        {data:[{text:'业主'}]},
        {data:[{text:'1'}]},
        {data:[{text:'1'}]},
        {data:[{text:'1'}]},
        {data:[{text:'1'}]},
        {data:[{text:'1'}]},
      ]
    ]
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


export default connect(mapStateToProps, {setUser})(List)
