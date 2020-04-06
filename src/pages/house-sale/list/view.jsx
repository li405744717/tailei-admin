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

  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      console.log('content', content)
      return <div className='flex_row align_center justify_end'>
        <Button>修改</Button>
        <Button>{content.status === 'up' ? '下架' : '上架'}</Button>
        <Button>删除</Button>
      </div>
    }
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => page.onSelectChange(e)
  };
  return <div className="page sale_list_page flex_column" id="rankPage">

    <div className='flex_column bg_white padding_LR_32 padding_TB_24'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>租聘列表</span>
        <div className='flex_1'/>
        <Button>全部</Button>
        <Button>下架中</Button>
        <Button>上架中</Button>

        <Button type='primary' className='flex_row center margin_left_64'>
          <img src={require('@/img/icon_add.png')} className='icon_add margin_right_10'/>
          <span className='white'>新建</span>
        </Button>
        <Button className='flex_row center margin_left_16'>
          <span className='margin_right_10 '>批量操作</span>
          <img src={require('@/img/icon_arrow_bottom.png')} className='icon_arrow_bottom'/>
        </Button>
      </div>
      <CusPCTable rowSelection={rowSelection} columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

