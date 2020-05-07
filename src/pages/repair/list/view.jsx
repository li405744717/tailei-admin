/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import {REPAIR_STATUS} from '@/pages/repair/list/c'
import PropTypes from "prop-types";

const {Option} = Select;
const {RangePicker} = DatePicker;


class RepairListEdit extends React.Component {
  static propTypes = {
    editItem: PropTypes.array,
    repair_man: PropTypes.array
  }

  static defaultProps = {
    repair_man: []
  }

  state = {}

  constructor(props) {
    super(props)
    var {editItem} = props
    if (editItem) {
      this.state = {
        form: {
          status: editItem[4].status,
          repair_man_id: editItem[4].repair_man_id
        }
      }
    }
  }

  onChangeSelect(e, key) {
    var {form} = this.state
    form[key] = e
    this.setState({form});
  }

  render() {
    const {editItem, repair_man} = this.props
    const {form} = this.state
    return editItem ? <div className='flex_column center'>
      <div>
        <div className='flex_row align_center'>
          <span className='black'>地址：{editItem[2].data[0].text + ' ' + editItem[2].data[1].text}</span>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>维修状态：</span>
          <Select
            showSearch
            value={form.status}
            style={{width: 240}}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={(e) => this.onChangeSelect(e, 'status')}
            filterOption={(input, option) => {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {
              REPAIR_STATUS.map((item, index) => {
                return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
              })
            }
          </Select>
        </div>

        <div className='flex_row align_center margin_top_48'>
          <span className='black'>维修人员：</span>
          <Select
            showSearch
            value={form.repair_man_id}
            style={{width: 240}}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={(e) => this.onChangeSelect(e, 'repair_man_id')}
            filterOption={(input, option) => {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {
              repair_man.map((item, index) => {
                return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
              })
            }
          </Select>
        </div>
      </div>

    </div> : null
  }
}

export default function renderView(page) {

  const {user} = page.props
  const {table, selectedRowKeys, filter, showEdit, editItem, uploadToast, repair_man_list, current_page} = page.state
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
      <RepairListEdit ref={'houseEdit'} editItem={editItem} repair_man={repair_man_list}/>
    </Modal>


    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_32'>
      <div className='flex_row align_center'>
        <div className='flex_row align_center flex_1'>
          <span>电话：</span>
          <Select
            showSearch
            value={filter.repair_man_id}
            style={{width: 240}}
            placeholder="请输入"
            optionFilterProp="children"
            onChange={page.onChangeSelect}
            filterOption={(input, option) => {
              return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
          >
            {
              repair_man_list.map((item, index) => {
                return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
              })
            }
          </Select>
        </div>
        <div className='flex_row align_center flex_2 justify_end'>
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
        <span className='text_32 black'>房屋列表</span>
        <div className='flex_1'/>
        <Radio.Group value={filter.status} onChange={page.handleSizeChange}>
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="distribute">待分配</Radio.Button>
          <Radio.Button value="repairing">待维修</Radio.Button>
          <Radio.Button value="complete">已维修</Radio.Button>
        </Radio.Group>
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
      <CusPCTable columnRenderObj={columnRenderObj} chart={table} current_page={current_page}
                  onChangePage={_page => page.onChangePage(_page)}/>
    </div>

  </div>

}

