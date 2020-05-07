/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {PaySetEdit} from './c'
import PropTypes from "prop-types";
import filters from '@/common/filters'

const {Option} = Select;
const {RangePicker} = DatePicker;


export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, showEditAll, editItem, totalAmount, current_page} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} className='margin_left_16'
                onClick={() => content.status !== 'success' ? page.edit(content.id) : null}>
          <span className={`${content.status !== 'success' ? 'primary' : 'black'}`}>修改</span>
        </Button>
      </div>
    }
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => page.onSelectChange(e)
  };
  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">

    {
      editItem ?
        <Modal
          centered={true}
          visible={showEdit}
          onOk={page.editOK}
          onCancel={page.editCancel}
          title={'修改'}
          width={480}
          closable={true}>
          <PaySetEdit apartment={editItem[1].data[0].text} price={editItem[2].data[0].text} ref={'paySetEdit'}/>
        </Modal> : null
    }

    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>缴费设置</span>
        <div className='flex_1'/>
      </div>
      {
        selectedRowKeys && selectedRowKeys.length > 0 ?
          <div className='flex_row align_center house_sale_list_table_tip_view padding_LR_32 margin_bottom_20'>
            <img src={require('@/img/icon_tip.png')} className='icon_tip'/>
            <span className='margin_left_16'>已选择 <span className='primary'>{selectedRowKeys.length}</span> 项</span>
            <span className='margin_left_16'>金额共计 <span
              className='primary'>{filters.toFixed(totalAmount, 2)}</span> 元</span>
            <Button type='link' onClick={() => page.cleanSelect()} className='margin_left_40'><span
              className='primary'>清空</span></Button>
          </div> : null
      }
      <CusPCTable columnRenderObj={columnRenderObj} chart={table} current_page={current_page}
                  onChangePage={_page => page.onChangePage(_page)}/>
    </div>

  </div>

}

