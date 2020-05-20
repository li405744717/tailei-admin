/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select, Upload, Modal, DatePicker} from "antd";
import PropTypes from 'prop-types'
import CusPCTable from "../../../components/table-pc-c/c";
import moment from 'moment'
import E from 'wangeditor'

const {Option} = Select;
const {RangePicker} = DatePicker;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class FormInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    setInputValue: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    value: undefined
  }

  state = {
    value: undefined
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    this.setState({
      value
    })
  }

  setInputValue(e) {
    this.setState({
      value: e.target.value
    })
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(e.target.value)
  }

  render() {
    const {placeholder} = this.props
    const {value} = this.state
    return <div className='cus_form'>
      <Input className='cus_form_input_view' value={value} onChange={e => this.setInputValue(e)}
             placeholder={placeholder}/>
    </div>
  }
}

export class FormRadio extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    value: undefined
  }

  state = {
    value: undefined
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    this.setState({
      value
    })
  }

  setInputValue(e) {
    this.setState({
      value: e.target.value
    })
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(e.target.value)
  }

  render() {
    const {options} = this.props
    const {value} = this.state
    return <div className='cus_form'>
      <Radio.Group onChange={e => this.setInputValue(e)} value={value}>
        {
          options.map((item, index) => {
            return <Radio key={`option_${index}`} value={item.key}>{item.title}</Radio>
          })
        }
      </Radio.Group>
    </div>
  }
}

export class FormSelect extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    value: undefined
  }
  state = {
    value: undefined
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    this.setState({
      value
    })
  }

  onChange = value => {
    this.setState({
      value: value
    })
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(value)
  }

  onSearch = (val) => {
    console.log('search:', val);
  }

  render() {
    const {options} = this.props
    const {value} = this.state
    return <div className='cus_form'>
      <Select
        value={value}
        showSearch
        style={{width: 200}}
        placeholder="请选择"
        optionFilterProp="children"
        onChange={this.onChange}
        onSearch={this.onSearch}
        filterOption={(input, option) => {
          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
      >
        {
          options.map((item, index) => {
            return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
          })
        }
      </Select>
    </div>
  }
}

export class FormImage extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func,
    config: PropTypes.object,
    value: PropTypes.array
  }

  static defaultProps = {
    config: {
      limit: 8
    },
    value: []
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    this.setState({
      fileList: value || []
    })
  }

  setInputValue(value) {
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(value)
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
    this.setInputValue(fileList)
    this.setState({fileList})
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const {config} = this.props
    const uploadButton = (
      <div>
        <img src={require('@/img/icon_add_2.png')} className='icon_add_2'/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return <div>
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= config.limit ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
      <div>
        <span className='gray'>支持.jpg、.jpeg、.png等格式<br/>{config.remark || '建议尺寸：740*450'}</span>
      </div>
    </div>
  }
}

export class FormTable extends React.Component {
  static propTypes = {
    tables: PropTypes.array,
    value: PropTypes.array,
    setInputValue: PropTypes.func
  }

  static defaultProps = {
    value: []
  }

  state = {
    selectedRowKeys: []
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    this.setState({
      selectedRowKeys: value
    })
  }

  onSelectChange(_selectedRowKeys, index) {
    var {selectedRowKeys} = this.state
    selectedRowKeys[index] = _selectedRowKeys
    console.log('selectedRowKeys changed: ', _selectedRowKeys);
    this.setState({selectedRowKeys});

    const {setInputValue} = this.props
    if (setInputValue) setInputValue(selectedRowKeys)
  }

  render() {
    const {tables} = this.props
    const {selectedRowKeys} = this.state
    const rowSelection = (index) => {
      return {
        selectedRowKeys: selectedRowKeys[index],
        onChange: (e) => this.onSelectChange(e, index)
      };
    }
    const columnRenderObj = {
      sysRight: (content, record, rowIndex) => {
        return <div className='flex_row align_center'>
          <span>{content.title}</span>
        </div>
      }
    }

    return <div className='flex_row'>
      {
        tables.map((table, index) => {
          return <CusPCTable pageObj={false} key={`cus_form_table_${index}`} columnRenderObj={columnRenderObj}
                             rowSelection={rowSelection(index)} chart={table}/>
        })
      }

    </div>
  }
}

export class FormDate extends React.Component {
  static propTypes = {
    setInputValue: PropTypes.func,
    value: PropTypes.array
  }

  static defaultProps = {
    value: []
  }

  state = {
    form: {}
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    var {form} = this.state
    form = {
      ...form,
      startRange: value[0],
      endRange: value[1]
    }
    this.setState({
      form
    })
  }

  onChangeDate(date) {
    console.log(date)
    var {form} = this.state
    form.startRange = moment(date[0])
    form.endRange = moment(date[1])
    console.log(form)
    this.setState({form})

    const {setInputValue} = this.props
    if (setInputValue) setInputValue(date)
  }

  render() {
    const {form} = this.state
    return <div className='cus_form'>
      <RangePicker className="fund_option_time_picker_view"
                   onChange={e => this.onChangeDate(e)}
                   value={[form.startRange, form.endRange]}/>
    </div>
  }
}

export class FormEdit extends React.Component {
  static propTypes = {
    setInputValue: PropTypes.func,
  }

  static defaultProps = {
    value: []
  }

  state = {
    form: {}
  }

  UNSAFE_componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  onLoad(props) {
    var {value} = props
    var {form} = this.state

    if (!this.editor) {
      this.editor = new E('#editor')
      this.editor.create()
    }
  }

  onChangeDate(date) {

  }

  render() {
    const {form} = this.state
    return <div className='cus_form'>
      <div id="editor">
        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
      </div>
    </div>
  }
}

export default function renderView(page) {

  const {} = page.props
  const {form} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">
    <div className='flex_column align_center width_100 bg_white padding_TB_64'>
      <div>
        {
          form.map((item, index) => {
            return item.hide ? null :
              <div className='width_child flex_row margin_bottom_64' key={`form_${index}`}>
                <span className='cus_form_title_text text_28 margin_top_8'>{item.title}：</span>
                {
                  item.type === 'input' ?
                    <FormInput value={item.value} placeholder={item.placeholder || `请输入${item.title}`}
                               setInputValue={value => page.setFormValue(item.key, value)}/> :
                    item.type === 'radio' ?
                      <FormRadio value={item.value} options={item.options}
                                 setInputValue={value => page.setFormValue(item.key, value)}/> :
                      item.type === 'select' ?
                        <FormSelect value={item.value} options={item.options}
                                    setInputValue={value => page.setFormValue(item.key, value)}/> :
                        item.type === 'images' ?
                          <FormImage value={item.value}
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

