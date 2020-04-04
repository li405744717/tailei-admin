import * as React from "react";
import filter from '@/common/filters'
import Config from "@/common/config";
import {Menu, Icon} from 'antd';
import {routerList} from "../../common/router";

const {SubMenu} = Menu;

var zipMenuItem = (item, index) => {
  if (item.children) {
    return <SubMenu key={item.path} title={<span>
      {/*<Icon type="mail"/>*/}
      <span className='white'>{item.title}</span>
    </span>}>
      {
        item.children.map((child, index) => {
          return zipMenuItem(child)
        })
      }
    </SubMenu>
  } else if (!item.hideMenu) {
    return <Menu.Item key={item.path}>{item.title}</Menu.Item>
  } else {
    return null
  }
}
export default function renderView(page) {
  var {curRouteItem} = page.props
  console.log('curRouteItem', curRouteItem)
  var pathSnippets = []
  var defaultSelectedKeys = []
  if (curRouteItem) {
    pathSnippets = curRouteItem.path.split('/').filter(i => i)
    if (curRouteItem.path === '/') defaultSelectedKeys = ['/']
  }


  pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    defaultSelectedKeys.push(url)
  })
  console.log('defaultSelectedKeys', defaultSelectedKeys)
  return (<Menu
    theme="dark"
    onClick={page.handleClick}
    style={{width: 256}}
    defaultSelectedKeys={defaultSelectedKeys}
    defaultOpenKeys={defaultSelectedKeys}
    mode="inline"
  >
    {
      routerList.map((item, index) => {
        return zipMenuItem(item)
      })
    }
  </Menu>)
}


