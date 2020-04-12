/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select, Upload, Modal} from "antd";
import CusPCTable from "@/components/table-pc-c/c";


export default function renderView(page) {


  const columnRenderObj = {
    avatar: (content, record, rowIndex) => {
      return <div className='flex_row align_center'>
        <img src={content.avatarUrl} className='avatar_image'/>
      </div>
    }
  }

  const {} = page.props
  const {form, table} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">
    <div className='flex_column width_100 bg_white padding_TB_48 padding_LR_64'>
      <span className='text_32 mid'>房屋信息</span>
      <div className='flex_row align_center margin_top_32 margin_bottom_32'>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>小区：{form.apartment}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>面积：{form.area}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
        </div>
      </div>
      <div className='flex_row align_center margin_top_32 margin_bottom_32'>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>房屋：{form.house}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>姓名：{form.name}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
        </div>
      </div>
      <div className='flex_row align_center margin_top_32 margin_bottom_32'>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>城市：{form.address}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
          <span className='black_65'>电话：{form.phone}</span>
        </div>
        <div className='flex_row flex_1 align_center'>
        </div>
      </div>
    </div>

    <div className='flex_column align_center width_100 bg_white padding_TB_48 padding_LR_64 margin_top_32'>
      <div className='flex_column border_bottom width_100 margin_top_48'>
        <span className='text_32 mid'>绑定信息</span>
        <div className='margin_top_32'>
          <CusPCTable pageObj={false} columnRenderObj={columnRenderObj} chart={table}/>
        </div>
      </div>
    </div>
  </div>

}

