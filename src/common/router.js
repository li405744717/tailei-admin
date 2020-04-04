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



export const routerList = [
  {
    title: '首页',
    path: '/',
  },
  {
    title: '公募工作台',
    path: '/home',
    children: [

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
