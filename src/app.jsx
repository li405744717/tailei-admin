/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import AppMenu from '@/components/appMenu/c'
import HeaderBar from "./components/headerBar/c";
import NavBar from '@/components/navbar/c'
import {Breadcrumb, Alert} from 'antd';
import {HashRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import {routerMap} from "./common/router";
import $ from 'jquery'

export default class App extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {
    originPathName: null,
    params: {}
  }

  static APP

  constructor(props, context) {
    super(props)
  }

  componentDidMount() {
    App.APP = this
  }

  setParams(originPathName, params) {
    var location = window.location
    let url = location.href;

    if (window.parent && window.parent.postMessage) {
      try {
        // console.log('loadurl', url)
        window.parent.postMessage({data: 'loadurl', url: url}, '*')
      } catch (e) {
        console.log('parent loadurl function', e)
      }
    }

    this.setState({
      originPathName,
      params
    })
  }

  render() {
    const {location} = this.props;
    const {params, originPathName} = this.state


    var pathname = location.pathname
    // console.log('location', pathname, params, originPathName)
    var _originPathName = originPathName || pathname
    var curRouteItem = routerMap.find(item => {
      return item.path === _originPathName
    })
    const navBarTitle = curRouteItem ? curRouteItem.title : '404'
    const pathSnippets = _originPathName.split('/').filter(i => i);
    // console.log('pathSnippets', pathSnippets)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      var routeItem = routerMap.find(item => {
        return item.path === url
      })
      return (
        routeItem ?
          <Breadcrumb.Item key={url}>
            {
              routeItem.C && index != pathSnippets.length - 1 ?
                <Link to={routeItem.path}>
                  <span className="text_24 black">{routeItem.title}</span>
                </Link> :
                <span className="text_24 gray">{routeItem.title}</span>
            }
          </Breadcrumb.Item> : null
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);

    return (<div className="flex_column app_container" id="app">
      <NavBar title={navBarTitle}/>
      <HeaderBar/>
      <div className="flex_row flex_1">
        <AppMenu curRouteItem={curRouteItem}/>
        <div className="flex_1 flex_column padding_LR_30 padding_TB_16">
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          <div className="bg_white margin_top_20 flex_1 app_page">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>)
  }
}