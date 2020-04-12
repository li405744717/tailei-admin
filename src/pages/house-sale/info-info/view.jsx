/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select, Upload, Modal} from "antd";


export default function renderView(page) {

  const {} = page.props
  const {form} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">
    <div className='flex_column align_center width_100 bg_white padding_TB_48 padding_LR_64'>
      <div className='flex_column border_bottom width_100'>
        <span className='text_32 mid'>业主信息</span>
        <div className='flex_row align_center margin_top_32 margin_bottom_64'>
          <div className='flex_row flex_1 align_center'>
            <span className='black_65'>业主姓名：{form.name}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
            <span className='black_65'>业主电话：{form.phone}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
          </div>
        </div>
      </div>
      <div className='flex_column border_bottom width_100 margin_top_48'>
        <span className='text_32 mid'>房屋信息</span>
        <div className='flex_row align_center margin_top_32'>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.address} className='black_65'>地址：{form.address}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.house_intro} className='black_65'>房型：{form.house_intro}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.area} className='black_65'>面积：{form.area}</span>
          </div>
        </div>
        <div className='flex_row align_center margin_top_32'>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.floor} className='black_65'>楼层：{form.floor}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.direction} className='black_65'>朝向：{form.direction}</span>
          </div>
          <div className='flex_row flex_1 align_center'>
            <span hidden={!form.pay_way} className='black_65'>租金：{form.pay_way}</span>
          </div>
        </div>
        <div hidden={!form.renovation_way} className='flex_row align_center margin_top_32'>
          <div className='flex_row flex_1 align_center'>
            <span className='black_65'>装修类型：{form.renovation_way}</span>
          </div>
        </div>
        <div hidden={(form.images || []).length === 0} className='flex_column margin_top_32'>
          <span className='margin_bottom_16 black_65'>图片：</span>
          <div>
            {
              (form.images || []).map((image, index) => {
                return <img src={image} key={`house_info_info_image_${index}`} className='house_image'/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  </div>

}

