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

const RepairList = loadable(() => import('@/pages/repair/list/c'))
const RepairListInfo = loadable(() => import('@/pages/repair/list-info/c'))

const SuggestList = loadable(() => import('@/pages/suggest/info/c'))
const SuggestListInfo = loadable(() => import('@/pages/suggest/list-info/c'))


const SystemPwd = loadable(() => import('@/pages/system/pwd/c'))

const SystemBanner = loadable(() => import('@/pages/system/banner/c'))
const SystemBannerInfo = loadable(() => import('@/pages/system/banner-info/c'))

const SystemShare = loadable(() => import('@/pages/system/share/c'))

const SystemPush = loadable(() => import('@/pages/system/push/c'))

const SystemRightRole = loadable(() => import('@/pages/system/role/c'))
const SystemRightRoleInfo = loadable(() => import('@/pages/system/role-info/c'))


const SystemAccount = loadable(() => import('@/pages/system/account/c'))
const SystemAccountInfo = loadable(() => import('@/pages/system/account-info/c'))


const PayList = loadable(() => import('@/pages/pay/list/c'))
const PaySend = loadable(() => import('@/pages/pay/send/c'))
const PaySet = loadable(() => import('@/pages/pay/set/c'))


const InformationList = loadable(() => import('@/pages/information/list/c'))
const InformationListInfo = loadable(() => import('@/pages/information/list-info/c'))

const InformationType = loadable(() => import('@/pages/information/type/c'))

export const permission = {
  banner: ['/home/set', '/home/set/banner', '/home/set/banner/add', '/home/set/banner/edit/:id'],
  share: ['/home/set', '/home/set/share'],
  push: ['/home/set', '/home/set/push'],
  right: ['/home/set', '/home/set/account', '/home/set/account/add', '/home/set/account/edit/:id'],
  pay_list: ['/home/pay', '/home/pay/list'],
  pay_send: ['/home/pay', '/home/pay/send'],
  pay_set: ['/home/pay', '/home/pay/set'],
  house_list: ['/home/house', '/home/house/list', '/home/house/list/:code'],
  house_import_list: ['/home/house', '/home/house/list'],
  house_sale_list: ['/home/house-sale', '/home/house-sale/list', '/home/house-sale/list/add'],
  house_sale_info: ['/home/house-sale', '/home/house-sale/info', '/home/house-sale/info/:code'],
  repair: ['/home/repair', '/home/repair/list', '/home/repair/list/:code'],
  worker: [''],
  suggest: ['/home/suggest', '/home/suggest/list', '/home/suggest/list/:code'],
  information_list: ['/home/information', '/home/information/list', '/home/information/list/add', '/home/information/list/edit/:id'],
  information_type: ['/home/information', '/home/information/type'],
  noPermission: ['/home/set', '/home/set/pwd']
}

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
  },
  {
    title: '报修信息',
    path: '/home/repair',
    children: [
      {
        title: '家具报修',
        path: '/home/repair/list',
        C: RepairList
      },
      {
        title: '报修详情',
        path: '/home/repair/list/:code',
        C: RepairListInfo,
        hideMenu: true
      }
    ]
  },
  {
    title: '意见管理',
    path: '/home/suggest',
    children: [
      {
        title: '意见反馈',
        path: '/home/suggest/list',
        C: SuggestList
      },
      {
        title: '意见反馈详情',
        path: '/home/suggest/list/:code',
        C: SuggestListInfo,
        hideMenu: true
      }
    ]
  },
  {
    title: '文章管理',
    path: '/home/information',
    children: [
      {
        title: '文章列表',
        path: '/home/information/list',
        C: InformationList
      },
      {
        title: '新建',
        path: '/home/information/list/add',
        C: InformationListInfo,
        hideMenu: true
      },
      {
        title: '修改',
        path: '/home/information/list/edit/:id',
        C: InformationListInfo,
        hideMenu: true
      },
      {
        title: '文章分类管理',
        path: '/home/information/type',
        C: InformationType
      },
    ]
  },
  {
    title: '缴费管理',
    path: '/home/pay',
    children: [
      {
        title: '缴费列表',
        path: '/home/pay/list',
        C: PayList
      },
      {
        title: '发起缴费',
        path: '/home/pay/send',
        C: PaySend
      },
      {
        title: '缴费设置',
        path: '/home/pay/set',
        C: PaySet
      },
    ]
  },
  {
    title: '系统设置',
    path: '/home/set',
    children: [
      {
        title: '密码设置',
        path: '/home/set/pwd',
        C: SystemPwd,
      },
      {
        title: 'banner管理',
        path: '/home/set/banner',
        C: SystemBanner
      },
      {
        title: '新建',
        path: '/home/set/banner/add',
        C: SystemBannerInfo,
        hideMenu: true
      },
      {
        title: '修改',
        path: '/home/set/banner/edit/:id',
        C: SystemBannerInfo,
        hideMenu: true
      },
      {
        title: '分享设置',
        path: '/home/set/share',
        C: SystemShare
      },
      {
        title: '推送设置',
        path: '/home/set/push',
        C: SystemPush
      },
      {
        title: '账户管理',
        path: '/home/set/account',
        C: SystemAccount
      },
      {
        title: '新建账户',
        path: '/home/set/account/add',
        C: SystemAccountInfo,
        hideMenu: true
      },
      {
        title: '修改账户',
        path: '/home/set/account/edit/:id',
        C: SystemAccountInfo,
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
// console.log(routerMap)
export var routerMap = routerMap
