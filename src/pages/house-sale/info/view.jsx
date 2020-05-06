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


class HouseSaleInfoEdit extends React.Component {
  static propTypes = {
    editItem: PropTypes.array
  }

  static defaultProps = {}

  state = {
    form: {
      status: 'waiting',
      cause: null
    }
  }
  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {editItem} = props
    var {form} = this.state
    form.status = editItem[6].status
    this.setState({
      form
    })
  }
  onChangeSelect = (value) => {
    var {form} = this.state
    form.status = value
    this.setState({form});
  }

  onChangeInput = (e) => {
    var {form} = this.state
    form.cause = e.target.value
    this.setState({form});
  }

  render() {
    const {editItem} = this.props
    const {form} = this.state
    return editItem ? <div className='flex_column'>
      <div className='flex_row align_center'>
        <span className='black'>地址：{editItem[2].data[0].text} {editItem[2].data[1].text}</span>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>状态：</span>
        <Select
          showSearch
          value={form.status}
          style={{width: 240}}
          optionFilterProp="children"
          onChange={this.onChangeSelect}
          filterOption={(input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
        >
          {
            HOUSE_STATUS.map((item, index) => {
              return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
            })
          }
        </Select>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>原因：</span>
        <Input onChange={this.onChangeInput} className='house_sale_input_view' placeholder='请输入未通过原因（通过选填）'/>
      </div>

    </div> : null
  }
}

export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, editItem} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => content.status === 'uncensored' ? page.edit(content.id) : null}>
          <span className={`${content.status === 'uncensored' ? 'primary' : 'black'}`}>修改</span>
        </Button>
        <div className='button_fg_line'/>
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
      closable={true}>
      <HouseSaleInfoEdit ref={'houseEdit'} editItem={editItem}/>
    </Modal>

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
                placeholder="全部类型"
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
              <span>发布时间：</span>
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
        <span className='text_32 black'>租赁列表</span>
        <div className='flex_1'/>

        <Radio.Group value={filter.status} onChange={page.handleSizeChange}>
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="uncensored">待审核</Radio.Button>
          <Radio.Button value="published">已通过</Radio.Button>
          <Radio.Button value="rejected">未通过</Radio.Button>
        </Radio.Group>

        <Button type='primary' className='flex_row center margin_left_64'>
          <span className='white'>批量修改</span>
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

