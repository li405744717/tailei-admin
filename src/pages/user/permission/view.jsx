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
      无权限
    </div>

  </div>

}

