// components/fund/table-c/c.js
import * as React from 'react';
import renderView from './view'
import './view.scss'
import utils from './../../common/utils'
import _Object from 'lodash/object'
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import wx from '@/common/wx'

class CusPCTable extends React.Component {
  static defaultProps = {
    chart: {
      sections: [],
      contents: [],
      functionId: null
    },
    columnRenderObj: {},
    showHeader: true,
    emptyText: '这里什么都没有',
    pageObj: true,
    needBottom: true
  }
  static propTypes = {
    chart: PropTypes.object.isRequired, //菜单,数据,显示顺序
    showHeader: PropTypes.bool.isRequired,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    columnRenderObj: PropTypes.object,
    emptyText: PropTypes.string,
    onClick: PropTypes.func,
    rowSelection: PropTypes.object,
    pageObj: PropTypes.bool,
    needBottom: PropTypes.bool,
  }
  state = {
    hideFg: false,
    showAll: false,
    columns: {},
    dataSource: {},
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
  }

  render() {
    return renderView(this)
  }

  showAll() {
    var {showAll} = this.state
    this.setState({
      showAll: !showAll
    })
  }

  click(e, event) {
    // console.log(e,event)
    // if (event) event.stopPropagation()
    let _param = e
    utils.triggerEvent('click', _param, {}, this);
    return
    var {contentindex, index} = e
    var id = "table_item_" + contentindex + "_" + index

    let selectTypeView = document.getElementById(id)
    if (selectTypeView) { // 加载更多讨论区item
      var rect = selectTypeView.getBoundingClientRect()
      if (rect == undefined)
        return;
    }

    var {chart} = this.props
    var contents = chart.contents
    var item = contents[contentindex][index]
    console.log(item)
    if (item.action) {
      var param = item.params
      param.action = item.action
      if (item.action == 'showDetail' && param.text) {
        this.setState({
          explain: param.text,
          explainTop: event.pageY + 10,
          left: event.pageX + 10
        })
        utils.record('table-表格', '', '查看全称')
      } else if (param && param.url) {
        var path = param.url
        if (path.indexOf('stock') > -1) {
          utils.record('table-表格', '', '点击股票')
        } else if (path.indexOf('fund') > -1) {
          utils.record('table-表格', '', '点击基金')
        }
        param.url += '&from=table'
        wx.navigateTo({
          page: this,
          url: param.url
        })
      }
      param.index = contentindex

      var top = event.pageY + 10
      param.top = top
      utils.triggerEvent('click', param, {}, this);
    }
  }

  onRow = (eventKey, params) => {
    switch (eventKey) {
      case "onClick":
        if (this.props.chart && this.props.chart.functionId && this.props.onClick) {
          this.props.onClick(params)
        }
        return;
      case "onMouseEnter":
        return;
      case "onMouseLeave":
        return;
      default:
        return;
    }
  }
}

export default withRouter(CusPCTable)