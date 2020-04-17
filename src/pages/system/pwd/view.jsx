/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {SystemPwdEdit} from './c'
import PropTypes from "prop-types";

const {Option} = Select;
const {RangePicker} = DatePicker;


export default function renderView(page) {

  const {userInfo} = page.props
  const {showEdit} = page.state
  const {} = page.props

  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">

    <Modal
      centered={true}
      visible={showEdit}
      onOk={page.editOK}
      onCancel={page.editCancel}
      title={'修改密码'}
      width={480}
      closable={true}>
      <SystemPwdEdit ref={'pwdEdit'}/>
    </Modal>

    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_32'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>修改密码</span>
        <div className='flex_1'/>
      </div>
      <div className='flex_column'>
        <div className='flex_row align_center'>
          <span>账号：{userInfo.account}</span>
        </div>
        <div className='flex_row align_center margin_top_32'>
          <span className='margin_right_32'>密码：******</span>
          <Button className='' onClick={() => page.setShowEdit(true)}>
            <span className='text_28'>修改</span>
          </Button>
        </div>
      </div>
    </div>

  </div>

}

