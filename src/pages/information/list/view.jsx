/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Switch, ConfigProvider} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {INFORMATION_STATUS, INFORMATION_TYPES} from './c'
import PropTypes from "prop-types";
import zhCN from 'antd/es/locale/zh_CN';

const {Option} = Select;
const {RangePicker} = DatePicker;


export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, editItem, uploadToast,informationTypes} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => page.edit(content.id)}>
          <span className={`${content.status === 'on' ? 'black' : 'primary'}`}>修改</span>
        </Button>
        <Button type={"link"} className='margin_left_16' onClick={() => page.goInfo(content.id)}>
          <span className='primary'>{content.status === 'on' ? '下架' : '上架'}</span>
        </Button>
        <Button type={"link"} className='margin_left_16' onClick={() => page.delete(content.id)}>
          <span className={`${content.status === 'on' ? 'black' : 'primary'}`}>删除</span>
        </Button>
      </div>
    },
    switch: (content, record, rowIndex) => {
      return <div className='flex_row align_center'>
        <Switch disabled={content.status === 'off'} checked={content.home}
                onChange={e => page.onChangeSwitch(e, rowIndex)}/>
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
          <span>分类：</span>
          <Select
            showSearch
            value={filter.information_type}
            style={{width: 240}}
            placeholder="请输入"
            optionFilterProp="children"
            onChange={page.onChangeSelect}
            filterOption={(input, option) => {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {
              informationTypes.map((item, index) => {
                return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
              })
            }
          </Select>
        </div>
        <div className='flex_row align_center flex_1'>
          <span>发布时间：</span>
          <ConfigProvider locale={zhCN}>
            <RangePicker className="fund_option_time_picker_view"
                         onChange={e => page.onChangeDate(e)}
                         value={[filter.startRange, filter.endRange]}/>
          </ConfigProvider>
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
        <span className='text_32 black'>文章列表</span>
        <div className='flex_1'/>
        <Radio.Group value={filter.status} onChange={page.handleSizeChange}>
          {
            INFORMATION_STATUS.map((item, index) => {
              return <Radio.Button key={`banner_status_${item.key}`} value={item.key}>{item.title}</Radio.Button>
            })
          }
        </Radio.Group>
        <Button type='primary' className='flex_row center margin_left_64' onClick={() => page.add()}>
          <img src={require('@/img/icon_add.png')} className='icon_add margin_right_10'/>
          <span className='white'>新建</span>
        </Button>
        <Button className='flex_row center margin_left_16'>
          <span className='margin_right_10 '>批量操作</span>
          <img src={require('@/img/icon_arrow_bottom.png')} className='icon_arrow_bottom'/>
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
      <CusPCTable columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

