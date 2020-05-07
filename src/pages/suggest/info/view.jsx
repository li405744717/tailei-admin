/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {HOUSE_TYPES, HOUSE_STATUS} from './c'
import PropTypes from "prop-types";

const {Option} = Select;
const {RangePicker} = DatePicker;


export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, editItem, current_page} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} className='margin_left_16' onClick={() => page.goInfo(content.id)}>
          <span className='primary'>详情</span>
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
          <Input value={filter.name} placeholder='请输入' onChange={e => page.onChangeInput(e, 'name')}
                 className='house_sale_input_view'/>
        </div>
        <div className='flex_row align_center flex_1'>
          <span>电话：</span>
          <Input value={filter.phone} placeholder='请输入' onChange={e => page.onChangeInput(e, 'phone')}
                 className='house_sale_input_view'/>
        </div>
        {
          !showFilter ?
            <div className='flex_row align_center flex_1 justify_end'>
              <Button type='primary' onClick={() => page.search()}>
                <span className='white'>查询</span>
              </Button>
              <Button className='margin_left_16' onClick={() => page.reset()}>
                <span>重置</span>
              </Button>
              <Button type='link' className='flex_row center margin_left_40' onClick={() => page.setShowFilter(true)}>
                <span className='primary'>展开</span>
                <img src={require('@/img/icon_arrow_bottom_2.png')} className='icon_arrow_bottom_2'/>
              </Button>
            </div> :
            <div className='flex_row align_center flex_1 justify_end'>
              <span>小区：</span>
              <Select
                showSearch
                value={filter.apartment}
                style={{width: 240}}
                placeholder="全部小区"
                optionFilterProp="children"
                onChange={page.onChangeSelect}
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {
                  HOUSE_TYPES.map((item, index) => {
                    return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
                  })
                }
              </Select>
            </div>
        }
      </div>
      {
        showFilter ?
          <div className='flex_row align_center margin_top_32'>
            <div className='flex_row align_center flex_2'>
              <span>反馈时间：</span>
              <RangePicker className="fund_option_time_picker_view"
                           onChange={e => page.onChangeDate(e)}
                           value={[filter.startRange, filter.endRange]}/>
            </div>
            <div className='flex_row align_center flex_1 justify_end'>
              <Button type='primary' onClick={() => page.search()}>
                <span className='white'>查询</span>
              </Button>
              <Button className='margin_left_16' onClick={() => page.reset()}>
                <span>重置</span>
              </Button>
              <Button type='link' className='flex_row center margin_left_40' onClick={() => page.setShowFilter(false)}>
                <span className='primary'>收起</span>
                <img src={require('@/img/icon_arrow_bottom_2.png')} className='icon_arrow_bottom_2 rotate_180'/>
              </Button>
            </div>
          </div> : null
      }
    </div>
    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>意见反馈列表</span>
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
      <CusPCTable rowSelection={rowSelection} columnRenderObj={columnRenderObj} chart={table}
                  current_page={current_page}
                  onChangePage={_page => page.onChangePage(_page)}/>
    </div>

  </div>

}

