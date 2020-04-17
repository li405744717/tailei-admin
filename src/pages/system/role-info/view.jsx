/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select, Upload, Modal} from "antd";
import PropTypes from 'prop-types'
import CusPCTable from "../../../components/table-pc-c/c";
import {FormInput, FormRadio, FormImage, FormSelect, FormTable} from '@/pages/house-sale/list-info/view'


export default function renderView(page) {

  const {} = page.props
  const {form} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">
    <div className='flex_column width_100 bg_white padding_TB_64'>
      <div>
        {
          form.map((item, index) => {
            return item.hide ? null :
              <div className='width_child flex_row margin_bottom_64' key={`form_${index}`}>
                <span className='cus_form_title_text text_28 margin_top_8'>{item.title}：</span>
                {
                  item.type === 'input' ?
                    <FormInput placeholder={item.placeholder || `请输入${item.title}`}
                               setInputValue={value => page.setFormValue(item.key, value)}/> :
                    item.type === 'radio' ?
                      <FormRadio options={item.options}
                                 setInputValue={value => page.setFormValue(item.key, value)}/> :
                      item.type === 'select' ?
                        <FormSelect options={item.options}
                                    setInputValue={value => page.setFormValue(item.key, value)}/> :
                        item.type === 'images' ?
                          <FormImage setInputValue={value => page.setFormValue(item.key, value)}/> :
                          item.type === 'table' ?
                            <FormTable tables={item.tables}
                                       value={item.value}
                                       setInputValue={value => page.setFormValue(item.key, value)}/> : null
                }
              </div>

          })
        }
        <div className='flex_row align_center'>
          <div className='cus_form_title_text'></div>
          <Button type='primary' onClick={() => page.submit()}>
            <span className='white'>提交</span>
          </Button>
          <Button className='margin_left_16'>取消</Button>
        </div>
      </div>
    </div>
  </div>

}

