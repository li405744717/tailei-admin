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

console.log('fcCode cookie:', Cookies.get(), Cookies.get('fcCode'), 'params:', param.fcCode)
let DefaultAgentId = config.env === 'devkb' ? null : null
let DefaultAgentToken = config.env === 'devkb' ? null : null
let AGENT_ID = Cookies.get('fcCode') || param.fcCode || DefaultAgentId
let AGENT_TOKEN = Cookies.get('nfpToken') || param.nfpToken || DefaultAgentToken

let localUserInfo = wx.getStorage(config.env + '_userInfo')
console.log('localUserInfo', localUserInfo)
if (AGENT_ID) {
  store.dispatch({type: SET_USER, id: AGENT_ID})
  userAPI.agent_authorize({fcCode: AGENT_ID, nfpToken: AGENT_TOKEN}).then(data => {
    if (data.status) {
      wx.setStorage({
        key: config.env + '_userInfo',
        data: {
          token: data.token,
          id: AGENT_ID
        }
      })
      store.dispatch({type: SET_USER, id: AGENT_ID, token: data.token})
    } else {
      utils.showToast('无效用户,请登录')
      if (window.parent && window.parent.postMessage) {
        try {
          window.parent.postMessage({data: 'loginfail'}, '*')
        } catch (e) {
          console.log('parent login function', e)
        }
      }
    }
  })
  // userAPI.agent_login({agentId: AGENT_ID}).then(data => {
  //   store.dispatch({type: SET_USER, id: AGENT_ID, token: data.token})
  // })
} else if (localUserInfo && localUserInfo.token) {
  console.log('no agent_id,get local userInfo')
  store.dispatch({type: SET_USER, id: localUserInfo.id, token: localUserInfo.token})
} else {
  if (window.parent && window.parent.postMessage) {
    try {
      window.parent.postMessage({data: 'loginfail'}, '*')
    } catch (e) {
      console.log('parent login function', e)
    }
  }
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
                    return item.C ?
                      <Route exact path={item.path} component={item.C} key={`route_${index}`}/> : null
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
