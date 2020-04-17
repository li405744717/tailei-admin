/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal, Dropdown, Menu} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";

export default function renderView(page) {

  const {table, selectedRowKeys, filter, showEdit, editItem} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => page.edit(content.id)}>
          <span className="primary">修改</span>
        </Button>
        <Button type={"link"}>
          <span className="primary">删除</span>
        </Button>
      </div>
    }
  }
  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">
    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>角色列表</span>
        <div className='flex_1'/>



        <Button type='primary' className='flex_row center margin_left_64' onClick={() => page.add()}>
          <img src={require('@/img/icon_add.png')} className='icon_add margin_right_10'/>
          <span className='white'>新建</span>
        </Button>
      </div>
      <CusPCTable columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

