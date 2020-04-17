/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button} from "antd";
import {FormInput, FormRadio, FormImage, FormSelect} from '@/pages/house-sale/list-info/view'


export default function renderView(page) {

  const {} = page.props
  const {form} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">


    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_32'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>小程序分享</span>
        <div className='flex_1'/>

        <Button type='primary' className='flex_row center margin_left_64' onClick={() => page.submit()}>
          <span className='white'>保存</span>
        </Button>
      </div>

      <div>
        {
          form.map((item, index) => {
            return item.hide ? null :
              <div className='width_child flex_row margin_bottom_64' key={`form_${index}`}>
                <span className='cus_form_title_text text_28 margin_top_8'>{item.title}：</span>
                {
                  item.type === 'input' ?
                    <FormInput placeholder={item.placeholder || `请输入${item.title}`}
                               value={item.value}
                               setInputValue={value => page.setFormValue(item.key, value)}/> :
                    item.type === 'radio' ?
                      <FormRadio options={item.options} value={item.value}
                                 setInputValue={value => page.setFormValue(item.key, value)}/> :
                      item.type === 'select' ?
                        <FormSelect options={item.options} value={item.value}
                                    setInputValue={value => page.setFormValue(item.key, value)}/> :
                        item.type === 'images' ?
                          <FormImage config={item.config} value={item.value}
                                     setInputValue={value => page.setFormValue(item.key, value)}/> : null
                }
              </div>

          })
        }

      </div>
    </div>
  </div>

}

