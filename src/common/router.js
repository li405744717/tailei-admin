import React from 'react';
import Loadable from 'react-loadable';
//通用的过场组件
const loadingComponent = () => {
  return (
    <div></div>
  )
}
//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
const loadable = (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  });
}

const HouseScaleList = loadable(() => import('@/pages/house-sale/list/c'))
const HouseScaleListInfo = loadable(() => import('@/pages/house-sale/list-info/c'))

const HouseScaleInfo = loadable(() => import('@/pages/house-sale/info/c'))
const HouseScaleInfoInfo = loadable(() => import('@/pages/house-sale/info-info/c'))

const HouseList = loadable(() => import('@/pages/house/list/c'))
const HouseListInfo = loadable(() => import('@/pages/house/list-info/c'))
export const routerList = [
  {
    title: '首页',
    path: '/',
  },
  {
    title: '房屋租赁管理',
    path: '/home/house-sale',
    children: [
      {
        title: '租赁列表',
        path: '/home/house-sale/list',
        C: HouseScaleList
      },
      {
        title: '租赁信息',
        path: '/home/house-sale/info',
        C: HouseScaleInfo
      },
      {
        title: '新建',
        path: '/home/house-sale/list/add',
        C: HouseScaleListInfo,
        hideMenu: true
      },
      {
        title: '租赁详情',
        path: '/home/house-sale/info/:code',
        C: HouseScaleInfoInfo,
        hideMenu: true
      }
    ]
  },
  {
    title: '房屋管理',
    path: '/home/house',
    children: [
      {
        title: '房屋列表',
        path: '/home/house/list',
        C: HouseList
      },
      {
        title: '房屋详情',
        path: '/home/house/list/:code',
        C: HouseListInfo,
        hideMenu: true
      }
    ]
  }
]


var routerMap = []
var zip = (item) => {
  var result = [item]
  if (item.children) {
    var children = item.children
    for (var child of children) {
      result = result.concat(zip(child))
    }
    // delete item.children
    return result
  } else {
    return result
  }
}
for (var item of routerList) {
  routerMap = routerMap.concat(zip(item))
}
console.log(routerMap)
export var routerMap = routerMap
