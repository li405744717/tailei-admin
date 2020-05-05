/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal, Dropdown, Menu} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {ROLES} from './c'
import PropTypes from "prop-types";

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
        <div className='button_fg_line'/>
        <Button type={"link"}
                onClick={() => page.editItems(content.id, 'status', content.status === 'on' ? 'off' : 'on')}>{content.status === 'off' ? '启用' : '停用'}</Button>
        <div className='button_fg_line'/>
        <Button type={"link"}>
          <span className="primary">删除</span>
        </Button>
      </div>
    }
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => page.onSelectChange(e)
  };
  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">

    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_32'>
      <div className='flex_row align_center'>
        <div className='flex_row align_center flex_1'>
          <span>姓名：</span>
          <Input placeholder='请输入' onChange={e => page.onChangeInput(e, 'name')} className='house_sale_input_view'/>
        </div>
        <div className='flex_row align_center flex_1 justify_end'>
          <span>角色：</span>
          <Select
            showSearch
            value={filter.role}
            style={{width: 240}}
            placeholder="全部"
            optionFilterProp="children"
            onChange={page.onChangeSelect}
            filterOption={(input, option) => {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {
              ROLES.map((item, index) => {
                return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
              })
            }
          </Select>
        </div>
        <div className='flex_row align_center flex_1 justify_end'>
          <Button type='primary' onClick={() => page.search()}>
            <span className='white'>查询</span>
          </Button>
          <Button className='margin_left_16' onClick={() => page.reset()}>
            <span>重置</span>
          </Button>
        </div>
      </div>
    </div>
    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>账户列表</span>
        <div className='flex_1'/>
        <Button type='primary' className='flex_row center margin_left_64' onClick={() => page.add()}>
          <img src={require('@/img/icon_add.png')} className='icon_add margin_right_10'/>
          <span className='white'>新建</span>
        </Button>
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
      <CusPCTable rowSelection={rowSelection} columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

