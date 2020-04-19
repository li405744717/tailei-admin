import * as React from "react";
import filter from '@/common/filters'
import Config from "@/common/config";
import {Dropdown, Menu} from "antd";

export default function renderView(page) {
  var {} = page.state
  const {user} = page.props
  console.log('user', user)
  return (<div className="headerBar_container flex_row align_center">
    <div className='flex_row align_center header_bar_left_view'>
      <img src={require('@/img/header_logo.png')} className='header_logo margin_left_80'/>
      <span className='text_40 white mid margin_left_16'>安居公社</span>
    </div>
    <div className='flex_1 flex_row align_center padding_LR_48 header_bar_right_view'>
      <img src={require('@/img/icon_menu.png')} className='icon_menu'/>
      <div className='flex_1'/>
      <img src={require('@/img/icon_bell.png')} className='icon_bell margin_right_40'/>
      <img src={require('@/img/icon_user.png')} className='icon_user margin_right_32'/>
      <Dropdown overlay={<Menu>
        {
          [
            {title: '操作1', type: 'delete'},
            {title: '操作2', type: 'up'},
            {title: '退出登录', type: 'logout'}
          ].map((item, index) => {
            return <Menu.Item key={item.type} onClick={() => page.doAction(item.type)}>
              <span className="text_28">{item.title}</span>
            </Menu.Item>
          })
        }
      </Menu>}>
        <span>{user.name || '用户名'}</span>
      </Dropdown>

    </div>
  </div>)
}


