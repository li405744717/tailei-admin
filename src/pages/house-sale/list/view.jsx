/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {ROLES} from "../../system/account/c";
import {SALE_STATUS} from "./c";
import {HOUSE_TYPES} from "../../suggest/info/c";

const {Option} = Select;
export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, status, filter, consultants} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"}>修改</Button>
        <div className='button_fg_line'/>
        <Button type={"link"}>{content.status === 'up' ? '下架' : '上架'}</Button>
        <div className='button_fg_line'/>
        <Button type={"link"}>删除</Button>
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
          <Input value={filter.name} placeholder='请输入' onChange={e => page.onChangeInput(e, 'name')} className='house_sale_input_view'/>
        </div>
        <div className='flex_row align_center flex_1'>
          <span>电话：</span>
          <Input value={filter.phone} placeholder='请输入' onChange={e => page.onChangeInput(e, 'phone')} className='house_sale_input_view'/>
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
              <span>房源类型：</span>
              <Select
                showSearch
                value={filter.house_type}
                style={{width: 240}}
                placeholder="全部"
                optionFilterProp="children"
                onChange={e => page.onChangeSelect(e, 'house_type')}
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
              <span>顾问：</span>
              <Select
                showSearch
                value={filter.consultant}
                style={{width: 240}}
                placeholder="全部"
                optionFilterProp="children"
                onChange={e => page.onChangeSelect(e, 'consultant')}
                filterOption={(input, option) => {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {
                  consultants.map((item, index) => {
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
        <span className='text_32 black'>租赁列表</span>
        <div className='flex_1'/>

        <Radio.Group value={status} onChange={page.handleSizeChange}>
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="off">下架中</Radio.Button>
          <Radio.Button value="on">上架中</Radio.Button>
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
      <CusPCTable rowSelection={rowSelection} columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

