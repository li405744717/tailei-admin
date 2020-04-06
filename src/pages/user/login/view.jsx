/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input} from "antd";

export default function renderView(page) {

  const {user} = page.props
  const {username, password} = page.state
  return <div className="page flex_column center login_page relative" id="rankPage">
    <div className="login_login_container relative flex_row">
      <img src={require('@/img/icon_login.png')} className='icon_login icon_login_image'/>
      <div className="flex_1 flex_row center login_logo_container">
        <img src={require('@/img/logo.png')} className='logo'/>
        <div className='flex_column margin_left_16'>
          <span className="text_48 mid">安居公社</span>
          <span className='text_24 gray'>放心首选安居小区</span>
        </div>
      </div>
      <div className="login_plane_view relative flex_column">
        <img src={require('@/img/icon_login_bg.png')} className="icon_login_bg icon_login_bg_image"/>
        <div className='flex_column height_100 width_100 z_index_1'>
          <span className='text_112 bold white margin_top_40'>Welcome！</span>
          <span className="text_32 mid white margin_top_40">账号密码登录</span>
          <div className='login_short_line margin_top_8'/>
          <div className='flex_row align_center login_input_view margin_top_24'>
            <Icon type='user' className="light_gray text_32"/>
            <Input onChange={e => page.setInputValue(e.target.value, 'user')} size="large" placeholder="帐号"
                   className='login_input_item'/>
          </div>
          <div className='flex_row align_center login_input_view margin_top_24'>
            <Icon type='lock' className="light_gray text_32"/>
            <Input onChange={e => page.setInputValue(e.target.value, 'pwd')} type='password' size="large"
                   placeholder="密码"
                   className='login_input_item'/>
          </div>
          <div className='flex_row align_center margin_top_24 login_check'>
            <Checkbox onChange={e => page.onChange(e)}></Checkbox>
            <span className='text_28 white margin_left_4'>自动登录</span>

          </div>
          <Button className='login_login_btn flex_row center margin_top_24' onClick={e => page.onPass()}>
            <span className='blue text_32'>登录</span>
          </Button>
        </div>

      </div>
    </div>

  </div>

}

