/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";

export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      console.log('content', content)
      return <div className='flex_row align_center justify_end'>
        <Button onClick={() => content.status === 'waiting' ? page.edit() : null}>
          <span className={`${content.status === 'waiting' ? 'primary' : ''}`}>修改</span>
        </Button>
        <Button>删除</Button>
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
          <Input className='house_sale_input_view'/>
        </div>
        <div className='flex_row align_center flex_1'>
          <span>电话：</span>
          <Input className='house_sale_input_view'/>
        </div>
        {
          !showFilter ?
            <div className='flex_row align_center flex_1 justify_end'>
              <Button type='primary'>
                <span className='white'>查询</span>
              </Button>
              <Button className='margin_left_16'>
                <span>重置</span>
              </Button>
              <Button type='link' className='flex_row center' onClick={() => page.setShowFilter(true)}>
                <span className='primary'>展开</span>
                <img src={require('@/img/icon_arrow_bottom_2.png')} className='icon_arrow_bottom_2'/>
              </Button>
            </div> :
            <div className='flex_row align_center flex_1 justify_end'>
              <span>房源类型：</span>
              <Input className='house_sale_input_view'/>
            </div>
        }
      </div>
      {
        showFilter ?
          <div className='flex_row align_center margin_top_32'>
            <div className='flex_row align_center flex_2'>
              <span>发布时间：</span>
              <Input className='house_sale_input_view'/>
            </div>
            <div className='flex_row align_center flex_1 justify_end'>
              <Button type='primary'>
                <span className='white'>查询</span>
              </Button>
              <Button className='margin_left_16'>
                <span>重置</span>
              </Button>
              <Button type='link' className='flex_row center' onClick={() => page.setShowFilter(false)}>
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
        <Button>全部</Button>
        <Button>待审核</Button>
        <Button>已通过</Button>
        <Button>未通过</Button>

        <Button type='primary' className='flex_row center margin_left_64'>
          <span className='white'>批量修改</span>
        </Button>
      </div>
      <CusPCTable rowSelection={rowSelection} columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

