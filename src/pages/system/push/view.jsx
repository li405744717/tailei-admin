/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal, Dropdown, Menu} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {BANNER_TYPES, BANNER_STATUS} from './c'
import PropTypes from "prop-types";
import {SystemPushEdit} from "./c";

const {Option} = Select;
const {RangePicker} = DatePicker;


export default function renderView(page) {

  const {table, selectedRowKeys, filter, showEdit, editItem} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => page.edit(content.id)}>
          <span className="primary">修改</span>
        </Button>
      </div>
    }
  }
  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">

    {
      editItem ?
        <Modal
          centered={true}
          visible={showEdit}
          onOk={page.editOK}
          onCancel={page.editCancel}
          title={'修改内容'}
          width={480}
          closable={true}>
          <SystemPushEdit content={editItem[2].data[0].text} ref={'pushEdit'}/>
        </Modal> : null
    }


    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>推送列表</span>
        <div className='flex_1'/>
      </div>
      {
        selectedRowKeys && selectedRowKeys.length > 0 ?
          <div className='flex_row align_center house_sale_list_table_tip_view padding_LR_32 margin_bottom_20'>
            <img src={require('@/img/icon_tip.png')} className='icon_tip'/>
            <span className='margin_left_16'>已选择 <span className='primary'>{selectedRowKeys.length}</span> 项</span>
            <Button type='link' onClick={() => page.cleanSelect()} className='margin_left_40'><span
              className='primary'>清空</span></Button>
          </div> : null
      }
      <CusPCTable columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

