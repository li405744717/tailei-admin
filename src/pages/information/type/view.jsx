/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, DatePicker, Select, Modal, Dropdown, Menu} from "antd";
import CusPCTable from "../../../components/table-pc-c/c";
import PropTypes from 'prop-types'

class InformationTypeEdit extends React.Component {
  static propTypes = {
    editItem: PropTypes.array,
  }

  static defaultProps = {}

  state = {
    form: {
      name: undefined,
      weight: undefined
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
    if (editItem) {
      form.name = editItem[1].data[0].text
      form.weight = editItem[2].data[0].text
    } else {
      form.name = undefined
      form.weight = undefined
    }

    this.setState({
      form
    })
  }

  onChangeInput = (e, key) => {
    var {form} = this.state
    form[key] = e.target.value
    this.setState({form});
  }

  render() {
    const {editItem} = this.props
    const {form} = this.state
    return <div className='flex_column'>

      <div className='flex_row align_center'>
        <span className='black'>分类名称：</span>
        <Input value={form.name} onChange={e => this.onChangeInput(e, 'name')} className='house_sale_input_view'
               placeholder='请输入'/>
      </div>

      <div className='flex_row align_center margin_top_48'>
        <span className='black'>分类权重：</span>
        <Input value={form.weight} onChange={e => this.onChangeInput(e, 'weight')} className='house_sale_input_view'
               placeholder='请输入'/>
      </div>

    </div>
  }
}

export default function renderView(page) {

  const {table, selectedRowKeys, filter, showEdit, editItem, current_page} = page.state
  const {showFilter} = page.props
  const columnRenderObj = {
    buttons: (content, record, rowIndex) => {
      return <div className='flex_row align_center justify_end'>
        <Button type={"link"} onClick={() => page.edit(content.id)}>
          <span className="primary">修改</span>
        </Button>
        <div className='button_fg_line'/>
        <Button type={"link"} onClick={() => page.editItems(content.id, [], 'delete')}>
          <span className="primary">删除</span>
        </Button>
      </div>
    }
  }
  return <div className="page sale_list_page padding_LR_48 flex_column" id="rankPage">
    <Modal
      centered={true}
      visible={showEdit}
      onOk={page.editOK}
      onCancel={page.editCancel}
      title={'修改/修改分类'}
      width={480}
      closable={true}>
      <InformationTypeEdit ref={'houseEdit'} editItem={editItem}/>
    </Modal>
    <div className='flex_column bg_white padding_LR_32 padding_TB_24 margin_top_48'>
      <div className='flex_row align_center margin_bottom_48'>
        <span className='text_32 black'>分类列表</span>
        <div className='flex_1'/>
        <Button type='primary' className='flex_row center margin_left_64' onClick={() => page.edit()}>
          <img src={require('@/img/icon_add.png')} className='icon_add margin_right_10'/>
          <span className='white'>新建</span>
        </Button>
      </div>
      <CusPCTable columnRenderObj={columnRenderObj} chart={table} current_page={current_page}
                  onChangePage={_page => page.onChangePage(_page)}/>
    </div>

  </div>

}

