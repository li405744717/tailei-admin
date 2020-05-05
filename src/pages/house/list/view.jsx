/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {HOUSE_TYPES, HOUSE_STATUS} from '@/pages/house-sale/info/c'
import PropTypes from "prop-types";
import UploadC from "../../../components/upload-c/c";

const {Option} = Select;
const {RangePicker} = DatePicker;


class HouseListEdit extends React.Component {
  static propTypes = {
    editItem: PropTypes.array
  }

  static defaultProps = {}

  state = {}

  constructor(props) {
    super(props)
    var {editItem} = props
    if (editItem) {
      this.state = {
        form: {
          phone: editItem[2].data[0].text,
          name: editItem[1].data[0].text,
          area: editItem[6].data[0].text
        }
      }
    }
  }

  onChangeInput(e, key) {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  render() {
    const {editItem} = this.props
    const {form} = this.state
    return editItem ? <div className='flex_column center'>
      <div>
        <div className='flex_row align_center'>
          <span className='black'>小区：{editItem[4].data[0].text}</span>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>房屋：{editItem[5].data[0].text}</span>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>姓名：</span>
          <Input onChange={e => this.onChangeInput(e, 'name')} className='house_sale_input_view'
                 value={form.name}/>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>电话：</span>
          <Input onChange={e => this.onChangeInput(e, 'phone')} className='house_sale_input_view'
                 value={form.phone}/>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>面积：</span>
          <Input onChange={e => this.onChangeInput(e, 'area')} className='house_sale_input_view'
                 value={form.area}/>
        </div>
      </div>

    </div> : null
  }
}

export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, editItem, uploadToast} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => page.edit(content.id)}>
          <span className='primary'>修改</span>
        </Button>
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

    <Modal
      centered={true}
      visible={showEdit}
      onOk={page.editOK}
      onCancel={page.editCancel}
      title={'修改'}
      width={480}
      okText={'保存'}
      closable={true}>
      <HouseListEdit ref={'houseEdit'} editItem={editItem}/>
    </Modal>

    <Modal
      title={"导入房屋信息"}
      centered={true}
      visible={uploadToast}
      onOk={page.uploadOK}
      onCancel={() => page.setUploadToast(false)}
      okText={'导入'}
      width={480}>
      <div className="flex_column align_start">
        <UploadC ref={'houseUpload'} setUploadToast={flag => page.setUploadToast(flag)}/>
      </div>
    </Modal>


    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_32'>
      <div className='flex_row align_center'>
        <div className='flex_row align_center flex_1'>
          <span>姓名：</span>
          <Input placeholder='请输入' onChange={e => page.onChangeInput(e, 'name')} className='house_sale_input_view'/>
        </div>
        <div className='flex_row align_center flex_1'>
          <span>电话：</span>
          <Input placeholder='请输入' onChange={e => page.onChangeInput(e, 'phone')} className='house_sale_input_view'/>
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
              <Button className='margin_left_16' onClick={() => page.setUploadToast(true)}>
                <span>导入</span>
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
                value={filter.house_type}
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
            <div className='flex_row align_center flex_2 site-input-group-wrapper'>
              <span>面积：</span>
              <div className='flex_1'>
                <Input.Group compact>
                  <Input style={{width: 105}} placeholder="请输入" onChange={e => page.onChangeInput(e, 'startArea')}/>
                  <Input
                    className="site-input-split"
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                  />
                  <Input
                    className="site-input-right"
                    style={{
                      width: 105
                    }}
                    onChange={e => page.onChangeInput(e, 'endArea')}
                    placeholder="请输入"
                  />
                </Input.Group>
              </div>

            </div>
            <div className='flex_row align_center flex_1 justify_end'>
              <Button type='primary' onClick={() => page.search()}>
                <span className='white'>查询</span>
              </Button>
              <Button className='margin_left_16' onClick={() => page.reset()}>
                <span>重置</span>
              </Button>
              <Button className='margin_left_16' onClick={() => page.setUploadToast(true)}>
                <span>导入</span>
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
        <span className='text_32 black'>房屋列表</span>
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
      <CusPCTable columnRenderObj={columnRenderObj} chart={table}/>
    </div>

  </div>

}

