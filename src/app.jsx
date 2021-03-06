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
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

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

  setParams(originPathName, params, search) {
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
      params,
      search
    })
  }

  render() {
    const {location} = this.props;
    const {params, originPathName, search} = this.state


    var pathname = location.pathname
    // console.log('location', pathname, params, originPathName)
    var _originPathName = originPathName || pathname
    var curRouteItem = routerMap.find(item => {
      return item.path === _originPathName
    })
    const navBarTitle = curRouteItem ? curRouteItem.title : '404'
    const pathSnippets = _originPathName.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      var routeItem = routerMap.find(item => {
        return item.path === url
      })
      var link = null
      if (routeItem) {
        link = routeItem.path + (search || '')
        for (var key in params) {
          if (link.indexOf(key) > -1) {
            link = link.replace(`:${key}`, params[key])
          }
        }
      }
      return (
        routeItem ?
          <Breadcrumb.Item key={url}>
            {
              routeItem.C && index != pathSnippets.length - 1 ?
                <Link to={link}>
                  <span className="text_24 black">{routeItem.title}</span>
                </Link> :
                <span className="text_24 gray">{routeItem.title}</span>
            }
          </Breadcrumb.Item> : null
      );
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);

    return (<div className="flex_column app_container" id="app">

      {/*<ConfigProvider locale={zhCN}>*/}

      <NavBar title={navBarTitle}/>
      <HeaderBar/>
      <div className="flex_row flex_1">
        <AppMenu curRouteItem={curRouteItem}/>
        <div className="flex_1 flex_column padding_TB_16 ">
          <div className='padding_LR_48'>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </div>
          <div className="bg_white margin_top_20 flex_1 app_page">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>)
  }
}