import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Cookies from 'js-cookie'
import {GData as app} from "./common/global_data";
import store from './Store'
import utils from '@/common/utils'
import config from '@/common/config'
import wx from '@/common/wx'
import {SET_USER} from "./pages/user/login/actionTypes";
import userAPI from '@/commAction/user'
import {routerMap} from "./common/router";

import Loadable from 'react-loadable';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


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
const App = loadable(() => import('./app'))

const Login = loadable(() => import('@/pages/user/login/c'))
const Permission = loadable(() => import('@/pages/user/permission/c'))

var param = {};
window.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);

function checkToken() {
  const state = store.getState()
  if (state.user.token) {
    return true
  } else {
    return false
  }
}

function checkPermission(path) {
  const state = store.getState()
  var userPermissionPaths = state.user.userPermissionPaths
  if (userPermissionPaths.includes(path)) return true
  else return false
}


let localUserInfo = wx.getStorage(config.env + '_user')
console.log('localUserInfo', localUserInfo)
if (localUserInfo && localUserInfo.token) {
  console.log('get local localUserInfo')
  store.dispatch({type: SET_USER, ...localUserInfo})
} else {
  console.log('please login')
}

window.addEventListener('message', function (e) {
  if (e && e.data && e.data.data === 'logout') {
    console.log('do logout')
    wx.setStorage({
      key: config.env + '_userInfo',
      data: null
    })
  }
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <Switch>
        <Route exact path="/login" component={Login}/>

        <Route path='/' render={props =>
          !checkToken() ?
            <Redirect to={{
              pathname: '/login',
              state: {from: props.location}
            }}/>
            :
            <App {...props}>
              <Switch className="flex_column flex_1">
                {
                  routerMap.map((item, index) => {
                    let C = item.C
                    return C ?
                      <Route exact path={item.path}
                             render={props => !checkPermission(props.match.path) ? <Permission/> : <C {...props}/>}
                             key={`route_${index}`}/> : null
                  })
                }
              </Switch>
            </App>}/>
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
